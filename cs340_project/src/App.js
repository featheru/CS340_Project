import './App.css';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

function App() {
  return (
    <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/AptOwners">Apartment Owners</Link>
          </li>

        </ul>
      </nav>
    </div>
    </Router>
  );
}

export default App;
