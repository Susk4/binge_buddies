import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { useState } from "react";


const ReleaseYearRange = ({ userFilter, minReleaseYear, maxReleaseYear, setUpdating, setUserFilter }) => {
  const [value, setValue] = useState(userFilter.release_year);

  const handleOnChange = (e) => {
    setValue({ from: e[0], to: e[1] });
  };
  const handleOnThumbDragEnd = (from, to) => {
    setUpdating(true);
    setUserFilter({
      ...userFilter,
      release_year: { from: from, to: to },
    });
  };

  return (
    <div>
      <h2 className="text-xl text-orange-900">Release Year:</h2>
      <div className="flex flex-row gap-2 items-center mx-10">
        <span>{value.from}</span>
        <RangeSlider
          defaultValue={[value.from, value.to]}
          onInput={(e) => handleOnChange(e)}
          onThumbDragEnd={() => handleOnThumbDragEnd(value.from, value.to)}
          min={minReleaseYear}
          max={maxReleaseYear}
          rangeSlideDisabled={true}
        />
        <span>{value.to}</span>
      </div>
    </div>
  );
};
export default ReleaseYearRange;
