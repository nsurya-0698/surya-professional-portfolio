# Continuous hero background

## Goal

Remove the visible boxed treatment behind the hero so the opening scene reads as part of the same uninterrupted navy page canvas.

## Decision

Remove only the hero-specific pseudo-element tint. Keep the site-wide grid, navy palette, portrait, content hierarchy, and scroll-driven two-scene animation unchanged.

## Verification

Confirm the hero has no separate tinted panel at desktop and mobile widths, then run the focused lint check and production build.
