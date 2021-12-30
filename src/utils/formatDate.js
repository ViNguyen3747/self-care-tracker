const formatDate = (date) => {
  const d = new Date(date);
  let month = `${d.getMonth() + 1}`;
  let day = `${d.getDate()}`;
  const year = d.getFullYear();

  if (month.length < 2) {
    month = `0${month}`;
  }
  if (day.length < 2) {
    day = `0${day}`;
  }

  return [year, month, day].join("-");
};

export const timeConvert = (time) => {
  let t = time.split(":");
  return +t[0] * 60 * 60 + +t[1] * 60;
};
export default formatDate;
