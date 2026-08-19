# Byte Scroll-Roaming Design

## Goal

Make Byte feel alive without distracting portfolio visitors. After a visitor scrolls and then pauses, Byte may occasionally run from his current side of the viewport to the opposite side. He remains there for a while and performs small, friendly gestures before another eligible scroll pause can send him back.

## Behavior

- Scroll activity never moves Byte immediately. A short scroll-stop delay prevents animation while the visitor is actively reading or navigating.
- An eligible scroll stop triggers only occasionally and is protected by a cooldown, so roaming does not happen after every scroll.
- Byte alternates sides: bottom-right to bottom-left, then bottom-left to bottom-right.
- Travel uses the matching directional running row from Byte's validated sprite atlas.
- After arriving, Byte stays on that side and cycles through restrained idle behaviors such as walking in place, waiting, waving, looking around, or a small jump.
- Opening the assistant cancels travel and keeps Byte anchored on his current side while the panel is open.
- Closing the assistant resumes normal idle behavior; roaming remains subject to the cooldown.
- Mobile uses a shorter safe path within viewport margins.
- `prefers-reduced-motion` disables travel and rapid sprite animation.

## Implementation

The assistant component owns a small roaming state machine: `resting`, `running-left`, `running-right`, and `gesturing`. A debounced passive scroll listener decides when scrolling has stopped. Cooldown and probability checks gate transitions. CSS transforms move the fixed assistant shell across the viewport, while the avatar continues selecting atlas rows and frames in React.

The chat panel remains aligned to the viewport and opens inward from the side where Byte is resting, preventing off-screen overflow.

## Validation

- Confirm occasional triggering rather than per-scroll triggering.
- Confirm alternating right-to-left and left-to-right movement.
- Confirm gestures begin only after travel completes.
- Confirm the chat opens fully on both sides.
- Confirm no console errors, no content obstruction, and safe mobile margins.
- Confirm reduced-motion mode keeps Byte stationary.
