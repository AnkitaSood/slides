<template>
  <main class="presenter">
    <section class="pane pane-current">
      <div class="eyebrow">Current Slide</div>
      <div class="slide-title">{{ currentSlide.title }}</div>
      <div class="notes markdown" v-html="currentSlide.notesHtml"></div>
    </section>

    <section class="pane pane-next">
      <div class="eyebrow">Next Slide Preview</div>
      <div class="preview-card">
        <div class="preview-title">{{ nextSlide?.title ?? 'End of deck' }}</div>
        <div class="preview-body" v-if="nextSlide">
          <div class="notes markdown" v-html="nextSlide.notesHtml"></div>
        </div>
        <div v-else class="preview-body">No next slide.</div>
      </div>
    </section>
  </main>
</template>

<script setup>
defineProps({
  currentSlide: { type: Object, required: true },
  nextSlide: { type: Object, default: null },
});
</script>

<style scoped>
.presenter {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 1.25rem;
  min-height: 100vh;
  padding: 1.25rem;
  background: var(--deck-bg);
}

.pane {
  border: 1px solid var(--deck-line-strong);
  border-radius: 20px;
  background: color-mix(in srgb, var(--deck-surface) 88%, black);
  padding: 1rem 1.1rem;
}

.eyebrow {
  color: var(--deck-faint);
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-size: 0.76rem;
  font-weight: 700;
}

.slide-title,
.preview-title {
  margin-top: 0.55rem;
  color: var(--deck-accent);
  font-family: var(--deck-font-display);
  font-size: clamp(2rem, 4vw, 3rem);
  line-height: 1;
}

.notes,
.preview-body {
  margin-top: 1rem;
  color: var(--deck-muted);
  font-size: 1.05rem;
  line-height: 1.65;
}

.preview-card {
  padding: 0.2rem 0;
}

.markdown :deep(p) {
  margin: 0 0 0.9rem;
}
</style>
