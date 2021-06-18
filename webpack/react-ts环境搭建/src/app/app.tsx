
import React from "react";
import styles from './app.module.less'
import test from "@assets/images/test.png";

const App = ()=>{
  return (
    <div style={{background:`url(${test})`}} className={styles.main}>
      测试
    </div>
  )
}
export default App
