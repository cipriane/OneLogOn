export default function formatTime(date) {
  if (!(date instanceof Date)) {
    return '';
  }

  return date.toLocaleTimeString(navigator.language, {
    hour: '2-digit',
    minute: '2-digit',
  });
}
