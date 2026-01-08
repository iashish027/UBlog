import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home.jsx";
import About from "../pages/About.jsx";
import Dashboard from "../features/Dashboard/Dashboard.jsx";
import SignIn from "../features/auth/SignIn.jsx";
import SignUp from "../features/auth/SignUp.jsx";
import VerifyEmail from "../features/auth/VerifyEmail.jsx";
import Header from "../Components/Layout/Header.jsx";
import FooterComponent from "../Components/Layout/FooterComponent.jsx";
import PrivateRoute from "../features/auth/PrivateRoute.jsx";
import AuthInitializer from "../features/auth/AuthInitializer.jsx";
import CreatePost from "../features/post/CreatePost.jsx";
import BlogShow from "../features/post/BlogShow.jsx";
function App() {
  return (
    <AuthInitializer>
      <BrowserRouter>
        <div>
          <Header />
          <div className="min-h-screen">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/About" element={<About />} />
              <Route element={<PrivateRoute />}>
                <Route path="/Dashboard" element={<Dashboard />} />
                <Route path="/CreatePost" element={<CreatePost />} />
              </Route>
              <Route path="/SignIn" element={<SignIn />} />
              <Route path="/SignUp" element={<SignUp />} />
              <Route path="/verify-email" element={<VerifyEmail />} />
              <Route path="/blog" element={<BlogShow />} />
            </Routes>
          </div>
          <FooterComponent />
        </div>
      </BrowserRouter>
    </AuthInitializer>
  );
}

export default App;
