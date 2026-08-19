# Simplified Byte Behavior Design

## Goal

Make Byte feel naturally playful and memorable through a few smooth, readable behaviors rather than many random or exaggerated actions.

## State model

- **Resting:** calm breathing, blinking, and subtle tail motion.
- **Traveling:** direction-correct running with movement duration calculated from distance so animation and travel remain synchronized.
- **Curious hover:** a restrained attentive/head-tilt animation and a delayed “Hi! Ask me about Surya.” prompt.
- **Settling:** one short posture-adjustment animation after running or dragging, followed by rest.
- **Assistant:** attentive while open, focused while thinking, and one small acknowledgement after replying.

Only one state can control Byte at a time. Assistant states have highest priority, followed by travel, settling, hover, and rest.

## Removed behavior

- Random gesture selection
- Random jumping after travel
- Reviewing as a pet gesture
- Repeated waving
- Automatic tooltip introduction
- Stacked bounce, glow, and hover transformations

## Movement

Travel duration is derived from viewport distance at a consistent target speed, with sensible desktop and mobile limits. A gentle acceleration/deceleration curve replaces the fixed fast transition. The directional running sprites remain active for the full transition and switch to settling only when movement actually completes.

Manual dragging and saved placement remain available. Dragging pauses roaming, and reset restores the default corner and occasional roaming.

## Validation

- Confirm one state at a time with no visual stacking.
- Confirm desktop and mobile travel use comparable perceived speed.
- Confirm the running sprite faces the travel direction until arrival.
- Confirm hover uses only the curious action and delayed prompt.
- Confirm settling returns to rest without jumping or waving.
- Confirm dragging, saved placement, reset, assistant opening, reduced motion, lint, and production build remain valid.
