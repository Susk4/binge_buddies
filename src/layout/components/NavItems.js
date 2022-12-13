import { NAV_ITEMS } from "../../config/constants";

export default function NavItems() {
  const items = NAV_ITEMS;
  const mappedItems = items.map((item) => <div>{item}</div>);
  return (
    <div className="hidden md:flex justify-center gap-10">
      {mappedItems}
    </div>
  );
}
