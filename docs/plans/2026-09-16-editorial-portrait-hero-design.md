# Editorial Portrait Hero Preview Design

## Goal

Create a reversible, portrait-led hero preview that borrows the reference's editorial composition while preserving Surya's existing navy, teal, and violet portfolio identity. The scope is intentionally limited to the homepage hero.

## Approved Direction

Use a desktop three-column composition:

- **Left:** Surya's role, name, animated value statement, concise supporting copy, and primary calls to action.
- **Center:** The existing transparent `Image-cutout-native.png` portrait, large and frame-free, grounded at the bottom of the hero.
- **Right:** A small editorial proof panel describing Surya's focus and engineering approach.

The portrait will retain natural color and receive only subtle navy/teal depth lighting. The implementation will remove the current floating status cards, animated aurora blobs, and portrait tilt/floating behaviors from the hero so the portrait stays calm and authentic.

## Alternatives Considered

1. **Editorial three-column layout (selected):** Most faithful to the reference, prioritizes the portrait and preserves recruiter readability.
2. **Cinematic overlapping portrait:** More dramatic, but risks obscuring text and interaction targets.
3. **Minimal split screen:** Most conservative and responsive, but does not provide the intended memorable visual impact.

## Component and Data Flow

Only `src/components/sections/Hero/index.jsx` and `src/components/sections/Hero/index.css` will change. Existing text, links, resume asset, typewriter behavior, navigation, assistant, analytics, and all downstream sections remain untouched.

The existing portrait asset remains local and no third-party image, image generation, or network request is introduced.

## Responsiveness and Accessibility

- Desktop uses a balanced editorial grid with a large central portrait.
- Tablet and mobile switch to a portrait-first single-column order while retaining readable tap targets and all content.
- `prefers-reduced-motion` disables the reveal effect and cursor animation.
- The portrait retains descriptive alternative text; no essential information is carried only by decorative elements.

## Error Handling

The design introduces no data fetching or runtime dependencies. If the image cannot render, its accessible alternative text remains available and surrounding hero content remains usable.

## Validation

- Run the production build and lint/test commands available in the repository.
- Inspect the local preview at desktop and narrow mobile viewport widths.
- Verify no unrelated files, assistant behavior, or section ordering changes.
