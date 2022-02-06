import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import App from "./App";
import AptOwners from "./pages/AptOwners";
import Rodents from "./pages/Rodents";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="aptOwners" element={<AptOwners />} />
      <Route path="rodents" element={<Rodents />} />
    </Routes>
  </BrowserRouter>,
  rootElement
);
