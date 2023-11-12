import { ChangeEvent, useState } from "react";
import { Button, Tooltip, Textarea } from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";
import cn from "classnames";

const QuestionForm = (): JSX.Element => {
  const [showCover, setShowCover] = useState(false);
  const [question, setQuestion] = useState("");

  const onAreaFocus = (): void => {
    setShowCover(true);
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setQuestion(e.target.value);
  };

  const onClearClick = (): void => {
    setQuestion("");
  };

  const onSubmitClick = (): void => {
    console.log(question);
    setQuestion("");
  };

  const onCloseClick = (): void => {
    setShowCover(false);
    setQuestion("");
  };

  const isQuestionEmpty = question === "";

  return (
    <>
      <AnimatePresence>
        {showCover && (
          <motion.div
            onClick={onCloseClick}
            className="absolute inset-0 z-40 bg-gradient-to-tr from-cyan-500 to-blue-500"
            initial={{
              opacity: 0,
            }}
            exit={{
              opacity: 0,
              transition: {
                duration: 0.5,
              },
            }}
            animate={{
              opacity: 1,
              transition: {
                duration: 0.5,
              },
            }}
          />
        )}
      </AnimatePresence>

      <div className="w-full p-4 md:p-8 rounded-xl flex flex-col justify-center items-center bg-gradient-to-tr from-cyan-500 to-blue-500 shadow-lg">
        <Textarea
          className={cn("w-full md:w-10/12 lg:w-8/12 xl:w-6/12 shadow-lg", {
            "z-50": showCover,
          })}
          placeholder="Enter your question here..."
          size="lg"
          isMultiline
          isRequired
          onClick={onAreaFocus}
          onFocus={onAreaFocus}
          name="question"
          value={question}
          onChange={onInputChange}
          classNames={{
            input: "text-xl md:text-2xl font-semibold",
          }}
        />

        <AnimatePresence mode="wait">
          {showCover && (
            <motion.div
              className="mt-3 md:mt-5 flex gap-3 sm:gap-5 z-50 px-3 sm:px-5 md:px-10 py-3 md:py-5 bg-default-100 rounded-xl shadow-lg"
              initial={{
                opacity: 0,
                scale: 0.5,
              }}
              exit={{
                opacity: 0,
                scale: 0.5,
                transition: {
                  duration: 0.5,
                },
              }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: {
                  duration: 0.5,
                  type: "spring",
                  stiffness: 200,
                },
              }}
            >
              <Tooltip content="Close the form" color="primary" size="lg">
                <Button
                  radius="full"
                  color="primary"
                  variant="bordered"
                  aria-label="Close"
                  onClick={onCloseClick}
                  className="font-semibold text-lg"
                >
                  Close
                </Button>
              </Tooltip>

              <Tooltip content="Clear the form" color="danger" size="lg">
                <Button
                  radius="full"
                  color="danger"
                  variant="shadow"
                  aria-label="Clear"
                  isDisabled={isQuestionEmpty}
                  onClick={onClearClick}
                  className="font-semibold text-lg"
                >
                  Clear
                </Button>
              </Tooltip>

              <Tooltip content="Submit your question" color="primary" size="lg">
                <Button
                  radius="full"
                  color="primary"
                  variant="shadow"
                  aria-label="Submit"
                  isDisabled={isQuestionEmpty}
                  onClick={onSubmitClick}
                  className="font-semibold text-lg"
                >
                  Submit
                </Button>
              </Tooltip>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default QuestionForm;
