import { withProtected } from "../src/hook/route";
import { BiCameraMovie } from "react-icons/bi";
import ComingSoon from "../components/misc/ComingSoon";

function Main({ auth }) {
  return (
    <ComingSoon
      title="BingeBuddies"
      shortDescription="BingeBuddies is launching very soon."
      longDescription="Check back regularly for updates."
    />
  );
}
export default withProtected(Main);
