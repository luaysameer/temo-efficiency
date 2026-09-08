# Examples

## 1. Deterministic documentation cleanup

Score: complexity 0 + risk 0 + scope 0 + verification 0 + uncertainty 0 = 0

Route: FAST / Low

Reason: no need to spend deep reasoning on a deterministic edit.

## 2. Focused production UI bug with known root cause

Score: complexity 1 + risk 1 + scope 0 + verification 1 + uncertainty 0 = 3

Route: BALANCED / Medium

Checkpoint: modify only the affected UI path, run targeted interaction tests, deploy if permitted, stop.

## 3. Regression that survived existing tests

Score: complexity 1 + risk 1 + scope 1 + verification 2 + uncertainty 2 = 7

Route: DEEP / High if needed

Checkpoint: reproduce the exact live path, identify why the contract test missed it, fix the smallest boundary, add an interaction-level regression guard, run protected tests.

## 4. Architecture migration touching auth, data, and deployment

Score: complexity 2 + risk 2 + scope 2 + verification 2 + uncertainty 1 = 9

Route: MAX / High

Reason: broad coupling and production blast radius justify the strongest profile.

## 5. Escalation example

Start a focused parser bug at BALANCED / Medium. If targeted diagnostics show that the parser is correct but the failure crosses browser automation, upstream redirects, cache semantics, and production edge behavior, keep the evidence and escalate to DEEP. Do not restart the investigation from the beginning.
