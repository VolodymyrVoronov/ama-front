import {
  Card,
  CardHeader,
  Chip,
  CardBody,
  CardFooter,
} from "@nextui-org/react";

import { TQuestion } from "../../types";

import { convertToRelativeTime } from "../../helpers/convertToRelativeTime";
import { memo } from "react";

interface IQuestionCardDetailedCardProps {
  questionData: TQuestion;
}

const QuestionCardDetailed = memo(
  ({ questionData }: IQuestionCardDetailedCardProps): JSX.Element => {
    const { question, author_email, answer, created_at, updated_at } =
      questionData;

    const isQuestionAnswered = answer !== "";

    return (
      <Card className="grid content-start w-full h-auto shadow-lg">
        <CardHeader className="flex flex-col gap-3 items-start">
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

        <CardBody className="flex bg-gradient-to-tr from-cyan-100 to-blue-100">
          <p className="text-lg lg:text-xl font-bold">{question}</p>
        </CardBody>

        <CardFooter>
          <span className="flex flex-row flex-wrap gap-3 text-md lg:text-lg font-semibold">
            Answered:
            {isQuestionAnswered ? (
              <span className="flex flex-row gap-3">
                <Chip
                  className="text-md font-bold text-green-950"
                  color="success"
                  variant="flat"
                  size="sm"
                >
                  Yes
                </Chip>
                <Chip
                  className="text-md font-bold text-black"
                  color="default"
                  variant="flat"
                  size="sm"
                >
                  {convertToRelativeTime(updated_at)}
                </Chip>
              </span>
            ) : (
              <Chip
                className="text-md font-bold text-red-700"
                color="danger"
                variant="flat"
                size="sm"
              >
                No
              </Chip>
            )}
          </span>
        </CardFooter>

        {isQuestionAnswered && (
          <CardFooter className="bg-gradient-to-tr from-cyan-100 to-blue-100">
            <p className="text-lg lg:text-xl font-bold">{answer}</p>
          </CardFooter>
        )}
      </Card>
    );
  }
);

QuestionCardDetailed.displayName = "QuestionCardDetailed";

export default QuestionCardDetailed;
