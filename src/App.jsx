import { useState } from "react";
import planetData from "../src/utlis/planetData.json";
import "./App.css";
import selectInput from "./utlis/selectInput";
import Input from "./components/Input";
import Button from "./components/Button";
import { FaSearch } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import NoResults from "./components/NoResults";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DataTable from "./components/DataTable";

function App() {
  const initialSearchQuery = {
    hostname: "",
    discoverymethod: "",
    disc_year: "",
    disc_facility: "",
  };
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [resultsArr, setResultsArr] = useState([]);

  const categoryOptions = (select) => {
    const uniqueValuesSet = new Set();
    const results = planetData.reduce((acc, pl) => {
      const value = pl[select.name];
      if (!uniqueValuesSet.has(value)) {
        uniqueValuesSet.add(value);
        acc.push({ value: pl[select.name], label: pl[select.name] });
      }
      return acc;
    }, []);
    return results;
  };

  const handleChange = (newVal) => {
    setSearchQuery({ ...searchQuery, ...newVal });
  };

  const clearHandler = () => {
    setSearchQuery(initialSearchQuery);
    setResultsArr([]);
  };
  const searchHandler = () => {
    if (
      !searchQuery.hostname &&
      !searchQuery.disc_facility &&
      !searchQuery.disc_year &&
      !searchQuery.discoverymethod
    ) {
      toast.error("You must select something");
      return;
    }
    const filteredSet = new Set();
    const filteredData = planetData.filter((planet) => {
      const key = `${planet.hostname}_${planet.discoverymethod}_${planet.disc_year}_${planet.disc_facility}`;

      // Check if the current planet matches the search query
      const matchHostname =
        !searchQuery.hostname || planet.hostname === searchQuery.hostname;
      const matchDiscoveryMethod =
        !searchQuery.discoverymethod ||
        planet.discoverymethod === searchQuery.discoverymethod;
      const matchDiscYear =
        !searchQuery.disc_year || planet.disc_year === searchQuery.disc_year;
      const matchDiscFacility =
        !searchQuery.disc_facility ||
        planet.disc_facility === searchQuery.disc_facility;
      const matchesSearchQuery =
        matchHostname &&
        matchDiscoveryMethod &&
        matchDiscYear &&
        matchDiscFacility;

      // Add the planet to the filteredData array only if it matches the search query and is unique
      if (matchesSearchQuery && !filteredSet.has(key)) {
        filteredSet.add(key); // Add the key to the Set
        return true; // Include the object in the filteredData array
      } else {
        return false; // Skip if it doesn't match the search query or if it's not unique
      }
    });
    if (filteredData.length == 0) {
      toast.warn("No planet found for this query!");
    }
    setResultsArr(filteredData);
  };

  return (
    <div className="flex flex-col py-[1.5rem] px-[2rem] w-full h-screen items-center">
      <h1 className="text-3xl leading-loose text-center font-bold mb-4">
        NASA Exoplanet Query
      </h1>
      <div className="flex gap-3 items-center w-full mb-10 justify-center flex-wrap md:flex-no-wrap">
        {selectInput.map((select) => {
          const optionsArr = categoryOptions(select);
          return (
            <div className="w-[220px]">
              <Input
                input={select}
                options={optionsArr}
                key={select.name}
                handleChange={handleChange}
                searchQuery={searchQuery}
              />
            </div>
          );
        })}
        <div className="flex gap-3">
          <Button onClick={searchHandler}>
            <FaSearch />
            Search
          </Button>
          <Button onClick={clearHandler}>
            <MdClose />
            Clear
          </Button>
        </div>
      </div>
      {resultsArr.length == 0 ? <NoResults /> : <DataTable data={resultsArr} />}
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
