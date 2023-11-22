import { motion } from "framer-motion";

import { useQuestionsStore } from "../../store/questions";
import { extractSortedDates } from "../../helpers/extractSortedDates";
import { IQuestionResponse } from "../../types";

const Admin = (): JSX.Element => {
  const { questions } = useQuestionsStore();

  const sortedDate = extractSortedDates(questions, "created_at");

  const questionByDateArray = sortedDate.reduce(
    (acc: { date: string; questions: IQuestionResponse[] }[], date) => {
      const questionsForDate = questions.filter((q) => q.created_at === date);

      acc.push({ date, questions: questionsForDate });

      return acc;
    },
    []
  );

  console.log(questionByDateArray);

  return (
    <motion.div
      className="max-w-screen-xl m-auto mt-5 px-3 md:px-6"
      initial={{
        opacity: 0,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.5,
        },
      }}
      animate={{
        opacity: 1,
        transition: {
          duration: 0.5,
        },
      }}
    >
      {questionByDateArray.map((q) => (
        <div key={q.date}>{q.date}</div>
      ))}
    </motion.div>
  );
};

export default Admin;
