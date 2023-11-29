import { AxiosResponse } from "axios";

import client from "./axios-client";

import { TQuestion, TQuestionNew } from "../../types";

const fetchAllQuestions = (): Promise<AxiosResponse<TQuestion[]>> =>
  client.get("/questions");

const sendQuestion = (
  data: TQuestionNew
): Promise<AxiosResponse<AxiosResponse>> => client.post("/questions", data);

export const questionsService = {
  fetchAllQuestions,
  sendQuestion,
};
