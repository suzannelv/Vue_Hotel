import dayjs from "dayjs";

export function formatMonthDay(date, formatStr = "DD/MM") {
  return dayjs(date).format(formatStr)
}

export function getDiffDays(startDate, endDate) {
  return dayjs(endDate).diff(startDate, "day")
}