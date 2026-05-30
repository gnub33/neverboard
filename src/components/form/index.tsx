import type { DefaultValues, Resolver } from "react-hook-form";
import type { Back, Next } from "@formity/react";

import { useForm, FormProvider } from "react-hook-form";

import type { FormStatus } from "@/types/status";

import { ItemView, type Item } from "./item";
import { Button } from "../button";

interface FormProps<T extends Record<string, unknown>> {
  defaultValues: DefaultValues<T>;
  resolver: Resolver<T>;
  heading: string;
  content: Item[];
  buttons: {
    back: string | null;
    next: string;
  };
  back: Back<T>;
  next: Next<T>;
  status: FormStatus;
}

export function Form<T extends Record<string, unknown>>({
  defaultValues,
  resolver,
  heading,
  content,
  buttons,
  back,
  next,
  status,
}: FormProps<T>) {
  const form = useForm({ defaultValues, resolver });
  return (
    <form
      onSubmit={form.handleSubmit(next)}
      className="flex h-screen w-full items-center justify-center px-4 py-8"
      autoComplete="off"
    >
      <FormProvider {...form}>
        <div className="w-full max-w-md">
          <h2 className="mb-6 text-center text-4xl font-bold text-gray-950">
            {heading}
          </h2>
          <div className="mb-6 flex flex-col gap-4">
            {content.map((field, index) => (
              <ItemView key={index} {...field} />
            ))}
          </div>
          <div className="flex gap-4">
            {buttons.back && (
              <Button
                type="button"
                variant="secondary"
                disabled={status.submitting}
                onClick={() => back(form.getValues())}
              >
                {buttons.back}
              </Button>
            )}
            <Button
              type="submit"
              variant="primary"
              disabled={status.submitting}
            >
              {status.submitting ? "Submitting..." : buttons.next}
            </Button>
          </div>
        </div>
      </FormProvider>
    </form>
  );
}
