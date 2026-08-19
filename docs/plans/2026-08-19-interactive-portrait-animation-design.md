# Interactive Portrait Animation Design

## Goal

Make the frameless portrait feel visibly animated and modern while preserving the professional, recruiter-focused presentation.

## Approved interaction

- Retain the subtle idle vertical float.
- Tilt the portrait gently toward the pointer on desktop.
- Move the ambient cyan-violet glow with the portrait interaction.
- Add a restrained periodic light sweep behind the portrait.
- Keep mobile motion passive and lightweight rather than requiring hover.
- Reset the portrait smoothly when the pointer leaves.
- Disable tilt, float, glow breathing, and light sweep for reduced-motion visitors.

## Implementation checklist

1. Track pointer position relative to the portrait container and expose normalized CSS variables.
2. Apply bounded 3D rotation and glow translation using those variables.
3. Add a decorative light-sweep layer behind the transparent portrait.
4. Preserve semantic image content and keep all decorative elements hidden from assistive technology.
5. Validate lint, production build, desktop pointer behavior, mobile layout, and browser errors.
6. Keep all work local for review; do not push.
