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
import useKeyPress from "ahooks/lib/useKeyPress";

import { IQuestionResponse } from "../../types";
import { convertToRelativeTime } from "../../helpers/convertToRelativeTime";

interface IQuestionCardAdminProps {
  questionData: IQuestionResponse;
}

const QuestionCardAdmin = ({
  questionData,
}: IQuestionCardAdminProps): JSX.Element => {
  const { id, question, authorEmail, answer, created_at, updated_at } =
    questionData;

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

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
    setEditMode(false);

    console.log(answerData);
  };

  const onCloseButtonClick = (): void => {
    setEditMode(false);
    setAnswerData(answer || "");
  };

  const onTextAreaChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setAnswerData(value);
  };

  useKeyPress(27, () => {
    setEditMode(false);
    setAnswerData(answer || "");
  });

  const footerButtons = () => (
    <ButtonGroup className="w-full">
      <Button
        onClick={onCloseButtonClick}
        className="w-full"
        variant="shadow"
        color="danger"
      >
        Close
      </Button>
      <Button
        onClick={onSubmitButtonClick}
        className="w-full"
        variant="shadow"
        color="primary"
        isDisabled={!answerData}
      >
        Submit
      </Button>
    </ButtonGroup>
  );

  return (
    <Card className="grid content-start min-w-[200px] max-w-full shadow-lg">
      <CardHeader className="flex flex-col gap-3 items-start">
        <p className="text-lg lg:text-xl font-bold text-left break-all">
          {authorEmail}
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
            <Button
              onClick={onAnswerQuestionButtonClick}
              className="text-md font-bold rounded-full"
              variant={editMode ? "solid" : "ghost"}
              color="secondary"
              size="sm"
            >
              Answer question
            </Button>
          )}
        </span>
      </CardFooter>

      {!isQuestionAnswered && editMode && (
        <>
          <Divider />
          <CardFooter className="grid gap-5">
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
              classNames={{
                input: "text-lg md:text-xl font-semibold",
              }}
            />

            {footerButtons()}
          </CardFooter>
        </>
      )}

      {isQuestionAnswered && editMode ? (
        <>
          <Divider />
          <CardFooter className="grid gap-5">
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
              classNames={{
                input: "text-lg md:text-xl font-semibold",
              }}
            />

            {footerButtons()}
          </CardFooter>
        </>
      ) : (
        <>
          {isQuestionAnswered && (
            <>
              <Divider />

              <CardFooter>
                <p className="text-lg lg:text-xl font-bold">{answer}</p>
              </CardFooter>
            </>
          )}
        </>
      )}
    </Card>
  );
};

export default QuestionCardAdmin;
