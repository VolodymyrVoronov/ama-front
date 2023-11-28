import { motion } from "framer-motion";
import { Button, Divider } from "@nextui-org/react";

import { useQuestionsStore } from "../../store/questions";

import QuestionForm from "../../components/QuestionForm/QuestionForm";
import QuestionCards from "../../components/QuestionCards/QuestionCards";
import WordsCloud from "../../components/WordsCloud/WordsCloud";
import NoQuestions from "../../components/NoQuestions/NoQuestions";

const sectionTitle = (title: string): JSX.Element => {
  return (
    <span className="flex justify-center text-2xl font-semibold tracking-widest text-default-100">
      {title}
    </span>
  );
};

const Home = (): JSX.Element => {
  const onScrollToTopButtonClick = (): void => {
    window.scroll({ top: 0, behavior: "smooth", left: 0 });
  };

  const { questions } = useQuestionsStore();

  return (
    <motion.div
      className="max-w-screen-xl m-auto mt-5 mb-5 px-3 md:px-6"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        transition: {
          duration: 0.5,
        },
      }}
    >
      <QuestionForm />

      {questions.length === 0 ? (
        <NoQuestions />
      ) : (
        <>
          <div className="max-w-screen-xl container grid grid-cols-12 gap-5 mt-5">
            <div className="tile col-span-12 md:col-span-8 order-2 md:order-1 p-2 sm:p-4 bg-gradient-to-tr from-cyan-500 to-blue-500 shadow-lg rounded-xl">
              {sectionTitle("Latest Questions")}

              <Divider className="my-3 bg-default-100 h-0.5 md:h-1 rounded" />

              <QuestionCards />
            </div>

            <div className="tile col-span-12 md:col-span-4 p-2 order-1 md:order-2 sm:p-4 self-start bg-gradient-to-tr from-cyan-500 to-blue-500 shadow-lg rounded-xl md:sticky md:top-24">
              {sectionTitle("Words Cloud")}

              <Divider className="my-3 bg-default-100 h-0.5 md:h-1 rounded" />

              <WordsCloud />
            </div>
          </div>

          <Button
            onClick={onScrollToTopButtonClick}
            className="w-full md:hidden mt-5 bg-gradient-to-tr from-cyan-500 to-blue-500"
            color="primary"
            variant="shadow"
            size="lg"
          >
            To top
          </Button>
        </>
      )}
    </motion.div>
  );
};

export default Home;
