import { withProtected } from "../src/hook/route";
import MoviesCards from "../components/MovieCard/MovieCards";

function Main({ auth }) {
  return <MoviesCards />;
}
export default withProtected(Main);
