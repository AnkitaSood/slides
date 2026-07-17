<template>
  <aside
    ref="drawer"
    class="notes-drawer"
    :class="{ open, dragging }"
    :style="drawerStyle"
  >
    <div class="bar" @pointerdown="startDrag">
      <div>
        <div class="label">Speaker Notes</div>
        <div class="title">{{ title }}</div>
      </div>
      <div class="actions">
        <button type="button" class="popout" @click.stop="$emit('popout')">Pop out</button>
        <button type="button" class="close" @click.stop="$emit('close')">×</button>
      </div>
    </div>
    <div class="content markdown" v-html="html"></div>
  </aside>
</template>

<script setup>
import { computed, onBeforeUnmount, ref } from 'vue';

const props = defineProps({
  open: { type: Boolean, default: false },
  title: { type: String, default: '' },
  html: { type: String, default: '' },
});

defineEmits(['close', 'popout']);

const drawer = ref(null);
const dragging = ref(false);
const position = ref({ top: 25.6, right: 25.6, left: null });
let dragState = null;

const drawerStyle = computed(() => ({
  top: `${position.value.top}px`,
  right: position.value.left == null ? `${position.value.right}px` : 'auto',
  left: position.value.left == null ? 'auto' : `${position.value.left}px`,
}));

function startDrag(event) {
  if (!props.open) return;
  if (event.target.closest('button')) return;

  const element = drawer.value;
  if (!element) return;

  const rect = element.getBoundingClientRect();
  position.value = {
    top: rect.top,
    left: rect.left,
    right: null,
  };

  dragState = {
    offsetX: event.clientX - rect.left,
    offsetY: event.clientY - rect.top,
    width: rect.width,
    height: rect.height,
  };

  dragging.value = true;
  window.addEventListener('pointermove', dragMove);
  window.addEventListener('pointerup', stopDrag);
}

function dragMove(event) {
  if (!dragState) return;

  const maxLeft = Math.max(0, window.innerWidth - dragState.width);
  const maxTop = Math.max(0, window.innerHeight - dragState.height);
  position.value = {
    left: Math.min(Math.max(0, event.clientX - dragState.offsetX), maxLeft),
    top: Math.min(Math.max(0, event.clientY - dragState.offsetY), maxTop),
    right: null,
  };
}

function stopDrag() {
  dragging.value = false;
  dragState = null;
  window.removeEventListener('pointermove', dragMove);
  window.removeEventListener('pointerup', stopDrag);
}

onBeforeUnmount(() => {
  stopDrag();
});
</script>

<style scoped>
.notes-drawer {
  position: fixed;
  width: min(28rem, 92vw);
  max-height: min(75vh, 46rem);
  display: none;
  flex-direction: column;
  z-index: 60;
  overflow: hidden;
  border: 1px solid var(--deck-line-strong);
  border-radius: 18px;
  background: color-mix(in srgb, var(--deck-surface) 92%, black);
  box-shadow: var(--deck-shadow);
}

.notes-drawer.open {
  display: flex;
}

.notes-drawer.dragging {
  user-select: none;
}

.bar {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: start;
  padding: 0.9rem 1rem;
  border-bottom: 1px solid var(--deck-line);
  cursor: grab;
}

.notes-drawer.dragging .bar {
  cursor: grabbing;
}

.label {
  color: var(--deck-faint);
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-size: 0.76rem;
  font-weight: 700;
}

.title {
  margin-top: 0.35rem;
  color: var(--deck-accent);
  font-family: var(--deck-font-display);
  font-size: 1.8rem;
}

.close {
  border: 0;
  background: transparent;
  color: var(--deck-muted);
  font-size: 1.5rem;
  cursor: pointer;
}

.actions {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.popout {
  border: 1px solid var(--deck-line-strong);
  background: transparent;
  color: var(--deck-muted);
  border-radius: 7px;
  cursor: pointer;
  padding: 0.3rem 0.55rem;
  font-size: 0.75rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.content {
  overflow: auto;
  padding: 1rem 1.1rem 1.2rem;
  line-height: 1.65;
  color: var(--deck-muted);
}

.markdown :deep(p) {
  margin: 0 0 0.8rem;
}
</style>
