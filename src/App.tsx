import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Components/Header";
import Header2 from "./Components/Header2";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";

function App() {
  return (
    <Router>
      <Header></Header>
      <Header2></Header2>
      <Switch>
        <Route path="/tv">
          <Tv />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
        <Route path={["/", "/movies/:movieId"]}>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
