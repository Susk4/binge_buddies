import { withProtected } from "../../src/hook/route";
import ComingSoon from "../../components/misc/ComingSoon";

function Explore({ auth }) {
  return (
    <ComingSoon
      title="Explore"
      shortDescription="Explore movies and tv shows."
      longDescription="Here you will be able to explore movies and tv shows."
    />
  );
}
export default withProtected(Explore);
