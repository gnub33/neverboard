import { useState } from "react";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import Questionnaire from "./pages/Questionnaire";
import Results from "./pages/Results";

function App() {
  const [page, setPage] = useState("landing");

  return (
    <>
      <Navbar />

      {page === "landing" && (
        <LandingPage onStart={() => setPage("questionnaire")} />
      )}

      {page === "questionnaire" && (
        <Questionnaire />
      )}

      {page === "results" && (
        <Results
          onStart={() => setPage("landing")}
        />
      )}

    </>
  );
}

export default App;