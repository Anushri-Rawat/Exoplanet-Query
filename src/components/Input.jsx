import React, { useEffect, useState } from "react";
import CustomOptionsList from "./CustomOptionsList";
import Select from "react-select";

const customStyles = {
  control: (provided) => ({
    ...provided,
    fontSize: "0.875rem",
    textAlign: "left",
  }),
  option: (provided) => ({
    ...provided,
    fontSize: "0.875rem",
    textAlign: "left",
  }),
};

const Input = ({ input, options, handleChange, searchQuery }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    handleChange({ [input.name]: selectedOption.value });
  };

  useEffect(() => {
    if (searchQuery && !searchQuery[input.name]) {
      setSelectedOption(null);
    }
  }, [searchQuery]);

  return (
    <Select
      options={options}
      components={{ MenuList: CustomOptionsList }}
      placeholder={input.label}
      value={selectedOption}
      onChange={handleSelectChange}
      styles={customStyles}
    />
  );
};

export default Input;
