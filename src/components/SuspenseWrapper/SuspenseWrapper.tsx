import { ReactNode, Suspense } from "react";
import { Progress } from "@nextui-org/react";
import { motion } from "framer-motion";

interface ISuspenseWrapperProps {
  children: ReactNode;
}

const SuspenseWrapper = ({ children }: ISuspenseWrapperProps): JSX.Element => (
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
    {children}
  </Suspense>
);

export default SuspenseWrapper;
