import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { useAuthStore } from "../../store/auth";
import { useQuestionsStore } from "../../store/questions";
import { IQuestionResponse } from "../../types";
import { extractSortedDates } from "../../helpers/extractSortedDates";
import { Path } from "../../constants";

import QuestionCardsAdmin from "../../components/QuestionCardsAdmin/QuestionCardsAdmin";

const Admin = (): JSX.Element => {
  const { jwtToken, refreshingToken } = useAuthStore();
  const { questions } = useQuestionsStore();

  const navigate = useNavigate();

  const sortedDate = extractSortedDates(questions, "created_at");

  const questionGroupedByDate = sortedDate.reduce(
    (acc: { date: string; questions: IQuestionResponse[] }[], date) => {
      const questionsForDate = questions.filter((q) => q.created_at === date);

      acc.push({ date, questions: questionsForDate });

      return acc;
    },
    []
  );

  useEffect(() => {
    if (!jwtToken && refreshingToken) {
      navigate(Path.HOME);
    }
  }, [jwtToken]);

  return (
    <motion.div
      className="flex flex-col gap-5 max-w-screen-xl m-auto mt-5 mb-5 px-3 md:px-6"
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
