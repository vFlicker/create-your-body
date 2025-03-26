import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Outlet } from 'react-router-dom';
import './PageTransition.css';

export default function PageTransition() {
  const location = useLocation();
  const [previousLocation, setPreviousLocation] = useState(location);

  useEffect(() => {
    if (location.pathname !== previousLocation.pathname) {
      setPreviousLocation(location);
    }
  }, [location]);

  const direction = location.key > previousLocation.key ? 1 : -1;

  return (
    <div className="page-transition-container">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          initial={{ x: direction * 100 + "%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -direction * 100 + "%", opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{ position: 'absolute', width: '100%' }}
        >
          <Outlet /> {/* Используем Outlet вместо children */}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}