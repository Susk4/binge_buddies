import NavItems from "./NavItems";
import { NAV_ITEMS } from "../../config/constants";
import useClickOutSide from "../../hook/useClickOutSide";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiCameraMovie } from "react-icons/bi";
import { IoLogOutOutline } from "react-icons/io5";
import useAuth from "../../hook/useAuth";
import Link from "next/link";
import UserImageLink from "./UserImageLink";
import MobileNavItems from "./MobileNavItems";

export default function Navbar() {
  const { logout } = useAuth();
  const size = 30;
  const { ref, isVisible, setIsVisible } = useClickOutSide(false);

  return (
    <nav ref={ref}>
      <div className={`font-bold  p-1 ${isVisible ? "bg-white" : ""}`}>
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
        <div className={` ${isVisible ? "" : "hidden"} md:hidden bg-white`}>
          <MobileNavItems logout={logout} />
        </div>
      </div>
    </nav>
  );
}
