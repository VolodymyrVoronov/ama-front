import { motion } from "framer-motion";

interface INoQuestionsProps {
  text?: string;
}

const NoQuestions = ({
  text = "No questions yet!",
}: INoQuestionsProps): JSX.Element => {
  return (
    <motion.span
      className="flex justify-center mt-5 text-xl font-semibold"
      initial={{
        opacity: 0,
        scale: 0.75,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        transition: {
          duration: 0.5,
        },
      }}
    >
      {text}
    </motion.span>
  );
};

export default NoQuestions;
