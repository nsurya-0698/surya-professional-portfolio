# Natural Card Peekers Redesign

## Goal

Replace the geometric cartoon animals with restrained, natural-looking editorial wildlife artwork that feels integrated with the portfolio rather than added as novelty decoration.

## Approved direction

Use soft editorial wildlife illustrations with realistic proportions, delicate fur or feather texture, muted natural colors, and clean transparent backgrounds.

Keep three placements only:

- Arctic fox behind the Certifications cards
- Red fox behind the Personal Projects card
- Small owl behind the Professional Feedback card

Remove the otter from Contact to keep the application form visually quiet.

## Visual and motion treatment

Each animal is rendered as a transparent raster cutout and partially occluded by its host card. Desktop width is approximately 76–92 pixels; mobile width is approximately 50–58 pixels. Artwork uses a soft shadow and slightly lowered saturation so it belongs to the current navy, teal, and violet palette.

Motion is limited to a slow two-pixel breathing drift and a small reveal transition. No blinking, ear-wiggling, or continuous character acting is required; the natural artwork provides the personality.

## Accessibility and performance

Animals remain decorative, `aria-hidden`, non-interactive, and excluded from the reading order. Images use lazy loading and fixed dimensions to avoid layout shift. All animation is disabled for reduced-motion users.

## Verification

- Build and lint the project.
- Inspect all three sections at desktop and mobile widths.
- Confirm artwork remains behind cards and never obscures text or controls.
- Confirm Contact contains no decorative animal.
- Confirm reduced-motion disables drift and reveal motion.
