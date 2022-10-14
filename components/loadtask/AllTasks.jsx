import React from "react";
import TaskItem from "./TaskItem";
import classes from "./AllTasks.module.css";
const AllTasks = (props) => {
  const tasksData = props.tasksData;
  return (
    <div>
      <h2 className={classes["header"]}>All Files: </h2>
      <ul className={classes["files-container"]}>
        {tasksData.map((task) => {
          return <TaskItem key={task._id} task={task} />;
        })}
      </ul>
    </div>
  );
};

export default AllTasks;
