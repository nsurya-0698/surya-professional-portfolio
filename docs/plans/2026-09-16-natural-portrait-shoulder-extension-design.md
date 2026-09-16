# Natural Portrait Shoulder Extension Design

## Goal

Replace the hard shoulder crop in the photo-led hero with a natural upper-body silhouette while preserving Surya's identity, expression, suit, lighting, and transparent presentation.

## Approved Direction

Create a new, non-destructive transparent PNG derived from `Image-cutout-native.png`. The edit will extend both suit shoulders naturally beyond the original horizontal boundaries, retain the exact face and outfit, and leave the background transparent. The original source file remains untouched.

The hero will reference the new sibling asset only after visual inspection confirms a believable shoulder line. No unrelated hero layout or portfolio content changes are included.

## Alternatives Considered

1. Natural shoulder extension with an identity-preserving image edit (selected).
2. CSS-only scale/crop adjustment, which would make the portrait smaller without solving the source-boundary cut.
3. Fully regenerated studio portrait, which poses unnecessary likeness and wardrobe drift risk.

## Validation

- Inspect the generated image against the source for face, suit, shoulder, alpha, and edge fidelity.
- Confirm it looks natural in the desktop hero and does not introduce an opaque background.
- Run lint, production build, and the existing assistant test suite.
- Keep the change confined to `surya/editorial-hero-preview`; do not publish or overwrite the original asset.
