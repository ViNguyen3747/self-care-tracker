import * as yup from "yup";
import { timeConvert } from "../formatDate";
export const taskSchema = yup.object().shape({
  name: yup.string().required("Please enter the task name"),
  category: yup.mixed().required("Please specify a category"),
  prioritylevel: yup.mixed().required("Please specify the level of priority"),
  date: yup.mixed().required("Please select a date"),
  start: yup.string(),
  finish: yup
    .string()
    .test(
      "compare start and finish time",
      "Finish time has to be after start time",
      function (value) {
        if (timeConvert(this.parent["start"]) >= timeConvert(value))
          return false;
        return true;
      }
    ),

  duration: yup.number().required(),
});
