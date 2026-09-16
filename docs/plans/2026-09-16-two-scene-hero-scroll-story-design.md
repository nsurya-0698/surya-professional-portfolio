# Two-Scene Hero Scroll Story Design

## Goal

Reduce the information density around the photo-led hero while adding a smooth, recruiter-friendly scroll interaction. The effect must be contained to the hero, feel cinematic rather than gimmicky, and preserve the existing navy, teal, and violet brand.

## Approved Direction

Use a two-scene hero sequence:

1. **Introduction scene:** Show Surya's name, role, one compact current-role line, a short summary, two calls to action, and the natural portrait. The detailed proof list and metric strip are removed from the resting view.
2. **Capability scene:** As the visitor scrolls through the hero, the portrait makes a modest perspective turn and the side copy crossfades to three concise capability labels: Enterprise GenAI, Cloud platforms, and Reliable operations.

The hero sequence is active only while the hero is visible. It returns to the introduction state when the visitor scrolls back upward and settles after the visitor reaches the following section.

## Motion and Performance

- Map the hero's in-view scroll progress to one CSS custom property using a passive scroll listener and `requestAnimationFrame`.
- Use only composited `transform` and `opacity` animation for portrait and copy transitions.
- Limit portrait motion to a small perspective rotation, depth shift, and scale; no full spin or continuous layout movement.
- Keep the existing slow portrait drift only during the resting portion, and disable all nonessential motion under `prefers-reduced-motion`.
- Avoid scroll-linked React rerenders and avoid measurement work outside the hero viewport.

## Accessibility and Responsiveness

- The complete introduction content remains present and accessible; the scene transition is visual only.
- The reduced-motion preference disables the scroll turn and preserves the introduction scene.
- On narrow screens, use a softer portrait shift and capability reveal with no aggressive perspective rotation.

## Scope and Validation

Only the hero component and styles change. Navigation, source portrait asset, assistant, analytics, downstream sections, and live deployment remain untouched.

Validate the hero at desktop and narrow widths, with reduced-motion behavior, production build, lint, and assistant tests. Keep all work on `surya/editorial-hero-preview` without pushing or publishing.
