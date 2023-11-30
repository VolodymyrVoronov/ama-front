import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Input, Progress } from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";
import useKeyPress from "ahooks/lib/useKeyPress";
import useDebounce from "ahooks/lib/useDebounce";
import useScroll from "ahooks/lib/useScroll";

import { useQuestionsStore } from "../../store/questions";

import QuestionCardDetailed from "../../components/QuestionCardDetailed/QuestionCardDetailed";
import ScrollProgress from "../../components/ScrollProgress/ScrollProgress";
import BackToTopButton from "../../components/BackToTopButton/BackToTopButton";
import NoQuestions from "../../components/NoQuestions/NoQuestions";

const Questions = (): JSX.Element => {
  const {
    questions,
    questionsFilteredByAuthorEmail,
    filterQuestionsByAuthorEmail,
  } = useQuestionsStore();

  const inputRef = useRef<HTMLInputElement>(null);
  const scroll = useScroll();

  const [searching, setSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, { wait: 1000 });

  const onInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setSearching(true);

    setSearchQuery(value);
  };

  const clearInput = (): void => {
    setSearchQuery("");
    setSearching(false);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    filterQuestionsByAuthorEmail(debouncedSearchQuery);

    setSearching(false);
  }, [debouncedSearchQuery]);

  useEffect(() => {
    if (searchQuery.length === 0) {
      filterQuestionsByAuthorEmail(searchQuery);
      setSearching(false);
    }
  }, [searchQuery]);

  useKeyPress(27, clearInput);

  const showBackToTopButton = scroll && scroll.top > 300;

  return (
    <>
      {questionsFilteredByAuthorEmail.length > 10 && <ScrollProgress />}

      {questions.length === 0 ? (
        <NoQuestions />
      ) : (
        <>
          <AnimatePresence mode="wait">
            {showBackToTopButton && (
              <motion.span
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                  transition: {
                    duration: 0.5,
                  },
                }}
                exit={{
                  opacity: 0,
                  transition: {
                    duration: 0.5,
                  },
                }}
              >
                <BackToTopButton />
              </motion.span>
            )}
          </AnimatePresence>

          <motion.div
            className="max-w-screen-xl m-auto mt-5 px-3 md:px-6"
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
            <div className="w-full p-2 sm:p-4 md:p-8 flex flex-col justify-center items-center bg-gradient-to-tr from-cyan-500 to-blue-500 shadow-lg rounded-xl">
              <Input
                ref={inputRef}
                className="w-full md:w-10/12 lg:w-8/12 xl:w-6/12 shadow-lg"
                placeholder="Enter your email for search..."
                size="lg"
                isRequired
                name="search"
                type="text"
                value={searchQuery}
                onChange={onInputChange}
                classNames={{
                  input: "text-xl md:text-2xl font-semibold",
                }}
                isClearable
                onClear={clearInput}
              />
            </div>

            {searching && (
              <Progress
                size="md"
                isIndeterminate
                aria-label="Searching questions..."
                className="width-full mt-5"
                classNames={{
                  indicator: "bg-gradient-to-tr from-cyan-500 to-blue-500",
                }}
              />
            )}

            {questionsFilteredByAuthorEmail.length === 0 && !searching && (
              <motion.p
                className="mt-5 text-3xl font-semibold  text-center"
                initial={{
                  opacity: 0,
                  scale: 0.75,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  transition: {
                    duration: 0.5,
                  },
                }}
              >
                No questions found
              </motion.p>
            )}

            {questionsFilteredByAuthorEmail.length !== 0 && (
              <div className="max-w-screen-xl container grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-5 mb-5 p-2 sm:p-4 bg-gradient-to-tr from-cyan-500 to-blue-500 shadow-lg rounded-xl">
                <AnimatePresence>
                  {questionsFilteredByAuthorEmail.map((question) => {
                    return (
                      <motion.span
                        layout
                        key={question.id}
                        className="flex min-w-[200px] max-w-full h-auto"
                        initial={{
                          opacity: 0,
                          scale: 0.75,
                        }}
                        exit={{
                          opacity: 0,
                          scale: 0.75,
                          transition: {
                            duration: 0.5,
                          },
                        }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                          transition: {
                            duration: 0.5,
                          },
                        }}
                      >
                        <QuestionCardDetailed questionData={question} />
                      </motion.span>
                    );
                  })}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        </>
      )}
    </>
  );
};

export default Questions;
