import dayjs from "dayjs";

export const getWeekDates = () => {
  const today = new Date();

  // Convert to Seoul time
  const offset = 9 * 60; // Seoul is UTC+9
  const seoulTime = new Date(today.getTime() + offset * 60 * 1000);

  // Calculate the day of the week in Seoul time (0: Sunday, 1: Monday, ..., 6: Saturday)
  const dayOfWeek = seoulTime.getUTCDay();

  // Calculate the difference to get the Monday of the current week
  const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const startOfWeek = new Date(seoulTime);
  startOfWeek.setUTCDate(seoulTime.getUTCDate() + diffToMonday);

  // Create an array of dates from Monday to Sunday in Seoul time
  const weekDates = [];
  for (let i = 0; i < 7; i++) {
    const weekDate = new Date(startOfWeek);
    weekDate.setUTCDate(startOfWeek.getUTCDate() + i);

    // Convert to Seoul date string (YYYY-MM-DD)
    const year = weekDate.getUTCFullYear();
    const month = String(weekDate.getUTCMonth() + 1).padStart(2, "0");
    const day = String(weekDate.getUTCDate()).padStart(2, "0");

    weekDates.push(`${year}-${month}-${day}`);
  }

  return weekDates;
};

export const convertDayToText = (idx: number) => {
  switch (idx) {
    case 0:
      return "월";
    case 1:
      return "화";
    case 2:
      return "수";
    case 3:
      return "목";
    case 4:
      return "금";
    case 5:
      return "토";
    case 6:
      return "일";
  }
};

export const formatTimeDifference = (timestamp: number | string) => {
  const now = new Date();
  const time = new Date(timestamp);
  const diffMs = now.getTime() - time.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffDay > 0) {
    const year = time.getFullYear();
    const month = (time.getMonth() + 1).toString().padStart(2, "0");
    const day = time.getDate().toString().padStart(2, "0");
    const hours = time.getHours();
    const minutes = time.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "오후" : "오전";
    const formattedHour = (hours % 12 || 12).toString().padStart(2, "0");

    return `${year}. ${month}. ${day} ${ampm} ${formattedHour}시 ${minutes}분`;
  } else if (diffHour > 0) {
    return `${diffHour}시간 전`;
  } else if (diffMin > 0) {
    return `${diffMin}분 전`;
  } else {
    return "방금 전";
  }
};

export const DATE_FORMAT_YMDHMS = "YYYY-MM-DDTHH:mm:ss";

export const now = (format?: string) => {
  if (!format) {
    format = DATE_FORMAT_YMDHMS;
  }
  return dayjs().format(format);
};
