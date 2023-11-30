import { ChangeEvent, useRef, useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
  Button,
  Textarea,
  ButtonGroup,
} from "@nextui-org/react";
import { motion, AnimatePresence } from "framer-motion";
import useKeyPress from "ahooks/lib/useKeyPress";
import useScroll from "ahooks/lib/useScroll";

import { useAuthStore } from "./../../store/auth";
import { useQuestionsStore } from "../../store/questions";
import { TQuestion } from "../../types";
import { convertToRelativeTime } from "../../helpers/convertToRelativeTime";

import BackToTopButton from "../BackToTopButton/BackToTopButton";

interface IQuestionCardAdminProps {
  questionData: TQuestion;
}

const QuestionCardAdmin = ({
  questionData,
}: IQuestionCardAdminProps): JSX.Element => {
  const { id, question, author_email, answer, created_at, updated_at } =
    questionData;

  const { jwtToken } = useAuthStore();
  const {
    answeringQuestion,
    errorAnsweringQuestion,
    editingQuestion,
    errorEditingQuestion,
    deletingQuestion,
    errorDeletingQuestion,
    answerQuestion,
    editQuestion,
    deleteQuestion,
  } = useQuestionsStore();

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const scroll = useScroll();

  const [answerData, setAnswerData] = useState(answer || "");
  const [editMode, setEditMode] = useState(false);

  const isQuestionAnswered = answer !== "";

  const focusOnTextArea = (): void => {
    const timeoutId = setTimeout(() => {
      textAreaRef.current?.focus();
      clearTimeout(timeoutId);
    }, 100);
  };

  const onAnswerQuestionButtonClick = (): void => {
    setEditMode(true);
    focusOnTextArea();
  };

  const onEditQuestionButtonClick = (): void => {
    setEditMode(true);
    focusOnTextArea();
  };

  const onSubmitButtonClick = (): void => {
    const newQuestionData = {
      ...questionData,
      answer: answerData,
    };

    if (answerData.length === 0) {
      void editQuestion(id, newQuestionData, jwtToken);

      if (!editingQuestion) {
        setEditMode(false);
      }
    } else {
      void answerQuestion(id, newQuestionData, jwtToken);

      if (!answeringQuestion) {
        setEditMode(false);
      }
    }
  };

  const onCloseButtonClick = (): void => {
    setEditMode(false);
    setAnswerData(answer || "");
  };

  const onDeleteButtonClick = (): void => {
    void deleteQuestion(id, jwtToken);
  };

  const onTextAreaChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;

    setAnswerData(value);
  };

  useKeyPress(27, (): void => {
    setEditMode(false);
    setAnswerData(answer || "");
  });

  const footerButtons = (): JSX.Element => (
    <ButtonGroup className="w-full">
      <Button
        onClick={onCloseButtonClick}
        isLoading={answeringQuestion || editingQuestion}
        className="w-full"
        variant="shadow"
        color="danger"
      >
        Close
      </Button>
      <Button
        onClick={onSubmitButtonClick}
        isLoading={answeringQuestion || editingQuestion}
        className="w-full"
        variant="shadow"
        color="primary"
        isDisabled={!answerData}
      >
        Submit
      </Button>
    </ButtonGroup>
  );

  const textArea = (): JSX.Element => (
    <Textarea
      ref={textAreaRef}
      className="w-full"
      placeholder="Enter your answer here..."
      size="md"
      isMultiline
      isRequired
      name="answer"
      variant="flat"
      color="primary"
      value={answerData}
      onChange={onTextAreaChange}
      isDisabled={answeringQuestion || editingQuestion}
      classNames={{
        input: "text-lg md:text-xl font-semibold",
      }}
    />
  );

  const showBackToTopButton = scroll && scroll.top > 300;

  return (
    <>
      {showBackToTopButton && <BackToTopButton />}

      <Card className="grid content-start min-w-[200px] max-w-full shadow-lg">
        <CardHeader className="flex flex-col gap-3 items-start">
          {errorAnsweringQuestion ||
          errorEditingQuestion ||
          errorDeletingQuestion ? (
            <p className="text-lg lg:text-xl font-bold text-left break-all">
              <Chip as={"span"} color="danger">
                {errorAnsweringQuestion ||
                  errorEditingQuestion ||
                  errorDeletingQuestion}
              </Chip>
            </p>
          ) : null}
          <p className="text-lg lg:text-xl font-bold text-left break-all">
            {author_email}
          </p>
          <div className="flex flex-row gap-3">
            <span className="text-md lg:text-lg font-semibold">Asked:</span>
            <Chip
              className="text-md font-bold"
              color="default"
              variant="flat"
              size="md"
            >
              {convertToRelativeTime(created_at)}
            </Chip>
          </div>
        </CardHeader>

        <Divider />

        <CardBody>
          <p className="text-lg lg:text-xl font-bold">{question}</p>
        </CardBody>

        <Divider />

        <CardFooter>
          <span className="flex flex-row flex-wrap gap-3 items-center text-md lg:text-lg font-semibold">
            Answered:
            {isQuestionAnswered ? (
              <span className="flex flex-row gap-3 items-center">
                <Chip
                  className="text-md font-bold text-black"
                  color="default"
                  variant="flat"
                  size="lg"
                >
                  {convertToRelativeTime(updated_at)}
                </Chip>
                <Button
                  onClick={onEditQuestionButtonClick}
                  className="text-md font-bold rounded-full"
                  variant={editMode ? "solid" : "ghost"}
                  color="primary"
                  size="sm"
                >
                  Edit answer
                </Button>
              </span>
            ) : (
              <span className="flex flex-row gap-3 items-center">
                <Chip
                  className="text-md font-bold text-black"
                  color="default"
                  variant="flat"
                  size="lg"
                >
                  No
                </Chip>
                <Button
                  onClick={onAnswerQuestionButtonClick}
                  className="text-md font-bold rounded-full"
                  variant={editMode ? "solid" : "ghost"}
                  color="secondary"
                  size="sm"
                >
                  Answer question
                </Button>
              </span>
            )}
            <Button
              onClick={onDeleteButtonClick}
              isLoading={deletingQuestion}
              color="danger"
              variant="shadow"
              className="text-md font-bold rounded-full"
              size="sm"
            >
              Delete
            </Button>
          </span>
        </CardFooter>

        <AnimatePresence mode="wait">
          {!isQuestionAnswered && editMode && (
            <motion.span
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
              <Divider />
              <CardFooter className="grid gap-5">
                {textArea()}

                {footerButtons()}
              </CardFooter>
            </motion.span>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {isQuestionAnswered && editMode ? (
            <motion.span
              key={isQuestionAnswered ? "answer" : "edit"}
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
              <Divider />
              <CardFooter className="grid gap-5">
                {textArea()}

                {footerButtons()}
              </CardFooter>
            </motion.span>
          ) : (
            <>
              {isQuestionAnswered && (
                <motion.span
                  key={isQuestionAnswered ? "answer" : "edit"}
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
                  <Divider />

                  <CardFooter>
                    <p className="text-lg lg:text-xl font-bold">{answer}</p>
                  </CardFooter>
                </motion.span>
              )}
            </>
          )}
        </AnimatePresence>
      </Card>
    </>
  );
};

export default QuestionCardAdmin;
