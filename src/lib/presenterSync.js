const CHANNEL_NAME = 'deck-presenter-sync';
const STORAGE_KEY = 'deck-presenter-state';

export function createPresenterSync(onMessage) {
  const hasChannel = typeof window !== 'undefined' && 'BroadcastChannel' in window;
  const channel = hasChannel ? new BroadcastChannel(CHANNEL_NAME) : null;

  if (channel) {
    channel.addEventListener('message', (event) => onMessage(event.data));
  }

  const onStorage = (event) => {
    if (event.key !== STORAGE_KEY || !event.newValue) return;
    onMessage(JSON.parse(event.newValue));
  };

  window.addEventListener('storage', onStorage);

  return {
    publish(state) {
      if (channel) channel.postMessage(state);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    },
    read() {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    },
    destroy() {
      channel?.close();
      window.removeEventListener('storage', onStorage);
    },
  };
}
