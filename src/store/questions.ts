import { AxiosError } from "axios";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { TQuestionNew, TQuestion } from "../types";

import { questionsService } from "../services/api/questions";
import { extractWords } from "../helpers/extractWords";
import { sortAlphabetically } from "../helpers/sortAlphabetically";

interface IQuestionsStore {
  questions: TQuestion[];
  questionsFilteredByKeyWord: TQuestion[];
  questionsFilteredByAuthorEmail: TQuestion[];
  wordsCloud: string[];
  keyWord: string;

  loadingQuestions: boolean;
  errorLoadingQuestions: string;

  sendingQuestion: boolean;
  errorSendingQuestion: string;
}

interface IQuestionsStoreActions {
  setQuestions: () => void;
  setWordsCloud: () => void;
  setKeyWord: (keyWord: string) => void;
  filterQuestionsByKeyWord: (keyWord: string) => void;
  filterQuestionsByAuthorEmail: (authorEmail: string) => void;
  sendQuestion: (questionData: TQuestionNew) => void;
  refetchQuestions: () => void;
}

export const useQuestionsStore = create(
  immer<IQuestionsStore & IQuestionsStoreActions>((set, get) => ({
    questions: [],
    questionsFilteredByKeyWord: [],
    questionsFilteredByAuthorEmail: [],
    wordsCloud: [],
    keyWord: "",

    loadingQuestions: false,
    errorLoadingQuestions: "",

    sendingQuestion: false,
    errorSendingQuestion: "",

    setQuestions: async (): Promise<void> => {
      set({ loadingQuestions: true });

      try {
        const res = await questionsService.fetchAllQuestions();

        if (res.status === 200) {
          const questions = res.data;

          set({ questions });
          set({ loadingQuestions: false });

          get().setWordsCloud();
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          set({ errorLoadingQuestions: error.response?.data.message });
          set({ loadingQuestions: false });
        } else if (error instanceof Error) {
          set({ errorLoadingQuestions: error.message });
          set({ loadingQuestions: false });
        } else {
          set({ errorLoadingQuestions: "Unknown error" });
          set({ loadingQuestions: false });
        }
      } finally {
        set({ loadingQuestions: false });
      }
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
            const tempQuestions = q.question
              .toLowerCase()
              .split(/[ !?.,:;\n]+/);

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
            q.author_email.includes(authorEmail)
          ),
        });
      }
    },

    setWordsCloud: () => {
      const words = sortAlphabetically(extractWords(get().questions));

      set({ wordsCloud: words });
    },

    sendQuestion: async (questionData): Promise<void> => {
      set({ sendingQuestion: true });

      try {
        const res = await questionsService.sendQuestion(questionData);

        if (res.status === 202) {
          get().refetchQuestions();
          set({ sendingQuestion: false });
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          set({ errorSendingQuestion: error.response?.data.message });
          set({ sendingQuestion: false });
        } else if (error instanceof Error) {
          set({ errorSendingQuestion: error.message });
          set({ sendingQuestion: false });
        } else {
          set({ errorSendingQuestion: "Unknown error" });
          set({ sendingQuestion: false });
        }
      }
    },

    refetchQuestions: () => {
      get().setQuestions();
    },
  }))
);
