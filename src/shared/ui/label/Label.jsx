import { Link } from 'react-router-dom';

import classes from './Label.module.css';

const colorClass = {
  green: classes.green,
  violet: classes.violet,
};

export function Label({ children, className, color, ...props }) {
  return (
    <div
      className={`${classes.label} ${colorClass[color]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function LabelLink({ children, className, color, ...props }) {
  return (
    <Link
      className={`${classes.label} ${colorClass[color]} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}
