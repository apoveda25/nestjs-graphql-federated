const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

export interface IDeltaOptions {
  seconds?: number;
  minutes?: number;
  hours?: number;
  days?: number;
}

export const delta: (a: IDeltaOptions) => number = (time: IDeltaOptions) => {
  if (time?.seconds) return time.seconds * SECOND;

  if (time?.minutes) return time.minutes * MINUTE;

  if (time?.hours) return time.hours * HOUR;

  if (time?.days) return time.days * DAY;

  return 1;
};
