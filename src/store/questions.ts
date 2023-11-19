import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { IQuestionRequest, IQuestionResponse } from "../types";

interface IQuestionsStore {
  questions: IQuestionResponse[];
  questionsFilteredByKeyWord: IQuestionResponse[];
}

interface IQuestionsStoreActions {
  setQuestions: (questions: IQuestionResponse[]) => void;
  filterQuestionsByKeyWord: (keyWord: string) => void;
  sendQuestion: (questionData: IQuestionRequest) => void;
}

export const useQuestionsStore = create(
  immer<IQuestionsStore & IQuestionsStoreActions>((set, get) => ({
    questions: [],
    questionsFilteredByKeyWord: [],

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
  }))
);
