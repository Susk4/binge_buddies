import { NAV_ITEMS } from "../../config/constants";

export default function NavItems() {
  const items = NAV_ITEMS;
  const mappedItems = items.map((item) => (
    <div className="flex hover:bg-orange-500 hover:text-orange-50 rounded-3xl flex-grow  justify-center items-center " key={item}>
      {item}
    </div>
  ));
  return (
    <div className="hidden md:flex justify-center w-1/3 h-full">
      {mappedItems}
    </div>
  );
}
