import {
  Card,
  CardHeader,
  Divider,
  CardBody,
  CardFooter,
  Chip,
  Tooltip,
} from "@nextui-org/react";
import Highlighter from "react-highlight-words";

import { TQuestion } from "../../types";
import { useQuestionsStore } from "../../store/questions";

import { convertToRelativeTime } from "../../helpers/convertToRelativeTime";

interface IQuestionCardProps {
  questionData: TQuestion;

  onCardClickHandler: (id: number) => void;
}

const QuestionCard = ({
  questionData,
  onCardClickHandler,
}: IQuestionCardProps): JSX.Element => {
  const { keyWord } = useQuestionsStore();

  const { id, question, author_email, answer, created_at, updated_at } =
    questionData;

  const onCardClick = (): void => {
    onCardClickHandler(id);
  };

  const isQuestionAnswered = answer !== "";

  return (
    <Tooltip
      showArrow
      color="default"
      size="lg"
      classNames={{
        content: "text-lg font-semibold",
      }}
      content="Click to see more details..."
    >
      <Card
        className="min-w-[200px] max-w-full shadow-lg"
        onPress={onCardClick}
        isHoverable
        isPressable
      >
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

        <Divider />

        <CardBody>
          <p className="text-lg lg:text-xl font-bold">
            <Highlighter
              searchWords={[keyWord || ""]}
              autoEscape={true}
              textToHighlight={question}
              highlightClassName="bg-gradient-to-tr from-cyan-500 to-blue-500 bg-clip-text text-transparent"
            />
          </p>
        </CardBody>

        <Divider />

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
      </Card>
    </Tooltip>
  );
};

export default QuestionCard;
