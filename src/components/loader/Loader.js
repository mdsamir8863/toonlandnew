import React from "react";
import styles from "./loader.module.scss";

export default function Loader() {
  return (
    <>
      <div className={styles.circular_progress}></div>
    </>
  );
} 
