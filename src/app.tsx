// app.tsx
import { useCallback, useState } from "react";

import {
  Formity,
  type s,
  type Flow,
  type OnReturn,
  type ReturnOutput,
} from "@formity/react";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import type { Status, FormStatus } from "./types/status";

import { Form } from "./components/form";
import { Done } from "./components/done";

type Schema = {
  render: React.ReactNode;
  struct: [
    s.Form<{  playerCount: number }>,
    s.Form<{ allAges: string }>,

    s.Condition<{
      then: [
        s.Form<{ educational: string }>,

        s.Condition<{
          then: [
            s.Form<{ ages: string }>,
            s.Form<{ focus: string }>,
          ];
          else: []
        }>,
      ];

      else: [];
    }>,

    s.Form<{ experience: string[] }>,
    s.Form<{ luck: string }>,
    s.Form<{ themes: string[] }>,

    s.Return<
      | {
          playerCount: number;
          allAges: true;
          educational: string;
          ages?: string;
          focus?: string;
          experience: string[];
          luck: string;
          themes: string[];
        }
      | {
          playerCount: number;
          allAges: false;
          experience: string[];
          luck: string;
          themes: string[];
        }
    >
  ];
  inputs: Record<never, never>;
  params: {
    status: FormStatus;
    setStatus: (status: FormStatus) => void;
  };
};

