import { useLocation } from "react-router-dom";

function Search() {
  const location = useLocation(); // info about the current page
  const keyword = new URLSearchParams(location.search).get("keyword");
  console.log(keyword);
  return null;
}
export default Search;