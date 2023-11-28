import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Button, Tooltip, Textarea, Input } from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";
import useKeyPress from "ahooks/lib/useKeyPress";
import cn from "classnames";

import { TQuestionForm } from "../../types";

const initialState = {
  question: "",
  authorEmail: "",
};

const QuestionForm = (): JSX.Element => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const [showCover, setShowCover] = useState(false);
  const [questionData, setQuestionData] = useState<TQuestionForm>(initialState);
  const [changeZIndex, setChangeZIndex] = useState(false);

  const onAreaFocus = (): void => {
    setShowCover(true);
    window.scrollTo(0, 0);
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    setQuestionData({
      ...questionData,
      [name]: value,
    });
  };

  const onClearClick = (): void => {
    setQuestionData(initialState);
  };

  const onSubmitClick = (): void => {
    console.log(questionData);

    setQuestionData(initialState);
  };

  const onCloseClick = (): void => {
    setShowCover(false);
    setQuestionData(initialState);
  };

  useEffect(() => {
    if (questionData.question !== "") {
      setShowCover(true);
      window.scrollTo(0, 0);
    }
  }, [questionData.question]);

  useEffect(() => {
    if (showCover) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showCover]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (textAreaRef.current) {
        if (textAreaRef.current.getBoundingClientRect().top < 100) {
          setChangeZIndex(true);
        } else {
          setChangeZIndex(false);
        }
      }
    });

    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  useKeyPress(13, () => {
    if (!fieldsEmpty) {
      onSubmitClick();
    }
  });

  useKeyPress(27, onCloseClick);

  const fieldsEmpty =
    questionData?.question === "" || questionData?.authorEmail === "";

  return (
    <>
      <AnimatePresence>
        {showCover && (
          <motion.div
            onClick={onCloseClick}
            className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-blue-500"
            style={{ zIndex: 40 }}
            initial={{
              opacity: 0,
            }}
            exit={{
              opacity: 0,
              transition: {
                duration: 0.5,
                delay: 0.5,
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

      <div className="w-full p-2 sm:p-4 md:p-8 flex flex-col justify-center items-center bg-gradient-to-tr from-cyan-500 to-blue-500 shadow-lg rounded-xl">
        <Textarea
          ref={textAreaRef}
          className={cn(
            "w-full md:w-10/12 lg:w-8/12 xl:w-6/12 shadow-lg z-40",
            {
              "z-30": changeZIndex,
            }
          )}
          placeholder="Enter your question here..."
          size="lg"
          isMultiline
          isRequired
          onClick={onAreaFocus}
          onFocus={onAreaFocus}
          name="question"
          value={questionData.question}
          onChange={onInputChange}
          classNames={{
            input: "text-xl md:text-2xl font-semibold",
          }}
        />

        <AnimatePresence mode="wait">
          {showCover && (
            <>
              <motion.div
                className="w-full md:w-10/12 lg:w-8/12 xl:w-6/12 mt-3 md:mt-5 z-40 shadow-lg"
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
                    delay: 0.5,
                    type: "spring",
                    stiffness: 200,
                  },
                }}
              >
                <Input
                  placeholder="Enter your email here..."
                  size="lg"
                  isRequired
                  name="authorEmail"
                  type="email"
                  value={questionData.authorEmail}
                  onChange={onInputChange}
                  classNames={{
                    input: "text-xl md:text-2xl font-semibold",
                  }}
                />
              </motion.div>

              <motion.div
                className="w-full md:w-10/12 lg:w-8/12 xl:w-6/12 flex justify-center gap-3 sm:gap-5 z-50 mt-3 md:mt-5 px-3 py-3 bg-default-100 rounded-xl shadow-lg"
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
                    delay: 1.5,
                    type: "spring",
                    stiffness: 200,
                  },
                }}
              >
                <Tooltip
                  showArrow
                  content="Close the form"
                  color="default"
                  size="lg"
                  classNames={{
                    content: "text-lg font-semibold",
                  }}
                >
                  <Button
                    color="primary"
                    variant="bordered"
                    aria-label="Close"
                    onClick={onCloseClick}
                    className="w-full font-semibold text-lg"
                  >
                    Close
                  </Button>
                </Tooltip>

                <Tooltip
                  showArrow
                  content="Clear the form"
                  color="default"
                  size="lg"
                  classNames={{
                    content: "text-lg font-semibold",
                  }}
                >
                  <Button
                    color="danger"
                    variant="shadow"
                    aria-label="Clear"
                    isDisabled={fieldsEmpty}
                    onClick={onClearClick}
                    className="w-full font-semibold text-lg"
                  >
                    Clear
                  </Button>
                </Tooltip>

                <Tooltip
                  showArrow
                  content="Submit your question"
                  color="default"
                  size="lg"
                  classNames={{
                    content: "text-lg font-semibold",
                  }}
                >
                  <Button
                    color="primary"
                    variant="shadow"
                    aria-label="Submit"
                    isDisabled={fieldsEmpty}
                    onClick={onSubmitClick}
                    className="w-full font-semibold text-lg bg-gradient-to-tr from-cyan-500 to-blue-500"
                  >
                    Submit {!fieldsEmpty && "| Enter"}
                  </Button>
                </Tooltip>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default QuestionForm;
