import NavItems from "./NavItems";
import { NAV_ITEMS } from "../../config/constants";
import useClickOutSide from "../../hook/useClickOutSide";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoLogOutOutline } from "react-icons/io5";
import useAuth from "../../hook/useAuth";
import Link from "next/link";
import UserImage from "./UserImage";

export default function Navbar() {
  const { user, logout } = useAuth();
  const size = 30;
  const items = NAV_ITEMS;
  const mappedItems = items.map((item) => (
    <div className="p-2 block hover:bg-orange-500">{item}</div>
  ));
  const { ref, isVisible, setIsVisible } = useClickOutSide(false);
  console.log(user);
  return (
    <nav ref={ref}>
      <div className="bg-orange-300">
        <div className=" flex h-10 items-center justify-between px-2">
          <div className="flex-none ">
            <Link href="/">BingeBuddies</Link>
          </div>

          <NavItems />

          <div className="hidden justify-center md:flex flex-none gap-2">
            {user ? (
              <div className="flex items-center">
                {user.photoURL ? <UserImage /> : `User: ${user.displayName}`}
              </div>
            ) : (
              <div>Not logged in</div>
            )}
            <button onClick={logout}>
              <IoLogOutOutline size={size} />
            </button>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => {
                setIsVisible(!isVisible);
              }}
              className="flex items-center gap-2"
            >
              {user.photoURL ? <UserImage /> : `User: ${user.displayName}`}
              <GiHamburgerMenu />
            </button>
          </div>
        </div>
        <div className={` ${isVisible ? "" : "hidden"} md:hidden`}>
          {mappedItems}
        </div>
      </div>
    </nav>
  );
}
