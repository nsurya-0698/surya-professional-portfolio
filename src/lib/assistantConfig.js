import { PROFILE_KNOWLEDGE } from '../data/profileKnowledge.js';

export const OPENROUTER_MODEL = 'inclusionai/ling-3.0-flash-vl:free';

export const UNKNOWN_REPLY =
  `I don't see that detail in Surya's portfolio, so I don't want to guess. ` +
  `Please reach out to Surya at ${PROFILE_KNOWLEDGE.contact.email}, connect with him on LinkedIn: ` +
  `${PROFILE_KNOWLEDGE.contact.linkedin}, or use the Contact section: #contact.`;
