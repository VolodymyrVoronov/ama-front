import { motion } from "framer-motion";

const Questions = (): JSX.Element => {
  return (
    <motion.div
      className="max-w-screen-xl m-auto mt-5 px-3 md:px-6"
      initial={{
        opacity: 0,
        scale: 0.5,
      }}
      exit={{
        opacity: 0,
        scale: 0.5,
        transition: {
          duration: 0.5,
        },
      }}
      animate={{
        opacity: 1,
        scale: 1,
        transition: {
          duration: 0.5,
          type: "spring",
          stiffness: 200,
          damping: 10,
          restDelta: 0.001,
        },
      }}
    >
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat velit
      aspernatur in tempore maxime blanditiis. Dolore, quam autem ab dolorem
      doloribus, ipsum alias eius amet dicta nemo voluptate, tempora neque.
    </motion.div>
  );
};

export default Questions;
