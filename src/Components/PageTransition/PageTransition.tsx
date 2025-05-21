// import { Outlet } from 'react-router-dom';
import './PageTransition.css';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const PageTransition = ({ children }) => {
  const location = useLocation();
  const [previousLocation, setPreviousLocation] = useState(location);

  useEffect(() => {
    if (location.pathname !== previousLocation.pathname) {
      setPreviousLocation(location);
    }
  }, [location]);

  // const direction = location.key > previousLocation.key ? 1 : -1;

  return (
    <motion.div
      initial={{ x: 1000, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -1000, opacity: 0 }}
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 20,
        mass: 0.5,
      }}
      className="page-transition"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
