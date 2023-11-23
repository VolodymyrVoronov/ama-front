import { useRef, useEffect, useState } from "react";
import { Divider } from "@nextui-org/react";
import { motion } from "framer-motion";

import { IQuestionResponse } from "../../types";

interface IQuestionCardsAdminProps {
  date: string;
  questions: IQuestionResponse[];
}

const QuestionCardsAdmin = ({
  date,
  questions,
}: IQuestionCardsAdminProps): JSX.Element => {
  const questionContainerRef = useRef<HTMLDivElement>(null);

  const [toggleStyles, setToggleStyles] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (questionContainerRef.current) {
        if (questionContainerRef.current.getBoundingClientRect().top < 100) {
          setToggleStyles(true);
        } else {
          setToggleStyles(false);
        }
      }
    });

    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  return (
    <div
      ref={questionContainerRef}
      key={date}
      className="py-3 md:py-5 bg-white sticky top-20"
    >
      <div className="w-full p-2 sm:p-4 md:p-8 flex flex-col bg-gradient-to-tr from-cyan-500 to-blue-500">
        <motion.span
          className="font-semibold text-left text-white"
          initial={{ fontSize: "2rem" }}
          animate={toggleStyles ? { fontSize: "2rem" } : { fontSize: "1.5rem" }}
          transition={{ duration: 0.5, type: "spring", bounce: 0.5 }}
        >
          {date}
        </motion.span>

        <Divider className="my-2 h-1 bg-white rounded-full" />

        {questions.map((question) => (
          <div key={question.id}>
            <div>{question.question}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionCardsAdmin;
