import { useEffect } from "react";
import { motion } from "framer-motion";

import { useQuestionsStore } from "../../store/questions";

import WordCloud from "../WordCloud/WordCloud";

const WordsCloud = (): JSX.Element => {
  const { wordsCloud, keyWord, setKeyWord, filterQuestionsByKeyWord } =
    useQuestionsStore();

  const onWordClickHandler = (word: string): void => {
    setKeyWord(word);

    if (keyWord === word) {
      setKeyWord("");
    }
  };

  useEffect(() => {
    filterQuestionsByKeyWord(keyWord);
  }, [keyWord]);

  return (
    <div className="flex flex-wrap gap-3">
      {wordsCloud.map((word, index) => (
        <motion.span
          key={word}
          className="flex flex-grow"
          initial={{
            opacity: 0,
            scale: 0.75,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: {
              duration: 0.5,
              delay: 0.05 * index,
            },
          }}
        >
          <WordCloud
            word={word}
            selected={keyWord === word}
            onWordClickHandler={onWordClickHandler}
          />
        </motion.span>
      ))}
    </div>
  );
};

export default WordsCloud;
