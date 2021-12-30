import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import "./Today.scss";
import { categoriesOptions } from "../common/Data";
import Form from "../common/Form";
import CategoryCard from "./CategoryCard";
import { GET_TASKS } from "../../utils/graphQL/query";

const Today = () => {
  const { data } = useQuery(GET_TASKS);

  const [currentId, setCurrentId] = useState(null);

  const getTasks = (category, allTasks) => {
    const tasks = allTasks.filter((task) => {
      return task.category === category.value;
    });
    return (
      <CategoryCard
        key={category.text}
        category={category}
        tasks={tasks}
        setCurrentId={setCurrentId}
      />
    );
  };

  return (
    <div className="container">
      <Form
        setCurrentId={setCurrentId}
        currentId={currentId}
        rerouting="today"
      />

      <div className="tasksContainer">
        {data &&
          categoriesOptions.map((category) => getTasks(category, data.tasks))}
      </div>
    </div>
  );
};

export default Today;
