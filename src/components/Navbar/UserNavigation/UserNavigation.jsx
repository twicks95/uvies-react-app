import React from "react";
import { Link } from "react-router-dom";
import styles from "./UserNavigation.module.css"

const UserNavigation = (props) => {
  return (
    <>
      <Link to="/" className={`${styles.menu}`}>
        Movies
      </Link>
      <Link to="/" className={`${styles.menu}`}>
        Cinemas
      </Link>
      <Link to="/" className={`${styles.menu}`}>
        Buy Ticket
      </Link>
    </>
  );
};

export default UserNavigation;
