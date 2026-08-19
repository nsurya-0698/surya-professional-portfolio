# Typewriter Headline and Responsive Contact Dock

## Goal

Add a prominent rotating typewriter message to the hero and make the portfolio's social/contact actions usable at every screen size.

## Approved typewriter content

1. Building reliable AI & cloud platforms that ship.
2. Engineering production-ready GenAI experiences.
3. Turning complex systems into dependable products.
4. Automating cloud delivery with confidence.

The hero writes each sentence character by character, pauses, deletes it, and advances to the next sentence. A blinking gradient cursor reinforces the typing effect. The headline reserves enough height to prevent layout shifts. Reduced-motion visitors see the first complete sentence without typing or deletion.

## Contact behavior

- Replace the vertical email-address text with a compact mail icon.
- Preserve the mailto destination, full accessible name, and native tooltip.
- Keep the existing desktop GitHub/LinkedIn rail and a matching right-side mail action.
- On narrower screens, replace the hidden rails with a fixed glass contact dock containing GitHub, LinkedIn, and email icons.
- Ensure the dock clears device safe areas and does not obscure primary page controls.

## Validation

- Verify the phrase typing, pause, deletion, and loop behavior.
- Verify a static complete phrase under reduced motion.
- Test desktop rails and the small-screen contact dock.
- Run lint, production build, and browser console checks.
- Keep the work local for review; do not push.
