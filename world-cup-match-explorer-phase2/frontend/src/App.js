import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MatchesList from "./MatchesList";
import CreateMatch from "./CreateMatch";
import EditMatch from "./EditMatch";
import Login from "./Login";
import VerifyOtp from "./VerifyOtp";
import "./App.css";

function App() {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <Router>
      {/* TOP HEADER */}
      <div className="top-header">World Cup Match Explorer</div>

      {/* NAV MENU */}
      <nav className="main-nav">
  <Link to="/">Matches</Link>

  {localStorage.getItem("token") && (
    <Link to="/matches/new">Add New Match</Link>
  )}

  {localStorage.getItem("token") ? (
    <button
      onClick={() => {
        localStorage.removeItem("token");
        localStorage.removeItem("loginEmail");
        window.location.href = "/login";
      }}
    >
      Logout
    </button>
  ) : (
    <Link to="/login">Login</Link>
  )}
</nav>


      {/* PAGE CONTENT */}
      <div style={{ padding: "20px" }}>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />

          {/* Protected routes */}
          <Route path="/" element={<MatchesList />} />
          <Route path="/matches" element={<MatchesList />} />
          <Route path="/matches/new" element={<CreateMatch />} />
          <Route path="/matches/:id/edit" element={<EditMatch />} />

          {/* If route doesn't exist → go to login */}
          <Route path="*" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
