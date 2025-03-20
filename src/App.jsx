import "./App.css";
import Cart from "./Components/CartComponent/Cart";
import Footer from "./Components/FooterComponent/Footer";
import Header from "./Components/HeaderComponent/Header";
import Home from "./Components/HomeComponent/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Reviews from "./Components/ReviewsComponent/Reviews";
import Payment from "./Components/PaymentComponent/Payment";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
            </>
          }
        />
        <Route
          path="/cart"
          element={
            <>
              <Cart />
            </>
          }
        />
        <Route
          path="/reviews"
          element={
            <>
              <Reviews />
            </>
          }
        />
        <Route
          path="/payment"
          element={
            <>
              <Payment />
            </>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
