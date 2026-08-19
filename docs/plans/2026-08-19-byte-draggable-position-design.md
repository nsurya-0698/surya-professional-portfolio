# Draggable Byte Position Design

## Goal

Let every visitor move Byte away from content they are reading while preserving Byte's assistant and occasional roaming behavior.

## Behavior

- Byte can be dragged with a mouse, trackpad, pen, or touch gesture.
- Movement is clamped to safe viewport margins so Byte cannot be lost off-screen.
- Dragging never opens or closes the assistant; an ordinary click still does.
- The visitor's selected position is stored only in local browser storage and restored on later visits.
- Manual placement pauses automatic roaming so Byte respects the visitor's choice.
- A compact reset control returns Byte to the default bottom-right position and resumes occasional roaming.
- Resizing or rotating the viewport clamps a saved position back into view.
- Keyboard visitors can use Shift plus an arrow key to place or move Byte and can use the reset control normally.
- Reduced-motion preferences remain supported.

## Implementation

The assistant component tracks an optional manual `{x, y}` viewport position. Pointer capture provides reliable dragging outside the launcher's original bounds. A small movement threshold distinguishes a drag from a click. The shell uses fixed `left` and `top` coordinates while manually placed; otherwise it continues using the existing side-to-side roaming state machine.

The component stores the validated coordinates under a dedicated local-storage key. It calculates the panel's opening direction from Byte's current horizontal half so the panel stays inside the viewport.

## Validation

- Drag Byte in every direction and verify viewport clamping.
- Verify dragging does not toggle the chat and clicking still does.
- Refresh and confirm the chosen position is restored.
- Verify automatic roaming stops after placement and resumes after reset.
- Verify the assistant panel opens inward from both viewport halves.
- Verify mobile touch placement and desktop keyboard movement.
- Verify no console, lint, or production-build errors.
