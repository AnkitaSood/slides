<template>
  <component
    :is="isPresenter ? PresenterView : 'div'"
    v-bind="isPresenter ? presenterProps : {}"
    class="app-shell"
  >
    <template v-if="!isPresenter">
      <div id="deck" class="deck" @click="handleDeckClick">
        <SlideView
          v-for="slide in slides"
          :key="slide.id"
          :slide="slide"
          :active="slide.order === currentIndex"
        />
      </div>
      <DeckChrome :current="currentIndex" :total="slides.length" />
      <NotesDrawer
        :open="notesOpen"
        :title="currentSlide.title"
        :html="currentSlide.notesHtml"
        @close="notesOpen = false"
        @popout="openNotesPopout"
      />
    </template>
  </component>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import DeckChrome from './components/DeckChrome.vue';
import NotesDrawer from './components/NotesDrawer.vue';
import PresenterView from './components/PresenterView.vue';
import SlideView from './components/SlideView.vue';
import { loadDeck } from './lib/deckContent';
import { createPresenterSync } from './lib/presenterSync';

const deck = loadDeck();
const slides = deck.slides;
const currentIndex = ref(0);
const notesOpen = ref(false);
const isPresenter = new URLSearchParams(window.location.search).get('presenter') === '1';

const currentSlide = computed(() => slides[currentIndex.value] ?? slides[0]);
const nextSlide = computed(() => slides[currentIndex.value + 1] ?? null);
const presenterProps = computed(() => ({
  currentSlide: currentSlide.value,
  nextSlide: nextSlide.value,
}));

injectTheme(deck.themeCss);
document.title = deck.meta.title;

const sync = createPresenterSync((state) => {
  if (typeof state?.index === 'number') {
    currentIndex.value = clamp(state.index);
  }
});

if (sync.read()?.index != null) {
  currentIndex.value = clamp(sync.read().index);
}

let notesPopout = null;

function clamp(index) {
  return Math.max(0, Math.min(slides.length - 1, index));
}

function publishState() {
  sync.publish({ index: currentIndex.value, updatedAt: Date.now() });
}

function go(index) {
  currentIndex.value = clamp(index);
  publishState();
}

function next() {
  go(currentIndex.value + 1);
}

function prev() {
  go(currentIndex.value - 1);
}

function openPresenter() {
  const url = new URL(window.location.href);
  url.searchParams.set('presenter', '1');
  window.open(url.toString(), 'deckPresenter', 'width=1440,height=900');
}

function openNotesPopout() {
  if (notesPopout && !notesPopout.closed) {
    notesPopout.focus();
    syncNotesPopout();
    return;
  }

  notesPopout = window.open('', 'deckNotes', 'width=480,height=720');
  if (!notesPopout) return;

  notesPopout.document.open();
  notesPopout.document.write(renderNotesDocument());
  notesPopout.document.close();
  syncNotesPopout();
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen?.();
  } else {
    document.exitFullscreen?.();
  }
}

function handleKeydown(event) {
  if (event.key === 'ArrowRight' || event.key === ' ' || event.key === 'PageDown') {
    event.preventDefault();
    next();
  } else if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
    event.preventDefault();
    prev();
  } else if (event.key === 'Home') {
    go(0);
  } else if (event.key === 'End') {
    go(slides.length - 1);
  } else if (event.key.toLowerCase() === 'f' && !isPresenter) {
    toggleFullscreen();
  } else if (event.key.toLowerCase() === 'n' && !isPresenter) {
    notesOpen.value = !notesOpen.value;
  } else if (event.key.toLowerCase() === deck.meta.presenterShortcut.toLowerCase() && !isPresenter) {
    openPresenter();
  }
}

function handleDeckClick(event) {
  if (notesOpen.value) {
    const drawer = document.querySelector('.notes-drawer');
    if (drawer?.contains(event.target)) return;
  }
  if (event.clientX / window.innerWidth > 0.5) next();
  else prev();
}

function injectTheme(css) {
  let style = document.querySelector('style[data-deck-theme="true"]');
  if (!style) {
    style = document.createElement('style');
    style.setAttribute('data-deck-theme', 'true');
    document.head.appendChild(style);
  }
  style.textContent = css;
}

function renderNotesDocument() {
  return `<!doctype html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Speaker Notes</title>
      <style>
        body {
          margin: 0;
          min-height: 100vh;
          background: #17191b;
          color: #f4ecda;
          font-family: "Hanken Grotesk", system-ui, sans-serif;
          padding: 1.25rem 1.35rem 1.6rem;
          line-height: 1.65;
        }
        .eyebrow {
          color: rgba(244, 236, 218, 0.48);
          text-transform: uppercase;
          letter-spacing: 0.16em;
          font-size: 0.76rem;
          font-weight: 700;
        }
        .title {
          margin-top: 0.55rem;
          color: #35d39a;
          font-family: "Caveat", cursive;
          font-size: clamp(2rem, 4vw, 2.8rem);
          line-height: 1;
        }
        .content {
          margin-top: 1rem;
          color: rgba(244, 236, 218, 0.78);
          font-size: 1.05rem;
        }
        .content p {
          margin: 0 0 0.9rem;
        }
      </style>
    </head>
    <body>
      <div class="eyebrow">Speaker Notes</div>
      <div id="notes-title" class="title"></div>
      <div id="notes-body" class="content"></div>
    </body>
  </html>`;
}

function syncNotesPopout() {
  if (!notesPopout || notesPopout.closed) return;
  const title = notesPopout.document.getElementById('notes-title');
  const body = notesPopout.document.getElementById('notes-body');
  if (title) title.textContent = currentSlide.value.title;
  if (body) body.innerHTML = currentSlide.value.notesHtml;
  notesPopout.document.title = currentSlide.value.title
    ? `Notes - ${currentSlide.value.title}`
    : 'Speaker Notes';
}

watch(currentSlide, () => {
  syncNotesPopout();
});

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
  publishState();
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown);
  if (notesPopout && !notesPopout.closed) notesPopout.close();
  sync.destroy();
});
</script>

<style scoped>
.app-shell,
.deck {
  min-height: 100vh;
}

.deck {
  position: relative;
}
</style>
