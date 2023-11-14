import { IQuestionResponse } from "../../types";

const mockData: IQuestionResponse[] = [
  {
    id: 1,
    question: "What is the sound of one hand clapping?",
    authorEmail: "zenmaster@example.com",
    answer: "The sound of one hand clapping is silence.",
    created_at: "2022-01-01",
    updated_at: "2022-01-02",
  },
  {
    id: 2,
    question: "Can a computer have consciousness?",
    authorEmail: "philosopher@example.com",
    answer:
      "The question of whether a computer can have consciousness is still debated among philosophers and scientists.",
    created_at: "2022-02-01",
    updated_at: "2022-02-02",
  },
  {
    id: 3,
    question: "What is the meaning of love?",
    authorEmail: "romantic@example.com",
    answer:
      "Love is a complex emotion that can't be easily defined, but it often involves deep affection, care, and connection.",
    created_at: "2022-03-01",
    updated_at: "2022-03-02",
  },
  {
    id: 4,
    question: "Why do birds sing in the morning?",
    authorEmail: "ornithologist@example.com",
    answer:
      "Birds sing in the morning to establish their territory, attract mates, and communicate with other birds.",
    created_at: "2022-04-01",
    updated_at: "2022-04-02",
  },
  {
    id: 5,
    question: "What is the secret to happiness?",
    authorEmail: "happinessguru@example.com",
    answer:
      "The secret to happiness varies for each individual, but it often involves finding meaning, cultivating positive relationships, and practicing gratitude.",
    created_at: "2022-05-01",
    updated_at: "2022-05-02",
  },
  {
    id: 6,
    question: "How do you catch a cloud and pin it down?",
    authorEmail: "dreamer@example.com",
    answer:
      "You can't physically catch a cloud, but you can appreciate its beauty and enjoy the moment.",
    created_at: "2022-06-01",
    updated_at: "2022-06-02",
  },
  {
    id: 7,
    question: "What is the meaning of success?",
    authorEmail: "ambitious@example.com",
    answer:
      "Success is achieving your goals, realizing your potential, and finding fulfillment in your endeavors.",
    created_at: "2022-07-01",
    updated_at: "2022-07-02",
  },
  {
    id: 8,
    question: "Why do we dream?",
    authorEmail: "neuroscientist@example.com",
    answer:
      "The exact purpose of dreaming is still not fully understood, but it is believed to play a role in memory consolidation, emotional processing, and creativity.",
    created_at: "2022-08-01",
    updated_at: "2022-08-02",
  },
  {
    id: 9,
    question: "What is the nature of reality?",
    authorEmail: "philosophyprof@example.com",
    answer:
      "The nature of reality is a fundamental question that has been explored by philosophers, scientists, and thinkers throughout history.",
    created_at: "2022-09-01",
    updated_at: "2022-09-02",
  },
];

const QuestionCards = (): JSX.Element => {
  return <div>QuestionCards</div>;
};

export default QuestionCards;
