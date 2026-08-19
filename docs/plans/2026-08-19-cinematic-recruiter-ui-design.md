# Cinematic Recruiter Portfolio UI Design

## Goal

Make the portfolio immediately useful to recruiters while creating a memorable, animation-rich personal brand. A visitor should understand Surya's target roles, engineering strengths, and strongest evidence within ten seconds.

## Direction

Use a recruiter-first cinematic experience. Preserve the dark navy, cyan, and violet identity, but replace repetitive floating and pulsing effects with one coordinated motion system. Animation must reinforce hierarchy, reveal relationships, and respond smoothly without delaying access to content.

## Information Architecture

1. Compact hero with headline, target-role label, concise value proposition, Resume and Contact actions, and portrait.
2. Recruiter snapshot with four evidence-based strengths: AI platforms, backend systems, multi-cloud delivery, and production reliability.
3. Selected work as three concise case studies with engineering contribution and outcome.
4. Experience timeline focused on recent relevance while keeping the complete history available.
5. Technical expertise grouped for fast keyword scanning.
6. Certifications and professional feedback.
7. Focused contact section and compact footer.

The informal Support offering will not appear in primary navigation. It may remain as a quiet footer link so the job-search story remains dominant.

## Components and Layout

- Reduce desktop navigation to Experience, Work, Skills, Feedback, Contact, and Resume. Add active-section indication.
- Keep the complete first impression inside the initial viewport on common laptop displays.
- Build the hero as a balanced two-column layout with an animated atmospheric background and technical orbit accents around the portrait.
- Add a four-item snapshot rail immediately beneath the hero.
- Strengthen project cards with category, contribution, technologies, and outcome-oriented copy.
- Use a denser, easier-to-scan experience layout on desktop and a clean single column on mobile.
- Render feedback as a balanced grid with equal card rhythm rather than an autoplay carousel.

## Motion System

- Use an ambient aurora and grid drift behind the hero.
- Reveal hero elements in a short coordinated sequence.
- Use IntersectionObserver-powered section reveals with subtle stagger.
- Animate the experience path as it enters the viewport.
- Add restrained pointer-responsive tilt and spotlight effects to project cards on capable desktop devices.
- Use smooth underline and pill transitions for navigation and calls to action.
- Do not use audio, hidden typewriter text, constant bouncing, or automatic carousels.
- Honor `prefers-reduced-motion` and disable pointer effects on touch devices.

## Accessibility and Performance

- Keep all essential content present in the DOM before animation.
- Maintain keyboard-visible focus states, semantic headings, and sufficient contrast.
- Favor CSS transforms and opacity to avoid layout thrashing.
- Avoid new animation libraries unless the existing stack cannot provide the required experience.
- Validate laptop desktop, narrow mobile, reduced motion, keyboard navigation, console output, lint, and production build.

## Delivery Constraint

Build and review locally on `codex/cinematic-ui-preview`. Do not push or deploy until the user explicitly approves the preview.
