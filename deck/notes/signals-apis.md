---
slide: signals-apis
---
Frame these APIs as one vocabulary, not a bag of features.

Spend most of the walkthrough on `linkedSignal`. In plushelter, a new AI triage result resets `caseFile`; after that, the human can edit the case before saving it. A `computed()` would be read-only. A plain `signal()` would not reset when the upstream model result changed.

Use effects only at imperative boundaries. Prefer `computed()` for derivation and `linkedSignal()` for derived-but-editable state.

References: https://angular.dev/guide/signals and https://angular.dev/guide/signals/linked-signal

