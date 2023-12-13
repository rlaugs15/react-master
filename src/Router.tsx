import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";

function Router() {
  return (
    <BrowserRouter basename="react-master">
      {/*Switch: 한 번에 하나의 라우터를 렌더링*/}
      <Route>
        <Header />
      </Route>
      <Switch>
        <Route path="/search">
          <Search />
        </Route>
        <Route path="/tv">
          <Tv />
        </Route>
        {/* 두 개의 path에서 같은 컴포넌트를 render할 수 있다. 이유는 match를 쓸 것이므로 */}
        <Route path={["/", "/movie/:movieId"]}>
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
export default Router;
