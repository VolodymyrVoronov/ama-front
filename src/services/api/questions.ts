import { AxiosResponse } from "axios";

import client from "./axios-client";

import { TQuestion } from "../../types";

const fetchAllQuestions = (): Promise<AxiosResponse<TQuestion[]>> =>
  client.get("/questions");

export const questionsService = {
  fetchAllQuestions,
};
