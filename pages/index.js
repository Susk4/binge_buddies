import { withProtected } from "../src/hook/route";
import { BiCameraMovie } from "react-icons/bi";
import ComingSoon from "../components/misc/ComingSoon";
import MovieCard from "../components/MovieCard/MovieCard";

function Main({ auth }) {
  return <MovieCard/>;
}
export default withProtected(Main);
