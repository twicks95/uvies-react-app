import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/main/Home/Home";
import MovieDetail from "./pages/main/MovieDetail/MovieDetail";
import OrderPage from "./pages/main/OrderPage/OrderPage";
import PaymentPage from "./pages/main/PaymentPage/PaymentPage";
import ManageMovie from "./pages/main/ManageMovie/ManageMovie";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/movie-detail" exact component={MovieDetail}></Route>
        <Route path="/order-page" exact component={OrderPage}></Route>
        <Route path="/payment-page" exact component={PaymentPage}></Route>
        <Route path="/manage-movie" exact component={ManageMovie}></Route>
      </Switch>
    </Router>
  );
}

// export default App;
