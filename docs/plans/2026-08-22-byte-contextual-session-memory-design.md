# Byte Contextual Session Memory Design

## Goal

Make Byte behave like an interactive chatbot that understands follow-up questions from the current open chat. Replies such as “yes,” “tell me more,” “what technologies did he use?”, and clear topic switches must be interpreted using the conversation that immediately preceded them.

Memory is session-only. Refreshing or reopening the portfolio starts a new conversation. The design adds no database, persistent browser storage, paid service, or cross-visitor tracking.

## Chosen Approach

Use a hybrid, stateless request design:

- The React chat component keeps a small conversation-context object in component memory.
- Every request continues to include a bounded recent transcript.
- The Worker validates the context object, combines it with the current message, and returns the next validated context with the answer.
- Explicit current intent always overrides prior context.
- The résumé and general-model trust boundaries remain separate.

This provides deterministic continuity without relying only on a model to infer state and without adding server-side session storage.

## Conversation Context

The context contains only bounded routing metadata:

- active route family: profile, general, or weather;
- active subject: Surya, another named subject, or none;
- last resolved question, with a strict length limit;
- pending clarification type and its bounded original question;
- clarification turn count so an unresolved question cannot loop indefinitely.

The context is never treated as a system instruction. The Worker validates permitted enums and lengths, and all sensitive-profile, prompt-injection, weather, and explicit-topic checks run against the current visitor message before context inheritance.

## Conversation Behavior

### Follow-ups

- “Tell me more,” “why?”, and “what technologies?” inherit the most recent resolved topic and subject.
- Pronouns inherit the active subject: “What did he build?” can refer to Surya after a Surya turn or to Alan Turing after an Alan Turing turn.
- Explicit names and topics replace the previous subject or topic.

### Clarifications

Ambiguous questions create a pending clarification instead of repeatedly reclassifying the transcript.

For example:

1. Visitor: “Tell me about projects.”
2. Byte: “Are you asking about Surya’s portfolio projects?”
3. Visitor: “Yes.”
4. Byte resolves the stored project-scope clarification to the canonical Surya-projects question and answers it.

“No” resolves the same pending clarification to projects in general. The words “yes” and “no” receive this meaning only while that specific clarification is pending. Without a pending clarification, Byte asks what the visitor is confirming rather than guessing.

If a visitor asks a clear new question while a clarification is pending, Byte abandons the clarification and answers the new topic. A clarification can be repeated at most once with more explicit wording; it must never enter an infinite loop.

## Request and Response Flow

1. The UI sends the current message, bounded recent messages, and in-memory context.
2. The Worker validates all three inputs.
3. Deterministic safety and explicit-intent routing run first.
4. A pending clarification is resolved only when the new message is a valid contextual reply.
5. Otherwise, the active topic and subject may supply continuity for a genuine follow-up.
6. The selected profile, general, weather, or deterministic handler produces the response.
7. The Worker returns the answer and the next context.
8. The UI stores that context only in React state. Refreshing the page discards it.

Provider failures do not advance or corrupt context. A retry uses the last successful context. Local frontend fallbacks preserve deterministic clarification behavior when the Worker is unavailable.

## Security and Grounding

- Current-message sensitive checks always override inherited state.
- Profile answers remain grounded only in the canonical portfolio context.
- General-model requests never receive the résumé context.
- Client-supplied assistant-role messages remain untrusted and are never forwarded as trusted assistant instructions.
- Context cannot enable salary, immigration, private, or unsupported personal claims.
- Context fields are bounded and validated; malformed context is ignored safely.

## Testing

Add unit and Worker endpoint coverage for:

- projects → yes and projects → no;
- clarification → explicit Surya/general wording;
- clarification → unrelated topic switch;
- repeated ambiguity without an infinite loop;
- profile and general “tell me more” follow-ups;
- pronouns after Surya and after a general named subject;
- sensitive and injection attempts after innocent context;
- forged or malformed context;
- provider error and retry without context corruption;
- component remount/refresh resetting context;
- frontend and Worker routing parity.

Run the full assistant test suite, ESLint, production build, Wrangler dry-run, remote canaries, and an end-to-end browser conversation before deployment.

## Non-Goals

- No memory after refresh or across devices.
- No database, Durable Object, KV store, or analytics-backed chat storage.
- No unrestricted model access to trusted résumé instructions.
- No global rule that always maps “yes” to Surya.
