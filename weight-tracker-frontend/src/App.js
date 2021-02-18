import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar";
import Dashboard from "./components/dashboard";
import CreateUser from "./components/create-user";
import EditWeight from "./components/edit-weight";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={Dashboard} />
        <Route path="/user" component={CreateUser} />
        <Route path="/edit-weight" component={EditWeight} />
      </div>
    </Router>
  );
}

export default App;
