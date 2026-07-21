<template>
  <section class="slide" :class="slideClasses">
    <div class="slide-inner">
      <header v-if="slide.eyebrow || slide.title" class="slide-header">
        <div v-if="slide.eyebrow" class="eyebrow">{{ slide.eyebrow }}</div>
        <h1 v-if="slide.title" class="title">{{ slide.title }}</h1>
      </header>
      <div v-if="slide.bodyHtml" class="body markdown animate-item" v-html="slide.bodyHtml"></div>
      <div class="block-stack">
        <div
          v-for="(block, index) in slide.blocks"
          :key="`${slide.id}-${index}`"
          class="animate-item"
          :style="{ '--stagger': `${index + 1}` }"
        >
          <SlideBlock :block="block" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import SlideBlock from './SlideBlock.vue';

const props = defineProps({
  slide: { type: Object, required: true },
  active: { type: Boolean, default: false },
});

const slideClasses = computed(() => [
  `layout-${props.slide.layout}`,
  `animate-${props.slide.animate ?? 'ease-in'}`,
  { active: props.active },
  ...(props.slide.classes ?? []),
]);
</script>

<style scoped>
.slide {
  position: absolute;
  inset: 0;
  display: none;
  padding: var(--slide-pad);
  background:
    radial-gradient(1100px 700px at 85% -8%, color-mix(in srgb, var(--deck-accent) 10%, transparent), transparent 60%),
    radial-gradient(950px 650px at -6% 108%, color-mix(in srgb, var(--deck-warn) 8%, transparent), transparent 56%),
    var(--deck-bg);
}

.slide.active {
  display: block;
}

.slide-inner {
  position: relative;
  width: 100%;
  height: 100%;
  padding: clamp(1rem, 2vw, 2rem);
  border-radius: 28px;
}

.eyebrow {
  margin-bottom: 0.3rem;
  color: var(--deck-accent);
  font-size: 0.84rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.title {
  margin: 0;
  font-family: var(--deck-font-display);
  font-size: var(--slide-title-size);
  line-height: 0.95;
  letter-spacing: 0.01em;
  white-space: pre-line;
}

.body {
  max-width: 58rem;
  margin-top: 1rem;
  font-size: var(--slide-body-size);
  line-height: 1.5;
  color: var(--deck-muted);
}

.block-stack {
  display: grid;
  gap: var(--slide-gap);
  margin-top: 1.2rem;
}

.layout-two-column .slide-inner {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  gap: 2rem;
  align-content: center;
}

.layout-two-column .slide-header,
.layout-two-column .body {
  grid-column: 1;
}

.layout-two-column .block-stack {
  grid-column: 2;
  align-content: center;
  margin-top: 0;
}

.animate-item {
  opacity: 0;
  transform: translateY(20px);
}

.active .animate-item {
  animation: easeIn var(--slide-ease) both;
  animation-delay: calc(var(--stagger, 1) * 90ms);
}

.active .title,
.active .eyebrow {
  animation: easeIn var(--slide-ease) both;
}

.active .body {
  animation: easeIn calc(var(--slide-duration) + 80ms) var(--slide-timing-function) both;
  animation-delay: 70ms;
}

.markdown :deep(p) {
  margin: 0.8rem 0 0;
}

.markdown :deep(p:first-child) {
  margin-top: 0;
}

@keyframes easeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
