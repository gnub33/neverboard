// types/status.ts
export type Status<T> = FormStatus | DoneStatus<T>;

export type FormStatus = {
  type: "form";
  move: "next" | "back" | false;
  submitting: boolean;
};

export type DoneStatus<T> = {
  type: "done";
  output: T;
};