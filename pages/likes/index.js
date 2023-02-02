import { withProtected } from "../../src/hook/route";
import ComingSoon from "../../components/misc/ComingSoon";

function Likes({ auth }) {
  return (
    <ComingSoon
      title="Likes"
      shortDescription="Likes are coming soon."
      longDescription="Here you will be able to give your opinion on movies and tv shows."
    />
  );
}
export default withProtected(Likes);
