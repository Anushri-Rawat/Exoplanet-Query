import React, { useState } from "react";
import selectInput from "../utils/selectInput";
import Input from "./Input";
import Button from "./Button";
import { FaSearch } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import planetData from "../utils/planetData.json";
import { toast } from "react-toastify";

const SearchInputs = ({ setResultsArr }) => {
  const initialSearchQuery = {
    hostname: "",
    discoverymethod: "",
    disc_year: "",
    disc_facility: "",
  };
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);

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
    if (Object.values(searchQuery).every((value) => !value)) {
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

      if (matchesSearchQuery && !filteredSet.has(key)) {
        filteredSet.add(key);
        return true;
      } else {
        return false;
      }
    });

    if (filteredData.length == 0) {
      toast.warn("No planet found for this query!");
    }
    setResultsArr(filteredData);
  };

  return (
    <div className="flex gap-3 items-center w-full mb-6 justify-center flex-wrap md:flex-no-wrap">
      {selectInput.map((select) => {
        const optionsArr = categoryOptions(select);
        return (
          <div className="w-[220px]" key={select.name}>
            <Input
              input={select}
              options={optionsArr}
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
  );
};

export default SearchInputs;
