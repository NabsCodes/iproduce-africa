import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

import { getMissingEnvNames } from "@/lib/env";
import {
  createMailchimpSubscriberHash,
  normalizeMailchimpEmail,
  resolveMailchimpConfig,
  subscribeNewsletterEmail,
} from "@/lib/mailchimp/newsletter";

const config = {
  apiKey: "test-key-us20",
  serverPrefix: "us20",
  audienceId: "audience_123",
};

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

describe("Mailchimp newsletter configuration", () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
  });

  it("normalizes email before generating the Mailchimp subscriber hash", () => {
    expect(normalizeMailchimpEmail("  Test@Example.COM ")).toBe(
      "test@example.com",
    );
    expect(createMailchimpSubscriberHash("  Test@Example.COM ")).toBe(
      "55502f40dc8b7c769880b10874abc9d0",
    );
  });

  it("rejects missing and unsafe Mailchimp configuration", () => {
    vi.stubEnv("MAILCHIMP_API_KEY", "");
    vi.stubEnv("MAILCHIMP_SERVER_PREFIX", "");
    vi.stubEnv("MAILCHIMP_AUDIENCE_ID", "");

    expect(() => resolveMailchimpConfig()).toThrow(
      "mailchimp_configuration_failed",
    );
    expect(() =>
      resolveMailchimpConfig({ ...config, serverPrefix: "evil.example.com" }),
    ).toThrow("mailchimp_server_prefix_failed");
    expect(() =>
      resolveMailchimpConfig({ ...config, audienceId: "../../audience" }),
    ).toThrow("mailchimp_audience_id_failed");
  });

  it("keeps delivery requirements route-specific", () => {
    vi.stubEnv("RESEND_API_KEY", "resend-key");
    vi.stubEnv("EMAIL_FROM", "iProduce Africa <info@example.com>");
    vi.stubEnv("CONTACT_TO_EMAIL", "");
    vi.stubEnv("MAILCHIMP_API_KEY", "mailchimp-key");
    vi.stubEnv("MAILCHIMP_SERVER_PREFIX", "us20");
    vi.stubEnv("MAILCHIMP_AUDIENCE_ID", "audience_123");

    expect(
      getMissingEnvNames(["RESEND_API_KEY", "EMAIL_FROM", "CONTACT_TO_EMAIL"]),
    ).toEqual(["CONTACT_TO_EMAIL"]);
    expect(
      getMissingEnvNames([
        "MAILCHIMP_API_KEY",
        "MAILCHIMP_SERVER_PREFIX",
        "MAILCHIMP_AUDIENCE_ID",
      ]),
    ).toEqual([]);
  });
});