const flow: Flow<Schema> = [
  {
    form: { // number of players
      fields: () => ({
        playerCount: [4, []],
      }),
      render: ({ fields, params, back, next }) => (
        <Form
          id="yourself"
          defaultValues={fields}
          resolver={zodResolver(
            z.object({
              playerCount: z.number().min(2, "Min. 2").max(10, "Max. 10"),
            }),
          )}
          heading="Tell us about your group"
          content={[
            {
              type: "number",
              name: "playerCount",
              label: "Number of Players",
              placeholder: "Player Count",
            },
          ]}
          buttons={{
            back: null,
            next: "Next",
          }}
          back={back}
          next={next}
          status={params.status}
          setStatus={params.setStatus}
        />
      ),
    },
  },
  {
    form: { // any children?
      fields: () => ({
        allAges: ["", []],
      }),
      render: ({ fields, params, back, next }) => (
        <Form
          id="allAges"
          defaultValues={fields}
          resolver={zodResolver(
            z.object({
              allAges: z.string().nonempty("Required"),
            }),
          )}
          heading="Do you have any children in you group?"
          content={[
            {
              type: "select",
              name: "allAges",
              label: "All-Ages Games",
              placeholder: "Select an option",
              options: [
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ],
            },
          ]}
          buttons={{
            back: "Back",
            next: "Next",
          }}
          back={back}
          next={next}
          status={params.status}
          setStatus={params.setStatus}
        />
      ),
    },
  },
  {
    condition: { 
      if: ({ allAges }) => allAges === "yes",
      then: [ // yes kids
        {
          form: {
            fields: () => ({
              educational: ["", []],
            }),
            render: ({ fields, params, back, next }) => (
              <Form
                id="educational"
                defaultValues={fields}
                resolver={zodResolver(
                  z.object({
                    educational: z.string().nonempty("Required"),
                  }),
                )}
                heading="Are you intersted in educational games that strengthen cognitive development?"
                content={[
                  {
                    type: "select",
                    name: "educational",
                    label: "educational",
                    placeholder: "Select an option",
                    options: [
                      { value: "yes", label: "Yes" },
                      { value: "no", label: "No" },
                    ],
                  },
                ]}
                buttons={{
                  back: "Back",
                  next: "Next",
                }}
                back={back}
                next={next}
                status={params.status}
                setStatus={params.setStatus}
              />
            ),
          },
        },
        {
          condition: {
            if: ({ educational }) => educational === "yes",
            then: [
              //educational branch
              {
                form: {
                  fields: () => ({
                    ages: ["", []],
                  }),
                  render: ({ fields, params, back, next }) => (
                    <Form
                      id="ages"
                      defaultValues={fields}
                      resolver={zodResolver(
                        z.object({
                          ages: z.string().nonempty("Required"),
                        }),
                      )}
                      heading="What is the range of ages in you group?"
                      content={[
                        {
                          type: "select",
                          name: "ages",
                          label: "ages",
                          placeholder: "Select an option",
                          options: [
                            { value: "schoolage", label: "School-Age (5 to 8)" },
                            { value: "preteen", label: "Pre-Teens (9 to 12" },
                            { value: "teen", label: "Teenagers (13 to 16)" },
                          ],
                        },
                      ]}
                      buttons={{
                        back: "Back",
                        next: "Next",
                      }}
                      back={back}
                      next={next}
                      status={params.status}
                      setStatus={params.setStatus}
                    />
                  ),
                },
              },
              {
                form: {
                  fields: () => ({
                    focus: ["", []],
                  }),
                  render: ({ fields, params, back, next }) => (
                    <Form
                      id="focus"
                      defaultValues={fields}
                      resolver={zodResolver(
                        z.object({
                          focus: z.string().nonempty("Required"),
                        }),
                      )}
                      heading="Which area of development would you like to focus on?"
                      content={[
                        {
                          type: "select",
                          name: "focus",
                          label: "focus",
                          placeholder: "Select an option",
                          options: [
                            { value: "math", label: "Mathematics" },
                            { value: "pattern", label: "Pattern Recognition" },
                            { value: "problem", label: "Problem Solving" },
                            { value: "social", label: "Social Engagement" },
                            { value: "economics", label: "Economics (Resource Management)" },
                          ],
                        },
                      ]}
                      buttons={{
                        back: "Back",
                        next: "Next",
                      }}
                      back={back}
                      next={next}
                      status={params.status}
                      setStatus={params.setStatus}
                    />
                  ),
                },
              },
            ],
            else: []
          },
        },
      ],
      else: [],
    },
  },

  // UNCONDITIONAL
  {
    form: { 
      fields: () => ({
        experience: [[], []],
      }),
      render: ({ fields, params, back, next }) => (
        <Form
          id="experience"
          defaultValues={fields}
          resolver={zodResolver(
            z.object({
              experience: z.
              array(z.string())
              .min(1, "Select at least one option")
              .max(3, "Select no more than three"),
            }),
          )}
          heading="What type of experience are you looking for?"
          content={[
            {
              type: "multi-select",
              name: "experience",
              label: "Select 1-3",
              //placeholder: "Select an option",
              options: [
                { value: "competitive", label: "Competitive" },
                { value: "party", label: "Fun / Party" },
                { value: "relaxing", label: "Relaxing" },
                { value: "cooperative", label: "Cooperative" },
                { value: "strategic", label: "Highly Strategic" },
                { value: "bluff", label: "Bluffing & Deception" },
                { value: "puzzle", label: "Puzzle Solving" },
                { value: "team", label: "Team-Based" },
                { value: "chaotic", label: "Chaotic" },
              ],
            },
          ]}
          buttons={{
            back: "Back",
            next: "Next",
          }}
          back={back}
          next={next}
          status={params.status}
          setStatus={params.setStatus}
        />
      ),
    },
  },
  {
    form: {
      fields: () => ({
        luck: ["", []],
      }),
      render: ({ fields, params, back, next }) => (
        <Form
          id="luck"
          defaultValues={fields}
          resolver={zodResolver(
            z.object({
              luck: z.string().nonempty("Required"),
            }),
          )}
          heading="How much of a role should luck play?"
          content={[
            {
              type: "select",
              name: "luck",
              label: "luck",
              placeholder: "Select an option",
              options: [
                { value: "little", label: "A little (We want skill to matter most)" },
                { value: "some", label: "Some (A bit of luck could even out skill gaps)" },
                { value: "most", label: "A Lot! (We don't mind games of chance)" },
              ],
            },
          ]}
          buttons={{
            back: "Back",
            next: "Next",
          }}
          back={back}
          next={next}
          status={params.status}
          setStatus={params.setStatus}
        />
      ),
    },
  },
  {
    form: {
      fields: () => ({
        themes: [[], []],
      }),
      render: ({ fields, params, back, next }) => (
        <Form
          id="themes"
          defaultValues={fields}
          resolver={zodResolver(
            z.object({
              themes: z.array(z.string()).min(1, "Select at least one theme")
            }),
          )}
          heading="Which themes interest you most?"
          content={[
            {
              type: "multi-select",
              name: "themes",
              label: "themes",
              options: [
                { value: "sea", label: "Nautical" },
                { value: "mystery", label: "Mystery" },
                { value: "animals", label: "Problem Solving" },
                { value: "magic", label: "Magic & Dragons" },
                { value: "modern", label: "Real-World Setting" },
              ],
            },
          ]}
          buttons={{
            back: "Back",
            next: "Submit",
          }}
          back={back}
          next={next}
          status={params.status}
          setStatus={params.setStatus}
          />
        ),
      },
    },
  {
    return: ({
      playerCount,
      allAges,
      educational,
      ages,
      focus,
      experience,
      luck,
      themes,
    }) => {
      if (allAges === "yes") {
        return {
          playerCount,
          allAges: true,
          educational,
          ages,
          focus,
          experience,
          luck,
          themes,
        };
      }

      return {
        playerCount,
        allAges: false,
        experience,
        luck,
        themes,
      };
    }
  },
];

export default function App() {
  const [status, setStatus] = useState<Status<ReturnOutput<Schema>>>({
    type: "form",
    move: false,
    submitting: false,
  });

  const onReturn = useCallback<OnReturn<Schema>>(async (output) => {
    setStatus({ type: "form", move: false, submitting: true });

    // Show output in the console
    console.log(output);

    // Simulate a network request
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setStatus({ type: "done", output });
  }, []);

  if (status.type === "done") {
    return (
      <Done
        output={status.output}
        onStartOver={() =>
          setStatus({ type: "form", move: false, submitting: false })
        }
      />
    );
  }

  return (
    <Formity<Schema>
      flow={flow}
      params={{ status, setStatus }}
      onReturn={onReturn}
    />
  );
}