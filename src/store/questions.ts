import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { IQuestionRequest, IQuestionResponse, IWordsCloud } from "../types";

import { extractWords } from "../helpers/extractWords";
import { sortAlphabetically } from "../helpers/sortAlphabetically";

interface IQuestionsStore {
  questions: IQuestionResponse[];
  questionsFilteredByKeyWord: IQuestionResponse[];
  wordsCloud: IWordsCloud[];
}

interface IQuestionsStoreActions {
  setQuestions: (questions: IQuestionResponse[]) => void;
  filterQuestionsByKeyWord: (keyWord: string) => void;
  sendQuestion: (questionData: IQuestionRequest) => void;
  setWordsCloud: () => void;
}

export const useQuestionsStore = create(
  immer<IQuestionsStore & IQuestionsStoreActions>((set, get) => ({
    questions: [],
    questionsFilteredByKeyWord: [],

    wordsCloud: [],

    setQuestions: (questions) => {
      set({ questions: questions });
    },

    filterQuestionsByKeyWord: (keyWord) => {
      const { questions } = get();

      if (!keyWord) {
        set({ questionsFilteredByKeyWord: questions });
      } else {
        set({
          questionsFilteredByKeyWord: questions.filter((question) =>
            question.question.toLowerCase().includes(keyWord.toLowerCase())
          ),
        });
      }
    },

    sendQuestion: (questionData) => {},

    setWordsCloud: () => {
      const words = sortAlphabetically(extractWords(get().questions));

      set({ wordsCloud: words });
    },
  }))
);
