import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
  Button,
} from "@nextui-org/react";

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

  const isQuestionAnswered = answer !== "";

  return (
    <Card className="min-w-[200px] max-w-full shadow-lg">
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
        <span className="flex flex-row flex-wrap gap-3 text-md lg:text-lg font-semibold">
          Answered:
          {isQuestionAnswered ? (
            <span className="flex flex-row gap-3 items-center">
              <Button
                className="text-md font-bold rounded-full"
                variant="ghost"
                color="primary"
                size="sm"
              >
                Edit answer
              </Button>
              <Chip
                className="text-md font-bold text-black"
                color="default"
                variant="flat"
                size="lg"
              >
                {convertToRelativeTime(updated_at)}
              </Chip>
            </span>
          ) : (
            <Button
              className="text-md font-bold rounded-full"
              variant="ghost"
              color="secondary"
              size="sm"
            >
              Answer question
            </Button>
          )}
        </span>
      </CardFooter>

      {isQuestionAnswered && (
        <CardFooter>
          <p className="text-lg lg:text-xl font-bold">{answer}</p>
        </CardFooter>
      )}
    </Card>
  );
};

export default QuestionCardAdmin;
