export interface INewQuestion {
  question: string;
  authorEmail: string;
}

export interface IQuestionRequest {
  question: string;
  authorEmail: string;
  answer: string;
}

export interface IQuestionResponse {
  id: string;
  question: string;
  authorEmail: string;
  answer: string;
  created_at: string;
  updated_at: string;
}
