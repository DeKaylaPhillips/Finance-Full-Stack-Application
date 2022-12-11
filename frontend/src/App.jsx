import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import Authentication from "./components/AuthenticationPage";
import Dashboard from "./components/Dashboard";

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
          <Route path="/dashboard" element={<Dashboard />} /> {/* Might need to add API in front of this. */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
