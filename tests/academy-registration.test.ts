import { describe, expect, it } from "vitest";

import { legacyWebinarCategory } from "@/lib/academy-categories";
import {
  resolveValidRegistrationDeadline,
  resolveWebinarRegistrationState,
} from "@/lib/academy-registration";
import type { AcademyWebinar } from "@/types/academy";

const START = "2026-07-20T14:00:00.000Z";
const BEFORE_START = "2026-07-20T12:00:00.000Z";
const AFTER_START = "2026-07-20T15:00:00.000Z";

function webinar(registration: AcademyWebinar["registration"]): AcademyWebinar {
  return {
    slug: "sample-session",
    category: legacyWebinarCategory("WEBINAR"),
    date: START,
    title: "Sample session",
    description: "A sample Academy session.",
    image: "/images/sample.jpg",
    excerpt: "A sample Academy session.",
    body: [],
    registration,
  };
}

describe("resolveValidRegistrationDeadline", () => {
  it("accepts deadlines at or before the session start", () => {
    expect(
      resolveValidRegistrationDeadline(START, "2026-07-20T13:00:00.000Z"),
    ).toBe("2026-07-20T13:00:00.000Z");
    expect(resolveValidRegistrationDeadline(START, START)).toBe(START);
  });

  it("ignores invalid deadlines and deadlines after the session starts", () => {
    expect(
      resolveValidRegistrationDeadline(START, "not-a-date"),
    ).toBeUndefined();
    expect(
      resolveValidRegistrationDeadline(START, "2026-07-20T16:00:00.000Z"),
    ).toBeUndefined();
  });
});

describe("resolveWebinarRegistrationState", () => {
  it("keeps open registration available until the session begins", () => {
    const state = resolveWebinarRegistrationState(webinar({ mode: "open" }), {
      now: BEFORE_START,
    });

    expect(state.availability).toBe("available");
    expect(state.statusLine).toBe(
      "Registration open · closes when the session begins.",
    );
    expect(state.action).toEqual({ kind: "internal", label: "Register now" });
    expect(state.nextBoundary).toBe(START);
  });

  it("closes open registration when the session begins", () => {
    const state = resolveWebinarRegistrationState(webinar({ mode: "open" }), {
      now: AFTER_START,
    });

    expect(state.availability).toBe("closed");
    expect(state.action.kind).toBe("details");
  });

  it("uses an explicit deadline as the next state boundary", () => {
    const closesAt = "2026-07-20T13:00:00.000Z";
    const state = resolveWebinarRegistrationState(
      webinar({ mode: "open", closesAt }),
      { now: BEFORE_START },
    );

    expect(state.nextBoundary).toBe(closesAt);
    expect(state.statusLine).toContain("Registration open · closes");

    const closed = resolveWebinarRegistrationState(
      webinar({ mode: "open", closesAt }),
      { now: "2026-07-20T13:00:00.000Z" },
    );
    expect(closed.availability).toBe("closed");
  });

  it("keeps interest open after the session when no deadline is configured", () => {
    const state = resolveWebinarRegistrationState(
      webinar({ mode: "interest" }),
      { now: AFTER_START },
    );

    expect(state.availability).toBe("available");
    expect(state.statusLine).toBe("Expressions of interest are open.");
    expect(state.nextBoundary).toBeUndefined();
  });

  it("closes interest at its explicit deadline", () => {
    const state = resolveWebinarRegistrationState(
      webinar({
        mode: "interest",
        closesAt: "2026-07-20T13:00:00.000Z",
      }),
      { now: AFTER_START },
    );

    expect(state.availability).toBe("closed");
  });

  it("describes external registration with and without a provider name", () => {
    const named = resolveWebinarRegistrationState(
      webinar({
        mode: "external",
        url: "https://zoom.example/register",
        providerName: "Zoom",
      }),
      { now: BEFORE_START },
    );
    const generic = resolveWebinarRegistrationState(
      webinar({ mode: "external", url: "https://example.com/register" }),
      { now: BEFORE_START },
    );

    expect(named.statusLine).toBe("Registration is handled on Zoom.");
    expect(named.action).toEqual({
      kind: "external",
      label: "Register on Zoom",
      href: "https://zoom.example/register",
    });
    expect(generic.statusLine).toBe(
      "Registration is handled on an external platform.",
    );
  });

  it("fails safely when an external registration URL is missing", () => {
    const state = resolveWebinarRegistrationState(
      webinar({ mode: "external", providerName: "Zoom" }),
      { now: BEFORE_START },
    );

    expect(state.availability).toBe("closed");
    expect(state.compactLabel).toBe("Registration unavailable");
    expect(state.action.kind).toBe("details");
  });

  it("honours an explicitly closed registration state and custom copy", () => {
    const state = resolveWebinarRegistrationState(
      webinar({ mode: "closed", closedLabel: "Applications are complete." }),
      { now: BEFORE_START },
    );

    expect(state.availability).toBe("closed");
    expect(state.statusLine).toBe("Applications are complete.");
  });
});
