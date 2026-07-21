---
slide: interaction-patterns
---
Ask the room: “How long before a silent interface feels broken?” Usually far less than an LLM response.

Walk the phases. Acknowledge immediately, stream meaningful partial output, name tool activity, preserve the prompt on failure, then settle into a stable final layout.

plushelter pairs `status()` with a Stop control. Cancellation is not an error state; it is user agency.

Call out layout shift: reserve the response region before the first token and avoid moving the composer while text grows.

