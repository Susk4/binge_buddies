import { NAV_ITEMS } from "../../config/constants";

export default function NavItems() {
  const items = NAV_ITEMS;
  const mappedItems = items.map((item) => (
    <div className="flex hover:bg-orange-500 flex-grow  justify-center items-center ">
      {item}
    </div>
  ));
  return (
    <div className="hidden md:flex justify-center w-1/3 h-full">
      {mappedItems}
    </div>
  );
}
