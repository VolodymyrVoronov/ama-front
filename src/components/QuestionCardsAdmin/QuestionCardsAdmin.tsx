import { useRef } from "react";
import { Divider } from "@nextui-org/react";
import { motion, useInView } from "framer-motion";

import { IQuestionResponse } from "../../types";

import QuestionCardAdmin from "../QuestionCardAdmin/QuestionCardAdmin";

interface IQuestionCardsAdminProps {
  date: string;
  questions: IQuestionResponse[];
}

const QuestionCardsAdmin = ({
  date,
  questions,
}: IQuestionCardsAdminProps): JSX.Element => {
  const questionContainerRef = useRef<HTMLDivElement>(null);
  const isQuestionContainerInView = useInView(questionContainerRef, {
    margin: "0px 0px -100px 0px",
  });

  return (
    <motion.div
      ref={questionContainerRef}
      key={date}
      className={isQuestionContainerInView ? "opacity-100" : "opacity-0"}
      initial={{ opacity: 0 }}
      animate={isQuestionContainerInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="w-full p-2 sm:p-4 md:p-8 flex flex-col bg-gradient-to-tr from-cyan-500 to-blue-500 shadow-lg rounded-xl">
        <motion.span
          className="font-semibold text-left text-white"
          initial={{ fontSize: "2rem" }}
          animate={
            isQuestionContainerInView
              ? { fontSize: "2rem" }
              : { fontSize: "1.5rem" }
          }
          transition={{ duration: 0.5, type: "spring", bounce: 0.5 }}
        >
          {date}
        </motion.span>

        <Divider className="mt-2 mb-4 h-1 bg-white rounded-full" />

        <div className="max-w-screen-xl container grid grid-cols-1 lg:grid-cols-2 gap-4">
          {questions.map((question) => (
            <QuestionCardAdmin key={question.id} questionData={question} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default QuestionCardsAdmin;
