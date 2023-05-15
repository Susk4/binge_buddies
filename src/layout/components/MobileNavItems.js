import { NAV_ITEMS } from "../../config/constants";
import Link from "next/link";
import { IoLogOutOutline } from "react-icons/io5";

const MobileNavItems = ({ logout, setIsVisible }) => {
  const items = NAV_ITEMS;

  return (
    <div className="">
      {items.map((item) => (
        <Link href={item.url} key={item.label}>
          <div
            className="p-2 cursor-pointer text-center"
            onClick={() => setIsVisible(false)}
          >
            {item.label}
          </div>
        </Link>
      ))}
      <div className="p-2  flex justify-center">
        <button onClick={logout} className="flex gap-2 items-center">
          Logout <IoLogOutOutline size={24} />
        </button>
      </div>
    </div>
  );
};
export default MobileNavItems;
