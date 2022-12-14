import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Authentication from "./components/AuthenticationPage";
import Dashboard from "./components/Dashboard";
import BudgetSheet from "./components/BudgetSheet";

const getCSRFToken = ()=>{
  let csrfToken

  // the browser's cookies for this page are all in one string, separated by semi-colons
  const cookies = document.cookie.split(';')
  for ( let cookie of cookies ) {
      // individual cookies have their key and value separated by an equal sign
      const crumbs = cookie.split('=')
      if ( crumbs[0].trim() === 'csrftoken') {
          csrfToken = crumbs[1]
      }
  }
  return csrfToken
}
axios.defaults.headers.common['X-CSRFToken'] = getCSRFToken()


function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="" element={<Authentication />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/budgetSheet" element={<BudgetSheet />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
