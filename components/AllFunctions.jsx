import React from "react";
import Link from "next/link";
import classes from "./AllFunctions.module.css";
const AllFunctions = () => {
  return (
    <ul className={`${classes["container"]}`}>
      <li className={`${classes["item"]} ${classes["btn"]}`}>
        <Link href="/create-task/prepare-doc">
          <a>Create new task</a>
        </Link>
      </li>
      <li className={`${classes["item"]} ${classes["btn"]}`}>
        <Link href="/loadtasks">
          <a>View all tasks</a>
        </Link>
      </li>
    </ul>
  );
};

export default AllFunctions;
