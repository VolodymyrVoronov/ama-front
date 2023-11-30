import { isAxiosError } from "axios";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { TQuestionNew, TQuestion, IAxiosError } from "../types";

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

  answeringQuestion: boolean;
  errorAnsweringQuestion: string;

  editingQuestion: boolean;
  errorEditingQuestion: string;

  deletingQuestion: boolean;
  errorDeletingQuestion: string;
}

interface IQuestionsStoreActions {
  setQuestions: () => Promise<void>;
  setWordsCloud: () => void;
  setKeyWord: (keyWord: string) => void;
  filterQuestionsByKeyWord: (keyWord: string) => void;
  filterQuestionsByAuthorEmail: (authorEmail: string) => void;
  sendQuestion: (questionData: TQuestionNew) => Promise<void>;
  refetchQuestions: () => Promise<void>;
  answerQuestion: (
    questionId: number,
    answerData: TQuestion,
    jwt: string
  ) => Promise<void>;
  editQuestion: (
    questionId: number,
    questionData: TQuestion,
    jwt: string
  ) => Promise<void>;
  deleteQuestion: (questionId: number, jwt: string) => Promise<void>;
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

    answeringQuestion: false,
    errorAnsweringQuestion: "",

    editingQuestion: false,
    errorEditingQuestion: "",

    deletingQuestion: false,
    errorDeletingQuestion: "",

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
        if (isAxiosError<IAxiosError>(error)) {
          set({
            errorSendingQuestion: error.response?.data.message,
          });
          set({ sendingQuestion: false });
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
          await get().refetchQuestions();

          set({ sendingQuestion: false });
        }
      } catch (error) {
        if (isAxiosError<IAxiosError>(error)) {
          set({
            errorSendingQuestion: error.response?.data.message,
          });
          set({ sendingQuestion: false });
        } else if (error instanceof Error) {
          set({ errorSendingQuestion: error.message });
          set({ sendingQuestion: false });
        } else {
          set({ errorSendingQuestion: "Unknown error" });
          set({ sendingQuestion: false });
        }
      } finally {
        set({ sendingQuestion: false });
      }
    },

    refetchQuestions: async (): Promise<void> => {
      await get().setQuestions();
    },

    answerQuestion: async (
      questionId: number,
      answerData: TQuestion,
      jwt: string
    ): Promise<void> => {
      set({ answeringQuestion: true });

      try {
        const res = await questionsService.updateQuestion(
          questionId,
          answerData,
          jwt
        );

        if (res.status === 202) {
          await get().refetchQuestions();
          set({ answeringQuestion: false });
        }
      } catch (error) {
        if (isAxiosError<IAxiosError>(error)) {
          set({
            errorAnsweringQuestion: error.response?.data.message,
          });
          set({ answeringQuestion: false });
        } else if (error instanceof Error) {
          set({ errorAnsweringQuestion: error.message });
          set({ answeringQuestion: false });
        } else {
          set({ errorAnsweringQuestion: "Unknown error" });
          set({ answeringQuestion: false });
        }
      }
    },

    editQuestion: async (
      questionId: number,
      answerData: TQuestion,
      jwt: string
    ): Promise<void> => {
      set({ editingQuestion: true });

      try {
        const res = await questionsService.updateQuestion(
          questionId,
          answerData,
          jwt
        );

        if (res.status === 202) {
          set({ editingQuestion: false });

          await get().refetchQuestions();
        }
      } catch (error) {
        if (isAxiosError<IAxiosError>(error)) {
          set({
            errorEditingQuestion: error.response?.data.message,
          });
          set({ editingQuestion: false });
        } else if (error instanceof Error) {
          set({ errorEditingQuestion: error.message });
          set({ editingQuestion: false });
        } else {
          set({ errorEditingQuestion: "Unknown error" });
          set({ editingQuestion: false });
        }
      } finally {
        set({ editingQuestion: false });
      }
    },

    deleteQuestion: async (questionId: number, jwt: string): Promise<void> => {
      set({ deletingQuestion: true });

      try {
        const res = await questionsService.deleteQuestion(questionId, jwt);

        if (res.status === 202) {
          set({ deletingQuestion: false });

          await get().refetchQuestions();
        }
      } catch (error) {
        if (isAxiosError<IAxiosError>(error)) {
          set({
            errorDeletingQuestion: error.response?.data.message,
          });
          set({ deletingQuestion: false });
        } else if (error instanceof Error) {
          set({ errorDeletingQuestion: error.message });
          set({ deletingQuestion: false });
        } else {
          set({ errorDeletingQuestion: "Unknown error" });
          set({ deletingQuestion: false });
        }
      } finally {
        set({ deletingQuestion: false });
      }
    },
  }))
);
