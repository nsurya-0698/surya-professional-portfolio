# Balanced Photo-Led Hero Design

## Goal

Replace the first editorial preview with a photo-led hero that feels aligned, informative, and calm. Preserve the portfolio's existing navy, teal, and violet identity while making the portrait the primary visual element.

## Approved Direction

Use a centered portrait stage governed by one shared desktop grid:

- A slim **left rail** contains Surya's name, role, and a compact professional introduction.
- A large, natural, unframed portrait occupies the center column.
- A matching **right rail** contains three concise recruiter-facing proof points: Oracle / Generative AI, enterprise GenAI and cloud platforms, and reliable delivery and operations.
- A low, aligned proof strip under the stage carries 6+ years of experience, approximately 70% faster RCA investigation, and 1–2 hours saved per integration-test run, followed by the two existing calls to action.

The composition prioritizes clear baseline alignment, matched rail widths, and intentional whitespace. It removes decorative indices, vertical rails, and any element that does not contribute to the hierarchy.

## Motion

Motion must be understated and GPU-friendly:

- One short entrance sequence for the rails, portrait, and proof strip.
- A slow 12–16 second portrait drift using only `transform`.
- A subtle teal-to-violet shimmer on the role line.
- Hover feedback only on actionable controls.
- No typewriter effect, tilt interaction, floating card motion, bounce, or continuously moving layout.
- Respect `prefers-reduced-motion` by disabling nonessential animation.

## Alternatives Considered

1. **Centered portrait stage (selected):** Best balance of visual identity, proof, and clean alignment.
2. **Side feature cards:** Adds more content but risks cluttering the portrait and repeating the previous problem.
3. **Asymmetrical magazine split:** More dramatic but less balanced and less recruiter-scannable.

## Scope

Only the homepage hero implementation changes. Current colors, portrait source image, navigation, resume link, assistant, analytics, and all downstream sections stay unchanged. No image generation, external asset, dependency, or network call is introduced.

## Validation

- Check desktop and narrow mobile rendering for alignment and overflow.
- Confirm reduced-motion behavior.
- Run component lint, production build, and existing assistant tests.
- Keep the work isolated to `surya/editorial-hero-preview` and do not publish or push it.
