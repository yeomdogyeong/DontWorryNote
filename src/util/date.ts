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
