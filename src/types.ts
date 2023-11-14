export interface INewQuestion {
  question: string;
  authorEmail: string;
}

export interface IQuestionResponse {
  id: number;
  question: string;
  authorEmail: string;
  answer: string;
  created_at: string;
  updated_at: string;
}
