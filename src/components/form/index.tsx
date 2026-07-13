// components/form/index.tsx
import type { DefaultValues, Resolver } from "react-hook-form";
import type { Back, Next } from "@formity/react";
import type { MotionProps } from "motion/react";

import {
  useMemo,
  useState,
  useEffect,
  useCallback,
  useEffectEvent,
} from "react";

import { useForm, FormProvider } from "react-hook-form";
import { AnimatePresence, motion } from "motion/react";

import type { FormStatus } from "@/types/status";

import { ItemView, type Item } from "./item";
import { Button } from "../button";

interface FormProps<T extends Record<string, unknown>> {
  id: string;
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
  setStatus: (status: FormStatus) => void;
}

export function Form<T extends Record<string, unknown>>({
  id,
  back,
  next,
  status,
  setStatus,
  ...rest
}: FormProps<T>) {
  const [fields, setFields] = useState<T>();

  const move = useEffectEvent((move: FormStatus["move"]) => {
    if(!fields) return;
    
    if (move === "next") return next(fields);
    if (move === "back") return back(fields);
  });

  useEffect(() => move(status.move), [status.move]);

  const handleNext = useCallback<Next<T>>(
    (fields) => {
      setStatus({ type: "form", move: "next", submitting: false });
      setFields(fields);
    },
    [setStatus, setFields],
  );

  const handleBack = useCallback<Back<T>>(
    (fields) => {
      setStatus({ type: "form", move: "back", submitting: false });
      setFields(fields);
    },
    [setStatus, setFields],
  );

  const animate = useMemo(
    () => ({ x: 0, opacity: 1, transition: { delay: 0.25, duration: 0.25 } }),
    [],
  );

  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.div
        key={id}
        inert={Boolean(status.move)}
        animate={animate}
        onAnimationComplete={(definition) => {
          if (definition === animate) {
            setStatus({ type: "form", move: false, submitting: false });
          }
        }}
        {...motionProps(status.move)}
        className="h-full"
      >
        <View
          key={id}
          back={handleBack}
          next={handleNext}
          status={status}
          {...rest}
        />
      </motion.div>
    </AnimatePresence>
  );
}

function motionProps(move: FormStatus["move"]): MotionProps {
  if (move === "next") {
    return {
      initial: { x: 50, opacity: 0 },
      exit: { x: -50, opacity: 0, transition: { delay: 0, duration: 0.25 } },
    };
  }
  if (move === "back") {
    return {
      initial: { x: -50, opacity: 0 },
      exit: { x: 50, opacity: 0, transition: { delay: 0, duration: 0.25 } },
    };
  }
  return {};
}

function View<T extends Record<string, unknown>>({
  defaultValues,
  resolver,
  heading,
  content,
  buttons,
  back,
  next,
  status,
}: Omit<FormProps<T>, "id" | "setStatus">) {
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