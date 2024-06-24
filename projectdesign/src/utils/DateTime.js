import dayjs from "dayjs";
export function convertTimestamp(value) {
  // Use Day.js to format the timestamp
  const formattedTime = dayjs(value).format("YYYY-MM-DD HH:mm:ss");
  return formattedTime;
}
