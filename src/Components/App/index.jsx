import Login from "../Login";
import SignUp from "../SignUp";
import Header from "../Header";
import Welcome from "../Welcome";
import Landing from "../Landing";
import Error from "../Error";
import Footer from "../Footer";
import ForgetPassword from "../PasswordForgot";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../../App.css"
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="*" element={<Error />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
