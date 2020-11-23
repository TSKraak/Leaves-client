import { Route, Switch } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import LeavesPage from "./pages/LeavesPage";
import LeavesDetailPage from "./pages/LeavesDetailPage";

const NotFound = () => {
  return <h3>Oops, sorry. Page doesn't exist.</h3>;
};

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={HomePage} />

        <Route exact path="/leaves">
          <LeavesPage />
        </Route>

        <Route exact path="/leaves/:id?">
          <LeavesDetailPage />
        </Route>

        <Route path="/" component={NotFound} />
      </Switch>
    </div>
  );
}
export default App;
