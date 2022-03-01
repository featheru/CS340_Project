import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import App from "./App";
import AptFloors from "./pages/AptFloors";
import AptOwners from "./pages/AptOwners";
import Apts from "./pages/Apts";
import PriceHistory from "./pages/PriceHistory";
import Rodents from "./pages/Rodents";
import RodentsToFloors from "./pages/RodentsToFloors";
import pool from "./DatabaseConnection";

const rootElement = document.getElementById("root")


// Routing for all pages.
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="aptOwners" element={<AptOwners />} />
      <Route path="rodents" element={<Rodents />} />
      <Route path="apts" element={<Apts />} />
      <Route path="aptFloors" element={<AptFloors />} />
      <Route path="priceHistory" element={<PriceHistory />} />
      <Route path="rodentsToFloors" element={<RodentsToFloors />} />
    </Routes>
  </BrowserRouter>,
  rootElement


);

App.get('/aptFloors', function(req, res)
{
  let query1 = "SELECT * FROM aptFloors;";               // Define our query
  pool.query(query1, function(error, rows, fields){    // Execute the query
    res.render('index', {data: rows});                  // Render the index.hbs file, and also send the renderer
  })                                                      // an object where 'data' is equal to the 'rows' we
});
