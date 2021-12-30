import { useQuery } from "@apollo/client";
import { categoriesOptions } from "../../components/common/Data";
import { GET_TASKS } from "../../utils/graphQL/query";

const useDailyReport = () => {
  let dailyData;
  let dailyEmpty = false;
  let day = JSON.parse(JSON.stringify(categoriesOptions));
  const { data } = useQuery(GET_TASKS);
  if (data) {
    const tasks = data.tasks.filter((task) => {
      let date = new Date(task.date);
      return date.getDate() === new Date().getDate();
    });
    console.log(tasks);
    tasks.forEach((t) => {
      const category = day.find((c) => c.value === t.category);
      if (category) category.total += t.duration / 60;
    });
    const filteredCategories = day.filter((c) => c.total > 0);
    dailyData = {
      datasets: [
        {
          data: filteredCategories.map((c) => c.total),
          backgroundColor: filteredCategories.map((c) => c.color),
        },
      ],
      labels: filteredCategories.map((c) => c.text),
    };
    localStorage.setItem("report", JSON.stringify(dailyData));
    if (tasks.length === 0) dailyEmpty = true;
  } else {
    dailyData = JSON.parse(localStorage.getItem("report"));
  }

  return [dailyData, dailyEmpty];
};

export default useDailyReport;
