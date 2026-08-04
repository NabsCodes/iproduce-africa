# iProduce Africa Website Handover

This folder is the maintained source for the client handover pack. It is
written for the client, not as a technical build log. Copy the finished files
into the shared client Drive folder; keep this repository version updated when
the website, access arrangements, or support scope changes.

## What this handover is

This is an **operational handover** for the live website: its editorial CMS,
content assets, service access, training, and support record. It is not a
transfer of source-code ownership or developer-managed hosting. Any change to
that technical ownership arrangement must be agreed separately in writing.

## Simple Google Drive package

Create one client-controlled folder named `iProduce Africa Website Handover`.
Keep the top level small and recognisable:

```text
iProduce Africa Website Handover
├── 01 iProduce Africa Website Handover Summary.pdf
├── 02 iProduce Africa CMS Editor Guide.pdf
├── 03 Access and Accounts (Restricted)
│   └── iProduce Africa - Client Access Summary.xlsx
├── 04 Training Recording
│   └── Recording file or link, with short chapter timestamps
```

The two PDFs and simple access summary in `client-ready/` are the client copies.
The matching Word files are editable masters for future corrections. The full
Access and Open Items Register remains an internal closeout record and should
not be uploaded to the client Drive. The Markdown files are working sources and
meeting aids, not additional client deliverables.

## Before sharing

1. Confirm the agreed support period and final issue date. Tobi Seun Ajayi's
   nominated account email is `ibotajayi@gmail.com`. Then export fresh PDFs
   from the editable masters.
2. Confirm the simple access summary is current. Do not enter passwords or
   secret keys.
3. Upload the two PDFs, simple access summary, and recording.
4. Give the nominated client administrator **Editor** access and give
   read-only participants **Viewer** access. Restrict the access/account folder
   to the two people who need it if the wider handover folder has more viewers.
5. Use [CMS Training and Handover Meeting](./cms-training-and-handover-meeting.md)
   for the call and [the handover email template](./handover-email-template.md)
   for the final dated delivery email.

## Never upload to the client folder

- Passwords, one-time recovery codes, API keys, `.env` files, or screenshots
  showing them
- Sanity/Vercel deployment secrets or webhook secrets
- Internal database exports, production backups, or raw form submissions
- Private personal files, unrelated project notes, or internal development logs

The access register records _who should own or administer a service_ and what
must be verified. Credentials are exchanged directly or through the client’s
approved password manager—not in Drive, email, or a meeting recording.
