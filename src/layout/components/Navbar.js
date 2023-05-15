import NavItems from "./NavItems";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiCameraMovie } from "react-icons/bi";
import { IoLogOutOutline, IoClose } from "react-icons/io5";
import useAuth from "../../hook/useAuth";
import Link from "next/link";
import UserImageLink from "./UserImageLink";
import MobileNavItems from "./MobileNavItems";

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(false);
  const { logout } = useAuth();
  const size = 30;

  return (
    <nav>
      <div
        className={`font-bold  ${
          isVisible ? "bg-white" : ""
        } transition-colors delay-duration-500 duration-500 ease-in-out`}
      >
        <div className=" flex h-10 items-center justify-between mx-2 my-1">
          <div className="flex-none">
            <Link href="/" legacyBehavior>
              <a>
                <BiCameraMovie size={size} className="cursor-pointer" />
              </a>
            </Link>
          </div>

          <NavItems />

          <div className="hidden justify-center md:flex flex-none gap-2">
            <UserImageLink />

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
              {!isVisible ? (
                <GiHamburgerMenu size={size} />
              ) : (
                <IoClose size={size} />
              )}
            </button>
          </div>
        </div>

        <div
          className={` ${
            isVisible ? "h-full" : "h-0"
          } md:h-0 bg-white overflow-hidden absolute w-full z-10 top-11  transition-all duration-500 ease-in-out `}
        >
          <MobileNavItems logout={logout} setIsVisible={setIsVisible} />
        </div>
      </div>
    </nav>
  );
}
