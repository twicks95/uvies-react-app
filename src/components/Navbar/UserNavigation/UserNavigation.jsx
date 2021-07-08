import React from "react";
import { Link } from "react-router-dom";
import styles from "./UserNavigation.module.css";

const UserNavigation = (props) => {
  const { isAdmin } = props;

  const renderUserNavigation = () => {
    if (isAdmin) {
      return (
        <>
          <Link to="/admin/dashboard" className={`${styles.menu}`}>
            Dashboard
          </Link>
          <Link to="/manage/movie" className={`${styles.menu}`}>
            Manage Movie
          </Link>
          <Link to="/manage/schedule" className={`${styles.menu}`}>
            Manage Schedule
          </Link>
        </>
      );
    } else {
      return (
        <>
          <Link to="/" className={`${styles.menu}`}>
            Home
          </Link>
          <Link to="/payment" className={`${styles.menu}`}>
            Payment
          </Link>
          <Link to="/profile" className={`${styles.menu}`}>
            Profile
          </Link>
        </>
      );
    }
  };

  return <>{renderUserNavigation()}</>;
};

export default UserNavigation;
