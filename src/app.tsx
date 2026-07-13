import { useState } from "react";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import Questionnaire from "./pages/Questionnaire";
import Results from "./pages/Results";
import type { QuestionnaireOuput } from "./pages/Questionnaire";

function App() {
  const [page, setPage] = useState("landing");
  const [results, setResults] = useState<QuestionnaireOuput | null>(null);

  return (
    <>
      <Navbar />

      {page === "landing" && (
        <LandingPage onStart={() => setPage("questionnaire")} />
      )}

      {page === "questionnaire" && (
        <Questionnaire
          onComplete={(output) => {
            setResults(output);
            setPage("results");
          }}
        />
      )}

      {page === "results" && (
        <Results
        results={results}
          onStart={() => setPage("landing")}
        />
      )}

    </>
  );
}

export default App;