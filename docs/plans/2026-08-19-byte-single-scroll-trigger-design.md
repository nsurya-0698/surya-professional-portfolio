# Byte Single Scroll-Stop Trigger

## Change

Byte will begin one side-to-side run after the first meaningful scroll interaction followed by approximately one second without scrolling. The previous requirement for two to four separate scroll-and-stop cycles is removed because it made the feature appear inactive.

A 28-second cooldown prevents repeated runs from distracting the visitor. Manual placement, assistant-open state, reduced-motion preferences, and an active run or settling state still suppress new runs.

The existing distance-based travel speed, directional sprites, settling animation, hover behavior, and draggable positioning remain unchanged.

## Validation

- One meaningful scroll and pause starts a run.
- Small incidental scroll movement does not start a run.
- Additional scrolling during the 28-second cooldown does not start another run.
- Desktop and mobile movement remain smooth and direction-correct.
