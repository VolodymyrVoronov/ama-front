import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { IQuestionRequest, IQuestionResponse, IWordsCloud } from "../types";

import { extractWords } from "../helpers/extractWords";
import { sortAlphabetically } from "../helpers/sortAlphabetically";

interface IQuestionsStore {
  questions: IQuestionResponse[];
  questionsFilteredByKeyWord: IQuestionResponse[];
  questionsFilteredByAuthorEmail: IQuestionResponse[];
  wordsCloud: IWordsCloud[];
  keyWord: string;
}

interface IQuestionsStoreActions {
  setQuestions: (questions: IQuestionResponse[]) => void;
  setWordsCloud: () => void;
  setKeyWord: (keyWord: string) => void;
  filterQuestionsByKeyWord: (keyWord: string) => void;
  filterQuestionsByAuthorEmail: (authorEmail: string) => void;
  sendQuestion: (questionData: IQuestionRequest) => void;
}

export const useQuestionsStore = create(
  immer<IQuestionsStore & IQuestionsStoreActions>((set, get) => ({
    questions: [],
    questionsFilteredByKeyWord: [],
    questionsFilteredByAuthorEmail: [],
    wordsCloud: [],
    keyWord: "",

    setQuestions: (questions) => {
      set({ questions: questions });
    },

    setKeyWord: (keyWord) => {
      set({ keyWord: keyWord });
    },

    filterQuestionsByKeyWord: (keyWord) => {
      const { questions } = get();

      if (!keyWord) {
        set({ questionsFilteredByKeyWord: questions });
      } else {
        set({
          questionsFilteredByKeyWord: questions.filter((q) => {
            const tempQuestions = q.question.toLowerCase().split(/[ !?]+/);

            for (const element of tempQuestions) {
              if (element === keyWord) {
                return true;
              }
            }
          }),
        });
      }
    },

    filterQuestionsByAuthorEmail: (authorEmail) => {
      const { questions } = get();

      if (!authorEmail) {
        set({ questionsFilteredByAuthorEmail: questions });
      } else {
        set({
          questionsFilteredByAuthorEmail: questions.filter((q) =>
            q.authorEmail.includes(authorEmail)
          ),
        });
      }
    },

    setWordsCloud: () => {
      const words = sortAlphabetically(extractWords(get().questions));

      set({ wordsCloud: words });
    },

    sendQuestion: (questionData) => {},
  }))
);
