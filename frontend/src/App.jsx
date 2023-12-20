import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "rsuite/dist/rsuite.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import Articles from "./components/Articles";
import BudgetSheet from "./components/BudgetSheet";
import SalaryFinder from "./components/SalaryFinder";
import SalaryCalculator from "./components/SalaryCalculator";
import AuthenticationPage from "./pages/AuthenticationPage";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<AuthenticationPage />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/budgetSheet" element={<BudgetSheet />} />
            <Route path="/salaryFinder" element={<SalaryFinder />} />
            <Route path="/salaryCalculator" element={<SalaryCalculator />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
