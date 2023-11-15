import {
  Modal,
  ModalContent,
  ModalHeader,
  Chip,
  Divider,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

import { IQuestionResponse } from "../../types";

import { convertToRelativeTime } from "../../helpers/convertToRelativeTime";
import { useEffect } from "react";

interface IQuestionCardModalProps {
  questionData?: IQuestionResponse;
  toggleModal: boolean;
}

const QuestionCardModal = ({
  questionData,
  toggleModal,
}: IQuestionCardModalProps): JSX.Element => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { question, authorEmail, answer, created_at, updated_at } =
    questionData ?? {};

  const isQuestionAnswered = answer !== "";

  useEffect(() => {
    onOpen();
  }, [toggleModal]);

  return (
    <Modal
      backdrop="blur"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="xl"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-3 items-start">
              <p className="text-lg md:text-xl lg:text-2xl font-bold text-left break-all">
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
                  {convertToRelativeTime(created_at as string)}
                </Chip>
              </div>
            </ModalHeader>

            <Divider />

            <ModalBody>
              <p className="text-lg lg:text-xl font-bold">{question}</p>
            </ModalBody>

            <Divider />

            <ModalFooter className="flex flex-col gap-3 items-start">
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
                      {convertToRelativeTime(updated_at as string)}
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
            </ModalFooter>

            <Divider />

            {isQuestionAnswered && (
              <>
                <ModalFooter>
                  <p className="text-lg md:text-xl lg:text-2xl font-bold">
                    {answer}
                  </p>
                </ModalFooter>

                <Divider />
              </>
            )}

            <ModalFooter>
              <Button
                color="danger"
                variant="bordered"
                className="font-semibold text-lg"
                onPress={onClose}
              >
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default QuestionCardModal;
