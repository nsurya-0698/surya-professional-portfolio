# Resume and Portfolio Synchronization Design

## Goal

Make the approved two-page resume PDF the portfolio's single public resume and align visible portfolio content and assistant knowledge with the same source of truth.

## Design

- Preserve the existing `Surya.pdf` asset path so links already shared through the deployed portfolio remain valid.
- Replace that asset with the approved `SuryaTejaNammi_Resume_Codex_Skills_Final.pdf`.
- Synchronize the visible experience timeline, skills matrix, certification descriptions, site metadata, and curated assistant knowledge with the approved resume.
- Correct conflicts including the 6+ years summary, Oracle Tennessee location, Quest and Paytm dates, Oracle Codex/RCA achievement, current role titles, and expanded skill categories.
- Keep the current UI, animation system, navigation, and PDF-only download behavior unchanged.

## Validation

- Run lint and the production build.
- Confirm all resume imports resolve to the updated PDF.
- Search for stale dates, locations, titles, and experience counts.
- Preview the generated site locally and verify the resume opens from both the header and hero actions.

## Release Boundary

Implement and validate locally. Do not push until the user reviews or explicitly requests publishing.
