import React, { useMemo } from "react";
import { FixedSizeList } from "react-window";

const CustomOptionsList = ({ options, maxHeight, getValue, children }) => {
  const [value] = getValue();
  const height = 45;
  //   const initialOffset = useMemo(() => {
  //     return options.findIndex((option) => option === value) * height;
  //   }, [options, value]);

  const Row = ({ index, style }) => <div style={style}>{children[index]}</div>;

  return (
    <FixedSizeList
      height={maxHeight}
      itemCount={children.length}
      itemSize={height}
      //initialScrollOffset={initialOffset}
    >
      {Row}
    </FixedSizeList>
  );
};

export default CustomOptionsList;
