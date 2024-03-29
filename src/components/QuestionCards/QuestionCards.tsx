import { memo, useState } from "react";
import { Button } from "@nextui-org/react";
import { motion } from "framer-motion";

import { useQuestionsStore } from "../../store/questions";
import { sortByDate } from "../../helpers/sortByDate";
import { TQuestion } from "../../types";

import QuestionCard from "../QuestionCard/QuestionCard";
import QuestionCardModal from "../QuestionCardModal/QuestionCardModal";

const QuestionCards = memo((): JSX.Element => {
  const { questionsFilteredByKeyWord } = useQuestionsStore();

  const [question, setQuestion] = useState<TQuestion>();
  const [toggleModal, setToggleModal] = useState(false);
  const [questionCount, setQuestionCount] = useState(6);

  const onCardClickHandler = (id: number): void => {
    setToggleModal((prev) => !prev);

    setQuestion(
      questionsFilteredByKeyWord.find((question) => question.id === id)
    );
  };

  const sortedByDateQuestions = sortByDate<TQuestion>(
    questionsFilteredByKeyWord,
    "created_at"
  ).slice(0, questionCount);

  const onLoadMoreButtonClick = (): void => {
    setQuestionCount((prev) => prev + 4);

    const timeoutId = setTimeout(() => {
      window.scrollBy({ top: 350, behavior: "smooth", left: 0 });

      clearTimeout(timeoutId);
    }, 500);
  };

  const limitReached = questionsFilteredByKeyWord.length <= questionCount;

  return (
    <>
      {question && (
        <QuestionCardModal questionData={question} toggleModal={toggleModal} />
      )}

      <div className="max-w-screen-xl container grid grid-cols-1 xl:grid-cols-2 gap-4">
        {sortedByDateQuestions.map((question) => (
          <QuestionCard
            key={question.id}
            questionData={question}
            onCardClickHandler={onCardClickHandler}
          />
        ))}
      </div>

      {!limitReached && (
        <div className="flex justify-center mt-5">
          <Button
            onClick={onLoadMoreButtonClick}
            className="text-lg font-semibold text-white hover:border"
            color="default"
            variant="light"
            size="lg"
            aria-label="Load more questions"
            as={motion.button}
            whileHover={{ scale: 1.05 }}
          >
            Load more...
          </Button>
        </div>
      )}
    </>
  );
});

QuestionCards.displayName = "QuestionCards";

export default QuestionCards;
