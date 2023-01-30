import NavItems from "./NavItems";
import { NAV_ITEMS } from "../../config/constants";
import useClickOutSide from "../../hook/useClickOutSide";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoLogOutOutline } from "react-icons/io5";
import { BiCameraMovie } from "react-icons/bi";
import useAuth from "../../hook/useAuth";
import Link from "next/link";
import UserImageLink from "./UserImageLink";

export default function Navbar() {
  const { user, logout } = useAuth();
  const size = 30;
  const items = NAV_ITEMS;
  const mappedItems = items.map((item) => (
    <div className="p-2 hover:bg-orange-500" key={item}>
      {item}
    </div>
  ));
  const { ref, isVisible, setIsVisible } = useClickOutSide(false);

  return (
    <nav ref={ref}>
      <div className=" text-orange-900 font-bold p-2">
        <div className=" flex h-10 items-center justify-between px-2">
          <div className="flex-none ">
            <Link href="/" legacyBehavior>
              <a>
                <BiCameraMovie className="w-8 h-8 cursor-pointer" />
              </a>
            </Link>
          </div>

          <NavItems />

          <div className="hidden justify-center md:flex flex-none gap-2">
            <div className="flex items-center">
              <UserImageLink />
            </div>

            <button onClick={logout}>
              <IoLogOutOutline size={size} />
            </button>
          </div>
          <div className="md:hidden flex items-center gap-2">
            <UserImageLink />
            <button
              onClick={() => {
                setIsVisible(!isVisible);
              }}
            >
              <GiHamburgerMenu />
            </button>
          </div>
        </div>
        <div className={` ${isVisible ? "" : "hidden"} md:hidden`}>
          {mappedItems}
          <div className="px-2 hover:bg-orange-500 ">
            <button onClick={logout} className="flex gap-2  items-center">
              Logout <IoLogOutOutline size={size} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
