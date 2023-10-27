import { BrowserRouter, Switch, Route } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";
import Side from "./routes/Side";

interface IRouter {
  isDarkMode: boolean;
  toggleDarkMode: (prev: boolean) => void;
}

function Router({ isDarkMode, toggleDarkMode }: IRouter) {
  return (
    <BrowserRouter>
      <Route>
        <Side isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      </Route>
      {/*Switch: 한 번에 하나의 라우터를 렌더링*/}
      <Switch>
        <Route path="/:coinId">
          <Coin />
        </Route>
        <Route path="/">
          <Coins />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
export default Router;
