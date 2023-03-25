import Link from "next/link";
import { NAV_ITEMS } from "../../config/constants";

export default function NavItems() {
  const items = NAV_ITEMS;
  const mappedItems = items.map((item) => (
    <Link href={item.url} key={item.label} passHref>
      <div className="flex hover:bg-red-500 hover:text-white rounded-xl justify-center items-center cursor-pointer px-3 py-2 ">
        {item.label}
      </div>
    </Link>
  ));
  return (
    <div className="hidden md:flex justify-between h-full">{mappedItems}</div>
  );
}
