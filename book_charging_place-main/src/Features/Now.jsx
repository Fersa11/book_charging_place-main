const now = new Date();

const weekDayName = now.toDateString().slice(0, 3);
const dayOfMonth = now.getDate();
const month = now.toDateString().slice(4, 8);
const hours = now.getHours();
const minutes = now.getMinutes();
const seconds = now.getSeconds();
const hoursAsString = now.getHours().toString().padStart(2, "0");
const minutesAsString = now.getMinutes().toString().padStart(2, "0");
const secondsAsString = now.getSeconds();

export {
  weekDayName,
  dayOfMonth,
  month,
  hours,
  minutes,
  seconds,
  hoursAsString,
  minutesAsString,
  secondsAsString,
};
