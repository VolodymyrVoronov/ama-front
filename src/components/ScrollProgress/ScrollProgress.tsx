import { motion, useScroll, useSpring } from "framer-motion";

const ScrollProgress = (): JSX.Element => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed w-full top-0 h-1 bg-blue-500 z-40"
      style={{ scaleX, transformOrigin: "0%" }}
    />
  );
};

export default ScrollProgress;
