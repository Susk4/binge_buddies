import NavItems from "./NavItems";
import { NAV_ITEMS } from "../../config/constants";
import useClickOutSide from "../../hook/useClickOutSide";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoLogOutOutline } from "react-icons/io5";
import {BiCameraMovie} from "react-icons/bi"
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

  return (
    <nav ref={ref}>
      <div className=" text-orange-900 font-bold p-2">
        <div className=" flex h-10 items-center justify-between px-2">
          <div className="flex-none ">
            <Link href="/"><BiCameraMovie className="w-8 h-8"/></Link>
          </div>

          <NavItems />

          <div className="hidden justify-center md:flex flex-none gap-2">
            {user ? (
              <div className="flex items-center">
                {user.photoUrl ? <UserImage /> : `User: ${user.name}`}
              </div>
            ) : (
              <div>Not logged in</div>
            )}
            <button onClick={logout}>
              <IoLogOutOutline size={size} />
            </button>
          </div>
          <div className="md:hidden flex items-center gap-2">
            {user.photoUrl ? <UserImage /> : `User: ${user.name}`}
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
        </div>
      </div>
    </nav>
  );
}
