# Editorial Mobile Navigation Design

## Goal

Replace the generic stacked mobile navigation cards with a modern, recognizable command-menu experience that fits the cinematic portfolio brand.

## Approved design

- Use large, left-aligned navigation links without boxed backgrounds.
- Prefix links with two-digit sequence numbers.
- Highlight the active destination with a cyan-violet gradient and animated underline.
- Reveal menu items with a staggered slide-and-fade entrance.
- Add a subtle animated aurora and technical grid behind the navigation.
- Add a small `Navigate / Portfolio` label and `AI Platform & Backend Engineer` context line.
- Present Resume as a distinct bright pill CTA beneath the main links.
- Add a soft spotlight sweep on hover and keyboard focus.
- Preserve Escape-to-close, keyboard navigation, focus visibility, and body scroll locking.
- Disable decorative movement for reduced-motion visitors.

## Implementation checklist

1. Add semantic menu intro and decorative background layers.
2. Add sequence labels while preserving existing destination text and links.
3. Replace mobile boxed-link styling with editorial typography and active states.
4. Add stagger, aurora, grid, and spotlight animation.
5. Keep the desktop navigation unchanged.
6. Validate narrow and short screens, menu open/close, link navigation, keyboard focus, reduced motion, lint, and production build.
7. Keep the work local for review; do not push.
