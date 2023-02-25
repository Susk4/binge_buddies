import { withProtected } from "../src/hook/route";
import MoviesCards from "../components/MovieCard/MovieCards";

function Main({ auth }) {
  const { user } = auth;
  return <MoviesCards user={user} />;
}
export default withProtected(Main);
