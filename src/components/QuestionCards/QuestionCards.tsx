import { memo, useState } from "react";

import { IQuestionResponse } from "../../types";

import QuestionCard from "../QuestionCard/QuestionCard";
import QuestionCardModal from "../QuestionCardModal/QuestionCardModal";

const mockData: IQuestionResponse[] = [
  {
    id: "1",
    question: "What is the sound of one hand clapping?",
    authorEmail: "zenmaster@example.com",
    answer: "",
    created_at: "2022-01-01",
    updated_at: "2022-01-02",
  },
  {
    id: "2",
    question: "Can a computer have consciousness?",
    authorEmail: "philosopher@example.com",
    answer:
      "The question of whether a computer can have consciousness is still debated among philosophers and scientists.",
    created_at: "2022-02-01",
    updated_at: "2022-02-02",
  },
  {
    id: "3",
    question: "What is the meaning of love?",
    authorEmail: "romantic@example.com",
    answer: "",
    created_at: "2022-03-01",
    updated_at: "2022-03-02",
  },
  {
    id: "4",
    question: "Why do birds sing in the morning?",
    authorEmail: "ornithologist@example.com",
    answer:
      "Birds sing in the morning to establish their territory, attract mates, and communicate with other birds.",
    created_at: "2022-04-01",
    updated_at: "2022-04-02",
  },
  {
    id: "5",
    question: "What is the secret to happiness?",
    authorEmail: "happinessguru@example.com",
    answer: "",
    created_at: "2022-05-01",
    updated_at: "2022-05-02",
  },
  {
    id: "6",
    question: "How do you catch a cloud and pin it down?",
    authorEmail: "dreamer@example.com",
    answer:
      "You can't physically catch a cloud, but you can appreciate its beauty and enjoy the moment.",
    created_at: "2022-06-01",
    updated_at: "2022-06-02",
  },
  {
    id: "7",
    question: "What is the meaning of success?",
    authorEmail: "ambitious@example.com",
    answer:
      "Success is achieving your goals, realizing your potential, and finding fulfillment in your endeavors.",
    created_at: "2022-07-01",
    updated_at: "2022-07-02",
  },
  {
    id: "8",
    question: "Why do we dream?",
    authorEmail: "neuroscientist@example.com",
    answer:
      "The exact purpose of dreaming is still not fully understood, but it is believed to play a role in memory consolidation, emotional processing, and creativity.",
    created_at: "2022-08-01",
    updated_at: "2022-08-02",
  },
  {
    id: "9",
    question: "What is the nature of reality?",
    authorEmail: "philosophyprof@example.com",
    answer:
      "The nature of reality is a fundamental question that has been explored by philosophers, scientists, and thinkers throughout history.",
    created_at: "2023-11-11",
    updated_at: "2023-11-15",
  },
];

const QuestionCards = memo((): JSX.Element => {
  const [question, setQuestion] = useState<IQuestionResponse>();
  const [toggleModal, setToggleModal] = useState(false);

  const onCardClickHandler = (id: string): void => {
    setToggleModal((prev) => !prev);

    setQuestion(mockData.find((question) => question.id === id));
  };

  return (
    <>
      {question && (
        <QuestionCardModal questionData={question} toggleModal={toggleModal} />
      )}

      <div className="max-w-screen-xl container grid grid-cols-1 xl:grid-cols-2 gap-4">
        {mockData.map((question) => (
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
