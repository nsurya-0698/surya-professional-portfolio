# Focused Feedback Carousel and Transparent Header

## Goal

Reduce the vertical footprint of Professional Feedback while presenting each testimonial with enough focus to remain readable, and remove the solid header panel so navigation feels integrated with the page background.

## Approved carousel

- Display one centered testimonial as the active card.
- Keep the previous and next cards partially visible at the sides.
- Advance one card every 5.5 seconds with a smooth horizontal transition.
- Pause on hover, keyboard focus, or touch interaction.
- Enlarge and brighten the active card while side cards remain smaller and muted.
- Provide previous/next controls, progress dots, and horizontal swipe gestures.
- Keep a stable compact stage height so testimonials do not lengthen the page.
- Use instant transitions for reduced-motion visitors.

## Page order

Experience → Skills → Certifications → Personal Projects → Professional Feedback → Contact.

## Header

- Remove the solid navy/blue header background and bottom divider.
- Retain sticky positioning and a light backdrop blur so navigation remains readable over the original page background.
- Preserve the full-screen mobile navigation overlay when opened.

## Validation

- Verify auto-advance, pause, controls, indicators, wraparound, and swipe.
- Verify desktop and mobile card layouts.
- Verify the transparent sticky header and mobile menu.
- Run lint, production build, and browser console checks.
- Keep the work local for review; do not push.
