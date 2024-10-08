const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

export function getDurationString(timestamp: number) {
  const current = Date.now();
  const duration = current - timestamp;
  if (duration <= MINUTE) {
    return "1 minute";
  } else if (duration < HOUR) {
    const m = Math.round(duration / MINUTE);
    return `${m} minutes`;
  } else if (duration < DAY) {
    const h = Math.round(duration / HOUR);
    return h === 1 ? `${h} hour` : `${h} hours`;
  } else {
    const d = Math.round(duration / DAY);
    return d === 1 ? `${d} day` : `${d} days`;
  }
}
