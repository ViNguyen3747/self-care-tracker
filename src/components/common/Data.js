import Professional from "../images/categories/professional.svg";
import Physical from "../images/categories/physical.svg";
import Mental from "../images/categories/mental.svg";
import Pratical from "../images/categories/pratical.svg";
import Social from "../images/categories/social.svg";
import Spiritual from "../images/categories/spiritual.svg";
import Emotional from "../images/categories/emotional.svg";

export const categoriesOptions = [
  {
    key: "Professional",
    text: "Professional",
    value: "Professional",
    illustration: Professional,
    total: 0,
    color: "#F94144",
  },
  {
    key: "Physical",
    text: "Physical",
    value: "Physical",
    illustration: Physical,
    total: 0,
    color: "#F3722C",
  },
  {
    key: "Pratical",
    text: "Pratical",
    value: "Pratical",
    illustration: Pratical,
    total: 0,
    color: "#F9C74F",
  },
  {
    key: "Social",
    text: "Social",
    value: "Social",
    illustration: Social,
    total: 0,
    color: "#90BE6D",
  },
  {
    key: "Spiritual",
    text: "Spiritual",
    value: "Spiritual",
    illustration: Spiritual,
    total: 0,
    color: "#43AA8B",
  },
  {
    key: "Mental",
    text: "Mental/Intellectual",
    value: "Mental",
    illustration: Mental,
    total: 0,
    color: "#4D908E",
  },
  {
    key: "Emotional",
    text: "Emotional",
    value: "Emotional",
    illustration: Emotional,
    total: 0,
    color: "#577590",
  },
];

export const priorityOptions = [
  {
    key: "A",
    color: "F94144",
    value: "A",
    label: { color: "red", empty: true, circular: true },
    text: "Urgent AND Important",
  },
  {
    key: "B",
    color: "F3722C",
    value: "B",
    label: { color: "orange", empty: true, circular: true },
    text: "Important NOT Urgent",
  },
  {
    key: "C",
    color: "90BE6D",
    label: { color: "olive", empty: true, circular: true },
    value: "C",
    text: "Urgent NOT Important",
  },
  {
    key: "D",
    color: "43AA8B",
    label: { color: "teal", empty: true, circular: true },
    value: "D",
    text: "NOT Urgent OR Important",
  },
];
