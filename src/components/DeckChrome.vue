<template>
  <div class="deck-chrome">
    <div class="hint">
      <kbd>←</kbd>
      <kbd>→</kbd>
      move
      <span>·</span>
      <kbd>P</kbd>
      presenter
      <span>·</span>
      <kbd>F</kbd>
      fullscreen
    </div>
    <div class="counter">{{ current + 1 }} / {{ total }}</div>
    <div class="progress" :style="{ width: `${((current + 1) / total) * 100}%` }"></div>
  </div>
</template>

<script setup>
defineProps({
  current: { type: Number, required: true },
  total: { type: Number, required: true },
});
</script>

<style scoped>
.deck-chrome {
  position: fixed;
  inset: auto 0 0 0;
  z-index: 50;
  pointer-events: none;
}

.hint,
.counter {
  position: fixed;
  bottom: 1rem;
  color: var(--deck-faint);
  font-size: 0.82rem;
  letter-spacing: 0.04em;
  pointer-events: none;
}

.hint {
  left: 1.2rem;
}

.counter {
  right: 1.2rem;
  color: var(--deck-muted);
  font-family: var(--deck-font-mono);
}

.progress {
  height: 3px;
  background: linear-gradient(90deg, var(--deck-accent), var(--deck-accent-2));
  transition: width var(--slide-ease);
}

kbd {
  display: inline-block;
  border: 1px solid var(--deck-line-strong);
  border-bottom-width: 2px;
  border-radius: 6px;
  padding: 0.05rem 0.35rem;
  color: var(--deck-text);
  font-family: var(--deck-font-mono);
  font-size: 0.72rem;
}

span {
  margin: 0 0.28rem;
}
</style>
