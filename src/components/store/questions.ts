import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { IQuestionRequest, IQuestionResponse } from "../../types";

interface IQuestionsStore {
  questions: IQuestionResponse[];
}

interface IQuestionsStoreActions {
  setQuestions: (questions: IQuestionResponse[]) => void;
  sendQuestion: (questionData: IQuestionRequest) => void;
}

export const useQuestionsStore = create(
  immer<IQuestionsStore & IQuestionsStoreActions>((set, get) => ({
    questions: [],

    setQuestions: (questions) => {
      set({ questions: questions });
    },

    sendQuestion: (questionData) => {},
  }))
);
