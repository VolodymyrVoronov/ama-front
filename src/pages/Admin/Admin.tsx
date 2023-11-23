import { useLayoutEffect } from "react";
import { motion } from "framer-motion";

import { useQuestionsStore } from "../../store/questions";
import { IQuestionResponse } from "../../types";
import { extractSortedDates } from "../../helpers/extractSortedDates";

import QuestionCardsAdmin from "../../components/QuestionCardsAdmin/QuestionCardsAdmin";

const Admin = (): JSX.Element => {
  const { questions } = useQuestionsStore();

  const sortedDate = extractSortedDates(questions, "created_at");

  const questionGroupedByDate = sortedDate.reduce(
    (acc: { date: string; questions: IQuestionResponse[] }[], date) => {
      const questionsForDate = questions.filter((q) => q.created_at === date);

      acc.push({ date, questions: questionsForDate });

      return acc;
    },
    []
  );

  useLayoutEffect(() => {
    const timeoutId = setTimeout(() => {
      window.scrollBy({ top: 1, behavior: "smooth", left: 0 });

      clearTimeout(timeoutId);
    }, 100);
  }, []);

  return (
    <motion.div
      className="flex flex-col max-w-screen-xl m-auto px-3 md:px-6"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        transition: {
          duration: 1,
        },
      }}
    >
      {questionGroupedByDate.map((q) => (
        <QuestionCardsAdmin
          key={q.date}
          date={q.date}
          questions={q.questions}
        />
      ))}
    </motion.div>
  );
};

export default Admin;
