import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { useEffect, useState } from "react";
import { FilterContext } from "../../src/hook/useFilter";
import { useContext } from "react";

const ReleaseYearRange = () => {
  const {
    userFilter,
    setUserFilter,
    setUpdating,
    minReleaseYear,
    maxReleaseYear,
  } = useContext(FilterContext);

  const [value, setValue] = useState(null);
  useEffect(() => {
    if (userFilter) {
      setValue(userFilter.release_year);
    }
  }, [userFilter]);

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
  if (!value) return <>Loading...</>;
  return (
    <div>
      <h2 className="text-xl">Release Year:</h2>
      <div className={`flex flex-row gap-2 items-center mx-10`}>
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
