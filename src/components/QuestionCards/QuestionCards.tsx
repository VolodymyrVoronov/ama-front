import { memo, useState } from "react";

import { useQuestionsStore } from "../../store/questions";
import { sortByDate } from "../../helpers/sortByDate";
import { IQuestionResponse } from "../../types";

import QuestionCard from "../QuestionCard/QuestionCard";
import QuestionCardModal from "../QuestionCardModal/QuestionCardModal";

const QuestionCards = memo((): JSX.Element => {
  const { questions } = useQuestionsStore();

  const [question, setQuestion] = useState<IQuestionResponse>();
  const [toggleModal, setToggleModal] = useState(false);

  const onCardClickHandler = (id: string): void => {
    setToggleModal((prev) => !prev);

    setQuestion(questions.find((question) => question.id === id));
  };

  const sortedByDateQuestions = sortByDate<IQuestionResponse>(
    questions,
    "created_at"
  ).slice(0, 10);

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
    </>
  );
});

export default QuestionCards;
