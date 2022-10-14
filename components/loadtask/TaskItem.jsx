import React, { useCallback } from "react";
import { useRouter } from "next/router";
import classes from "./TaskItem.module.css";
const TaskItem = (props) => {
  const { task } = props;
  const router = useRouter();
  const goToLinkHandler = useCallback(() => {
    const path = `/loadtasks/${task._id}`;
    router.push(path);
  }, [router, task._id]);
  return (
    <li className={classes.btn} onClick={goToLinkHandler}>
      <h3>fileName: {task.fileName}</h3>
      <br />
      <span>id: {task._id}</span>
    </li>
  );
};
export default TaskItem;
