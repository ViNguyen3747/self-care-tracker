import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie, Bar } from "react-chartjs-2";
import "./Report.scss";
import useDailyReport from "../../utils/Hooks/useDailyReport";
import useWeeklyReport from "../../utils/Hooks/useWeeklyReport";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const weeklyOptions = {
  plugins: {
    title: {
      display: true,
      text: "Weekly Report",
      color: "#fcf0e3",
      font: {
        size: 30,
        family: "Space Mono, monospace",
        lineHeight: 1,
      },
      padding: 5,
    },
    legend: {
      labels: {
        color: "#fcf0e3",
        font: {
          size: 17,
          family: "Space Mono, monospace",
        },
      },
    },
  },
  responsive: true,
  interaction: {
    mode: "index",
    intersect: false,
  },
  maintainAspectRatio: false,
  scales: {
    x: {
      stacked: true,

      ticks: {
        color: "#fcf0e3",
      },
      grid: {
        color: "#fcf0e3",
      },
    },
    y: {
      stacked: true,
      title: {
        display: true,
        text: "Minutes",
        color: "#fcf0e3",
        font: {
          size: 20,
          family: "monospace",
          lineHeight: 1.2,
          letterSpace: 3,
        },
      },
      ticks: {
        color: "#fcf0e3",
      },
      grid: {
        color: "#fcf0e3",
      },
    },
  },
};

export const dailyOptions = {
  plugins: {
    title: {
      display: true,
      text: "Daily Report",
      color: "#30243b",
      font: {
        size: 30,
        family: "Space Mono, monospace",
      },
    },
    legend: {
      labels: {
        color: "#30243b",
        font: {
          size: 17,
          family: "Space Mono, monospace",
          weight: "bold",
        },
      },
    },
  },
  responsive: true,
  interaction: {
    mode: "index",
    intersect: false,
  },
};
const Report = () => {
  const [dailyData, dailyEmpty] = useDailyReport();
  const [weeklyData] = useWeeklyReport();

  return (
    <div className="container">
      {dailyData && weeklyData && (
        <>
          <div className="pie-chart-container">
            <Pie options={dailyOptions} data={dailyData} />
          </div>
          {dailyEmpty && (
            <div className="pieText">
              You haven't added any task for today yet
            </div>
          )}
          <div className="barchart-wrapper">
            <div className="bar-chart-container">
              <Bar options={weeklyOptions} data={weeklyData} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Report;
