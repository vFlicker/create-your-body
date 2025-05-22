export const slideVariants = {
  enter: (direction) => ({
    x: direction === 'forward' ? 1000 : -1000,
    scale: 0.8,
    rotate: direction === 'forward' ? -5 : 5,
  }),
  center: {
    x: 0,
    scale: 1,
    rotate: 0,
  },
  exit: (direction) => ({
    x: direction === 'forward' ? -1000 : 1000,
    scale: 0.8,
    rotate: direction === 'forward' ? 5 : -5,
  }),
};

export const transition = {
  duration: 0.5,
  ease: [0.43, 0.13, 0.23, 0.96],
  scale: {
    duration: 0.5,
    ease: 'easeOut',
  },
  rotate: {
    duration: 0.5,
    ease: 'easeInOut',
  },
};

export const titleVariants = {
  enter: (direction) => ({
    x: direction === 'forward' ? 100 : -100,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction === 'forward' ? -100 : 100,
    opacity: 0,
  }),
};

export const titleTransition = {
  duration: 0.5,
  ease: [0.43, 0.13, 0.23, 0.96],
};
