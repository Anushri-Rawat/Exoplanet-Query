import { useState } from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchInputs from "./components/SearchInputs";
import Results from "./components/Results";

function App() {
  const [resultsArr, setResultsArr] = useState([]);

  return (
    <div className="flex flex-col p-[1.5rem] w-full h-screen items-center overflow-hidden">
      <h1 className="text-3xl leading-loose text-center font-bold mb-2 text-white">
        NASA Exoplanet Query
      </h1>
      <div className="rounded-lg bg-white w-full h-full py-[1.5rem] px-[2rem] flex flex-col overflow-auto">
        <SearchInputs setResultsArr={setResultsArr} />
        <Results resultsArr={resultsArr} />
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;