describe("subscribeNewsletterEmail", () => {
  it("creates a missing member as pending and applies the source tag", async () => {
    const fetchMock = vi
      .fn<typeof fetch>()
      .mockResolvedValueOnce(jsonResponse({}, 404))
      .mockResolvedValueOnce(jsonResponse({ status: "pending" }))
      .mockResolvedValueOnce(new Response(null, { status: 204 }));

    const result = await subscribeNewsletterEmail("  Jane@Example.com ", {
      config,
      fetch: fetchMock,
    });

    expect(result).toEqual({ memberStatus: "pending", tagApplied: true });
    expect(fetchMock).toHaveBeenCalledTimes(3);

    const [memberUrl, memberInit] = fetchMock.mock.calls[1];
    expect(memberUrl).toBe(
      "https://us20.api.mailchimp.com/3.0/lists/audience_123/members/9e26471d35a78862c17e467d87cddedf",
    );
    expect(memberInit?.method).toBe("PUT");
    expect(JSON.parse(String(memberInit?.body))).toEqual({
      email_address: "jane@example.com",
      status_if_new: "pending",
    });
    expect(JSON.parse(String(fetchMock.mock.calls[2][1]?.body))).toEqual({
      tags: [{ name: "Website newsletter", status: "active" }],
    });
  });

  it.each(["pending", "subscribed"])(
    "preserves an existing %s member instead of rewriting its status",
    async (status) => {
      const fetchMock = vi
        .fn<typeof fetch>()
        .mockResolvedValueOnce(jsonResponse({ status }))
        .mockResolvedValueOnce(new Response(null, { status: 204 }));

      const result = await subscribeNewsletterEmail("jane@example.com", {
        config,
        fetch: fetchMock,
      });

      expect(result).toEqual({ memberStatus: status, tagApplied: true });
      expect(fetchMock).toHaveBeenCalledTimes(2);
      expect(fetchMock.mock.calls[1][1]?.method).toBe("POST");
    },
  );

  it("preserves an unsubscribed member and never mutates its consent status", async () => {
    const fetchMock = vi
      .fn<typeof fetch>()
      .mockResolvedValueOnce(jsonResponse({ status: "unsubscribed" }))
      .mockResolvedValueOnce(new Response(null, { status: 204 }));

    const result = await subscribeNewsletterEmail("jane@example.com", {
      config,
      fetch: fetchMock,
    });

    expect(result).toEqual({
      memberStatus: "unsubscribed",
      tagApplied: true,
    });
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock.mock.calls[1][1]?.method).toBe("POST");
    expect(JSON.parse(String(fetchMock.mock.calls[1][1]?.body))).toEqual({
      tags: [{ name: "Website newsletter", status: "active" }],
    });
  });

  it("does not override or tag a cleaned member", async () => {
    const fetchMock = vi
      .fn<typeof fetch>()
      .mockResolvedValueOnce(jsonResponse({ status: "cleaned" }));
    const logger = { error: vi.fn() };

    const result = await subscribeNewsletterEmail("jane@example.com", {
      config,
      fetch: fetchMock,
      logger,
    });

    expect(result).toEqual({ memberStatus: "cleaned", tagApplied: false });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(logger.error).toHaveBeenCalledWith(
      expect.stringContaining("marked as cleaned"),
    );
  });

  it("retries a transient tag failure once and logs a redacted repair warning", async () => {
    const fetchMock = vi
      .fn<typeof fetch>()
      .mockResolvedValueOnce(jsonResponse({ status: "subscribed" }))
      .mockResolvedValueOnce(jsonResponse({ title: "Server Error" }, 500))
      .mockResolvedValueOnce(jsonResponse({ title: "Bad Request" }, 400));
    const logger = { error: vi.fn() };

    const result = await subscribeNewsletterEmail("jane@example.com", {
      config,
      fetch: fetchMock,
      logger,
    });

    expect(result).toEqual({ memberStatus: "subscribed", tagApplied: false });
    expect(fetchMock).toHaveBeenCalledTimes(3);

    const logOutput = JSON.stringify(logger.error.mock.calls);
    expect(logOutput).not.toContain("jane@example.com");
    expect(logOutput).not.toContain(config.apiKey);
    expect(logOutput).toContain("manual repair");
  });

  it("uses Basic authentication without exposing the key in the URL", async () => {
    const fetchMock = vi
      .fn<typeof fetch>()
      .mockResolvedValueOnce(jsonResponse({ status: "subscribed" }))
      .mockResolvedValueOnce(new Response(null, { status: 204 }));

    await subscribeNewsletterEmail("jane@example.com", {
      config,
      fetch: fetchMock,
    });

    const [url, init] = fetchMock.mock.calls[0];
    const headers = init?.headers as Record<string, string>;
    expect(String(url)).not.toContain(config.apiKey);
    expect(headers.Authorization).toBe(
      `Basic ${Buffer.from(`iproduce-africa:${config.apiKey}`).toString("base64")}`,
    );
  });

  it("fails safely on provider, malformed-response, network, and timeout errors", async () => {
    for (const status of [400, 500]) {
      const providerFailure = vi
        .fn<typeof fetch>()
        .mockResolvedValue(jsonResponse({ title: "Provider Error" }, status));
      await expect(
        subscribeNewsletterEmail("jane@example.com", {
          config,
          fetch: providerFailure,
        }),
      ).rejects.toThrow(`mailchimp_get_member_failed_status_${status}`);
    }

    const malformedResponse = vi
      .fn<typeof fetch>()
      .mockResolvedValue(new Response("not-json", { status: 200 }));
    await expect(
      subscribeNewsletterEmail("jane@example.com", {
        config,
        fetch: malformedResponse,
      }),
    ).rejects.toThrow("mailchimp_get_member_response_failed");

    const networkFailure = vi
      .fn<typeof fetch>()
      .mockRejectedValue(new Error("network includes no subscriber data"));
    await expect(
      subscribeNewsletterEmail("jane@example.com", {
        config,
        fetch: networkFailure,
      }),
    ).rejects.toThrow("mailchimp_get_member_failed");

    const timeoutFailure = vi.fn<typeof fetch>(
      (_, init) =>
        new Promise<Response>((_, reject) => {
          init?.signal?.addEventListener("abort", () =>
            reject(new DOMException("Aborted", "AbortError")),
          );
        }),
    );
    await expect(
      subscribeNewsletterEmail("jane@example.com", {
        config,
        fetch: timeoutFailure,
        timeoutMs: 1,
      }),
    ).rejects.toThrow("mailchimp_get_member_failed");
  });
});
