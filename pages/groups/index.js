import { withProtected } from "../../src/hook/route";
import ComingSoon from "../../components/misc/ComingSoon";

function Groups({ auth }) {
  return (
    <ComingSoon
      title="Groups"
      shortDescription="Groups are coming soon."
      longDescription="Here you will be able to create groups and join groups. You will be able to share movies and tv shows with your friends."
    />
  );
}
export default withProtected(Groups);
