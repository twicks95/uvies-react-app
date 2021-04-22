import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/main/Home/Home";
import MovieDetail from "./pages/main/MovieDetail/MovieDetail";
// import OrderPage from "";
import PaymentPage from "./pages/main/PaymentPage/PaymentPage";
import AdminPage from "./pages/main/AdminPage/AdminPage"
// require("dotenv").config();

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/movie-detail" exact component={MovieDetail}></Route>
        <Route path="/payment-page" exact component={PaymentPage}></Route>
        <Route path="/admin-page" exact component={AdminPage}></Route>
      </Switch>
    </Router>
  );
}

// export default App;
