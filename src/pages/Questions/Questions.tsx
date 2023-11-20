import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Input } from "@nextui-org/react";
import { motion } from "framer-motion";
import useKeyPress from "ahooks/lib/useKeyPress";

import { useQuestionsStore } from "../../store/questions";

const Questions = (): JSX.Element => {
  const { questionsFilteredByAuthorEmail, filterQuestionsByAuthorEmail } =
    useQuestionsStore();

  const inputRef = useRef<HTMLInputElement>(null);

  const [searchQuery, setSearchQuery] = useState("");

  const onInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;

    setSearchQuery(value);
  };

  const clearInput = (): void => {
    setSearchQuery("");
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    filterQuestionsByAuthorEmail(searchQuery);
  }, [searchQuery]);

  useKeyPress(27, clearInput);

  console.log(questionsFilteredByAuthorEmail);

  return (
    <motion.div
      className="max-w-screen-xl m-auto mt-5 px-3 md:px-6"
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
    >
      <div className="w-full p-2 sm:p-4 md:p-8 flex flex-col justify-center items-center bg-gradient-to-tr from-cyan-500 to-blue-500 shadow-lg rounded-xl">
        <Input
          ref={inputRef}
          className="w-full md:w-10/12 lg:w-8/12 xl:w-6/12 shadow-lg z-40"
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

      <div className="tile mt-5 mb-5 p-2 sm:p-4 bg-gradient-to-tr from-cyan-500 to-blue-500 shadow-lg rounded-xl">
        Cards
      </div>
    </motion.div>
  );
};

export default Questions;
