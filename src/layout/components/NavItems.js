import Link from "next/link";
import { NAV_ITEMS } from "../../config/constants";

export default function NavItems() {
  const items = NAV_ITEMS;
  const mappedItems = items.map((item) => (
    <Link href={item.url}>
      <div
        className="flex hover:bg-orange-500 hover:text-orange-50 rounded-3xl flex-grow  justify-center items-center cursor-pointer "
        key={item.label}
      >
        {item.label}
      </div>
    </Link>
  ));
  return (
    <div className="hidden md:flex justify-center w-1/3 h-full">
      {mappedItems}
    </div>
  );
}
