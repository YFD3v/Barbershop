import { addMinutes, format, setHours, setMinutes } from "date-fns";

export function generateDayTimeList(date: Date): string[] {
  const actualHour = new Date().getHours() + 1;
  const startTime = setMinutes(setHours(date, +actualHour), 0);
  const endTime = setMinutes(setHours(date, 21), 0);
  const interval = 45;
  const timeList: string[] = [];

  let currentTime = startTime;

  while (currentTime < endTime) {
    timeList.push(format(currentTime, "HH:mm"));
    currentTime = addMinutes(currentTime, interval);
  }

  return timeList;
}
