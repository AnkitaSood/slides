<template>
  <!--     <div class="deck-chrome">
   <div class="hint">
        <button type="button" class="kbd-btn" @click="$emit('prev')" title="Previous slide (←)" aria-label="Previous slide">←</button>
        <button type="button" class="kbd-btn" @click="$emit('next')" title="Next slide (→)" aria-label="Next slide">→</button>
        move
        <span>·</span>
        <kbd>P</kbd>
        presenter
        <span>·</span>
        <kbd>F</kbd>
        fullscreen
      </div>
  </div>-->
  <div class="nav-controls">
    <button type="button" class="nav-btn" @click="$emit('prev')" title="Previous slide (←)" aria-label="Previous slide">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
    </button>
    <!--      <div class="counter">{{ current + 1 }} / {{ total }}</div>-->
    <button type="button" class="nav-btn" @click="$emit('next')" title="Next slide (→)" aria-label="Next slide">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
    </button>
  </div>
  <div class="progress" :style="{ width: `${((current + 1) / total) * 100}%` }"></div>
</template>

<script setup>
defineProps({
  current: { type: Number, required: true },
  total: { type: Number, required: true },
});

defineEmits(['prev', 'next']);
</script>

<style scoped>


/*.hint {
  position: fixed;
  bottom: 1rem;
  left: 1.2rem;
  color: var(--deck-faint);
  font-size: 0.82rem;
  letter-spacing: 0.04em;
  pointer-events: auto;
}*/

.nav-controls {
  position: fixed;
  right: 1.2rem;
  bottom: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  pointer-events: auto;
}

.nav-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.8rem;
  height: 1.8rem;
  padding: 0;
  border: 1px solid var(--deck-line-strong);
  border-radius: 6px;
  background: var(--deck-surface);
  color: var(--deck-muted);
  cursor: pointer;
  transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
}

.nav-btn:hover {
  background: var(--deck-surface-2);
  border-color: var(--deck-accent);
  color: var(--deck-text);
}

.counter {
  color: var(--deck-muted);
  font-family: var(--deck-font-mono);
  font-size: 0.82rem;
  letter-spacing: 0.04em;
}

.progress {
  height: 3px;
  background: linear-gradient(90deg, var(--deck-accent), var(--deck-accent-2));
  transition: width var(--slide-ease);
}

kbd,
.kbd-btn {
  display: inline-block;
  border: 1px solid var(--deck-line-strong);
  border-bottom-width: 2px;
  border-radius: 6px;
  padding: 0.05rem 0.35rem;
  color: var(--deck-text);
  font-family: var(--deck-font-mono);
  font-size: 0.72rem;
  background: transparent;
}

.kbd-btn {
  cursor: pointer;
  transition: background 0.15s ease, border-color 0.15s ease;
}

.kbd-btn:hover {
  background: var(--deck-surface-2);
  border-color: var(--deck-accent);
}

span {
  margin: 0 0.28rem;
}
</style>
