import { useEffect, useState } from "react";

import { useQuestionsStore } from "../../store/questions";

import WordCloud from "../WordCloud/WordCloud";

const WordsCloud = (): JSX.Element => {
  const { wordsCloud, filterQuestionsByKeyWord } = useQuestionsStore();

  const [keyWord, setKeyWord] = useState("");

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
      {wordsCloud.map((word) => (
        <WordCloud
          key={word}
          word={word}
          selected={keyWord === word}
          onWordClickHandler={onWordClickHandler}
        />
      ))}
    </div>
  );
};

export default WordsCloud;
