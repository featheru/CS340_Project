import { Link } from "react-router-dom";
import './App.css';

export default function App() {
  return (
    <div>
      <h1>Beavers Development</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem"
        }}
      >
        <Link to="/aptOwners">AptOwners</Link> |{" "}
        <Link to="/rodents">Rodents</Link>
      </nav>
    </div>
  );
}
