import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { useEffect, useState } from "react";

const ReleaseYearRange = () => {
  const { maxReleaseYear, minReleaseYear } = {
    maxReleaseYear: 2023,
    minReleaseYear: 1900,
  };
  const [value, setValue] = useState({
    from: minReleaseYear,
    to: maxReleaseYear,
  });
  useEffect(() => {
  }, [value]);
  return (
    <div>
      <h2 className="text-xl text-orange-900">Release Year:</h2>
      <div className="flex flex-row gap-2 items-center mx-10">
        <span>{value.from}</span>
        <RangeSlider
          defaultValue={[minReleaseYear, maxReleaseYear]}
          onInput={(range) => setValue({ from: range[0], to: range[1] })}
          min={minReleaseYear}
          max={maxReleaseYear}
        />
        <span>{value.to}</span>
      </div>
    </div>
  );
};
export default ReleaseYearRange;
