import { NAV_ITEMS } from "../../config/constants";
import Link from "next/link";
import { IoLogOutOutline } from "react-icons/io5";

const MobileNavItems = ({ logout, setIsVisible }) => {
  const items = NAV_ITEMS;
  const size = 30;

  return (
    <div className="">
      {items.map((item) => (
        <Link href={item.url} key={item.label}>
          <div
            className="p-2 hover:bg-red-600 hover:text-white cursor-pointer"
            onClick={() => setIsVisible(false)}
          >
            {item.label}
          </div>
        </Link>
      ))}
      <div className="p-2 hover:bg-red-600 hover:text-white ">
        <button onClick={logout} className="flex gap-2  items-center">
          Logout <IoLogOutOutline size={size} />
        </button>
      </div>
    </div>
  );
};
export default MobileNavItems;
