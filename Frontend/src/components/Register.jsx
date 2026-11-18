import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/App_Context";
import { ToastContainer, toast, Bounce } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useContext(AppContext);
  const [name, setname] = useState("");
  const [gmail, setgmail] = useState("");
  const [password, setpassword] = useState("");

  const registerHandler = async (e) => {
    e.preventDefault();
    try {
      const result = await register(name, gmail, password);
      toast.success(result.data.message, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      // Fixed lag: route immediately after success instead of waiting 1.5s.
      navigate("/login");
      console.log(result)
    } catch (error) {
      toast.error(error.response?.data?.message || error.message, {
        position: "top-right",
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="form-panel">
        <h2 className="form-panel-title">REGISTER</h2>
        <form
        onSubmit={registerHandler}
          className="mt-4"
        >
          <div className="mb-3">
            <label htmlFor="registerName" className="form-label">
              Name
            </label>
            <input
            value={name}
            onChange={(e)=>setname(e.target.value)}
              type="text"
              className="form-control"
              id="registerName"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="registerEmail" className="form-label">
              Email
            </label>
            <input
            value={gmail}
            onChange={(e)=>setgmail(e.target.value)}
              type="email"
              className="form-control"
              id="registerEmail"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="registerPassword" className="form-label">
              Password
            </label>
            <input
            value={password}
            onChange={(e)=>setpassword(e.target.value)}
              type="password"
              className="form-control"
              id="registerPassword"
              required
            />
          </div>

          <div className="pt-2">
            <button type="submit" className="btn btn-accent form-submit">
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
