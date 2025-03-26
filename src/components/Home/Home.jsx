import React from "react";
import { useLocation } from "react-router-dom";
import styles from "./Home.module.css"; // Import CSS module

const Home = () => {
  const location = useLocation();
  const username = location.state?.username || "User";

  return (
    <div className={styles.container}>
      <div className={styles.welcomeBox}>
        <h1 className={styles.welcomeText}>Welcome, {username}!</h1>
        <p className={styles.subText}>Glad to have you here. 🎉</p>
      </div>
    </div>
  );
};

export default Home;
