import type { QuestionnaireOuput } from "./Questionnaire";
import sorry from "../assets/sorry.png"
import { useEffect } from "react";

interface ResultsProps {
  results: QuestionnaireOuput | null;
  onStart: () => void;
}

export default function Results({ results, onStart }: ResultsProps) {
    useEffect(() => {
      console.log(results);
    }, [results]);
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold" >Results Coming Soon!</h1>

      <p>This app is currently under development so please check back later.</p>
      <img 
      src={sorry} 
      alt="apologetic person"
      className="w-32 h-32" 
      />



      <button  onClick={onStart}
        className="
          mt-6
          px-6
          py-3
          rounded-lg
          bg-blue-500
          text-white
          dark:bg-blue-700
        ">
        Start Over
      </button>

    </main>
  );
}