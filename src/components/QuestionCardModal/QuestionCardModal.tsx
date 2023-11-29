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
  Image,
} from "@nextui-org/react";

import { TQuestion } from "../../types";

import { convertToRelativeTime } from "../../helpers/convertToRelativeTime";
import { useEffect } from "react";

interface IQuestionCardModalProps {
  questionData?: TQuestion;
  toggleModal: boolean;
}

const QuestionCardModal = ({
  questionData,
  toggleModal,
}: IQuestionCardModalProps): JSX.Element => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { question, author_email, answer, created_at, updated_at } =
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
            <ModalHeader className="flex flex-col gap-4 items-start">
              <div className="flex flex-row gap-5 items-center">
                <Image
                  className="px-1 py-1 md:px-2 md:py-2"
                  src="./assets/logo.png"
                  shadow="md"
                  alt="Question logo"
                  classNames={{
                    wrapper: "w-16 md:w-20",
                  }}
                />

                <span className="font-semibold text-md md:text-xl lg:text-2xl bg-gradient-to-tr from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                  Ask Me Anything
                </span>
              </div>
            </ModalHeader>

            <Divider />

            <ModalHeader className="flex flex-col gap-4 items-start">
              <span className="text-lg md:text-xl lg:text-2xl font-bold text-left break-all">
                {author_email}
              </span>

              <div className="flex flex-row gap-3">
                <span className="text-md lg:text-lg font-semibold">Asked:</span>
                <Chip
                  className="text-md font-bold"
                  color="default"
                  variant="flat"
                  size="md"
                >
                  {convertToRelativeTime(created_at!)}
                </Chip>
              </div>
            </ModalHeader>

            <Divider />

            <ModalBody className="py-5 bg-gradient-to-tr from-cyan-500 to-blue-500">
              <p className="text-lg lg:text-xl font-bold text-slate-50">
                {question}
              </p>
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
                      {convertToRelativeTime(updated_at!)}
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
                <ModalFooter className="bg-gradient-to-tr from-cyan-500 to-blue-500">
                  <p className="text-lg md:text-xl lg:text-2xl font-bold text-slate-50">
                    {answer}
                  </p>
                </ModalFooter>

                <Divider />
              </>
            )}

            <ModalFooter>
              <Button
                color="danger"
                variant="light"
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
