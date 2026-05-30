export type Status<T> = FormStatus | DoneStatus<T>;

export type FormStatus = {
  type: "form";
  submitting: boolean;
};

export type DoneStatus<T> = {
  type: "done";
  output: T;
};
