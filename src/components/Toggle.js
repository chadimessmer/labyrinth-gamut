import React, { useState } from "react";
import { motion } from "framer-motion";

const Toggle = ({ children, thisTitle, thisSubTitle }) => {
  const [toggle, setToggle] = useState(false);
  const show = () => {
    setToggle(!toggle);
    console.log(toggle);
  };
  return (
    <motion.div layout>
      <motion.h2 layout onClick={show} className="toggle">
        {thisTitle}
      </motion.h2>
      <motion.h3 layout>{thisSubTitle}</motion.h3>

      {toggle ? children : ""}
    </motion.div>
  );
};

export default Toggle;
