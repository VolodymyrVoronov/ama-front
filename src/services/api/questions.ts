import { AxiosResponse } from "axios";

import client from "./axios-client";

import { TQuestion, TQuestionNew } from "../../types";

const fetchAllQuestions = (): Promise<AxiosResponse<TQuestion[]>> =>
  client.get("/questions");

const sendQuestion = (
  data: TQuestionNew
): Promise<AxiosResponse<AxiosResponse>> => client.post("/questions", data);

const updateQuestion = (questionId: number, data: TQuestion, jwt: string) =>
  client.patch(`/admin/questions/${questionId}`, data, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

const deleteQuestion = (questionId: number, jwt: string) =>
  client.delete(`/admin/questions/${questionId}`, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

export const questionsService = {
  fetchAllQuestions,
  sendQuestion,
  updateQuestion,
  deleteQuestion,
};
