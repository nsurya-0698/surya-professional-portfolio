# Header and Portrait Effects Cleanup

## Goal

Remove the desktop navigation's translucent blur block and the glow/sweep effects behind the hero portrait without altering layout, responsiveness, or the portrait's existing movement.

## Changes

- Remove the desktop header backdrop blur and saturation effect.
- Remove the portrait aura and animated sweep elements from the hero markup.
- Preserve mobile menu backgrounds for readability.
- Preserve navigation spacing, active states, portrait tilt/float behavior, and all other page animations.

## Validation

- Run lint and the production build.
- Confirm removed effect selectors are no longer referenced.
- Review the local desktop and mobile layouts.
