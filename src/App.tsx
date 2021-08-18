import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Route } from "react-router-dom"
import Home from './components/Home/Home';
import Details from './components/Details/Details';

function App() {
  return (
    <Router >
      <Route path="/" exact render={(routerProps) => <Home {...routerProps}  />} />
      <Route path="/details/:id" exact render={(routerProps) => <Details {...routerProps}  />} />
    </Router>
  );
}

export default App;
