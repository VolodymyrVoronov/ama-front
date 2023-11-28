export type TQuestion = {
  id: string;
  question: string;
  authorEmail: string;
  answer: string;
  created_at: string;
  updated_at: string;
};

export type TQuestionForm = Omit<
  TQuestion,
  "id" | "answer" | "created_at" | "updated_at"
>;

export type TQuestionNew = Omit<TQuestion, "id" | "created_at" | "updated_at">;

export type TAdminData = {
  email: string;
  password: string;
};
