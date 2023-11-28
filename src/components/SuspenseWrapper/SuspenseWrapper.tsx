import { Progress } from "@nextui-org/react";
import { motion } from "framer-motion";
import { Suspense } from "react";

const SuspenseWrapper = (child: JSX.Element): JSX.Element => (
  <Suspense
    fallback={
      <motion.div
        className="flex flex-col items-center"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          transition: {
            duration: 0.5,
            delay: 1.5,
          },
        }}
      >
        <Progress size="sm" isIndeterminate aria-label="Loading..." />
        <span className="mt-5">Loading...</span>
      </motion.div>
    }
  >
    {child}
  </Suspense>
);

export default SuspenseWrapper;
