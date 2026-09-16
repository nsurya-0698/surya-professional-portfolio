import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import {
  RESUME_CONTEXT,
  RESUME_PDF_SHA256,
} from '../src/data/resumeKnowledge.js';

const resumePath = fileURLToPath(
  new URL('../src/assets/documents/Surya.pdf', import.meta.url)
);

test('keeps the server-owned resume context tied to the checked-in PDF', async () => {
  const pdf = await readFile(resumePath);
  const hash = createHash('sha256').update(pdf).digest('hex');

  assert.equal(hash, RESUME_PDF_SHA256);
  assert.match(RESUME_CONTEXT, /Senior software engineer with 6\+ years/);
  assert.match(RESUME_CONTEXT, /Software Developer 3 - Generative AI \| Oracle/);
  assert.match(RESUME_CONTEXT, /reducing on-call investigation time by approximately 70%/);
  assert.match(RESUME_CONTEXT, /four dependent services/);
});
