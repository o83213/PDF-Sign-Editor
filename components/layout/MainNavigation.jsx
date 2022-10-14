import React from "react";
import classes from "./MainNavigation.module.css";
import { useRouter } from "next/router";
const MainNavigation = (props) => {
  const router = useRouter();
  const currentPath = router.asPath;
  const backToHomeHandler = () => {
    router.replace("/");
  };
  return (
    <header className={classes.header}>
      <nav>
        {currentPath !== "/" && (
          <button className={classes.btn} onClick={backToHomeHandler}>
            Back to Top
          </button>
        )}
      </nav>
    </header>
  );
};
export default MainNavigation;
