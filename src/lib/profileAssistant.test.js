import assert from 'node:assert/strict';
import test from 'node:test';
import { createLocalAssistantReply } from './profileAssistant.js';

const assertContactFallback = (question) => {
  const reply = createLocalAssistantReply(question);

  assert.match(reply, /do not want to (guess|claim)/i);
  assert.match(reply, /nammiteja087@gmail\.com/);
  assert.match(reply, /linkedin\.com/);
  assert.match(reply, /#contact/);
};

test('local fallback does not invent hobbies or preferences', () => {
  assertContactFallback('What is Surya favorite food?');
  assertContactFallback('Tell me about his hobbies');
});

test('local fallback does not claim an unlisted technology', () => {
  assertContactFallback('Does Surya know Rust?');
});

test('local fallback still answers supported profile questions', () => {
  assert.match(createLocalAssistantReply('What did Surya do at Oracle?'), /Agent Gateway/);
  assert.match(createLocalAssistantReply('Who is Surya?'), /6\+ years/);
});
