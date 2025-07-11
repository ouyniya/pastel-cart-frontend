import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(null);

  const [isValidatedInput, setIsValidatedInput] = useState(false);

  // Validation function to check all inputs
  const validateForm = () => {
    const emailValid = /\S+@\S+\.\S+/.test(form.email);

    const passwordValid = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(
      form.password
    );
    return emailValid && passwordValid;
  };

  // Update isValidatedInput whenever form changes
  useEffect(() => {
    setIsValidatedInput(validateForm());
  }, [form]);

  const handleOnchange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    setLoading(true);

    try {
      e.preventDefault();
      await axios.post("http://localhost:5001/api/login", form);
      navigate("/");

      toast.success("🦄 Login Success");
    } catch (error) {
      // Zod error
      if (Array.isArray(error?.response?.data?.errors)) {
        const mergeError = error?.response?.data?.errors?.map(
          (err) => err.message
        );
        const errMsg = mergeError.join(", ");
        toast.error(errMsg);
        return;
      }

      // Normal error
      const errMsg = error?.response?.data?.errors;
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex w-full flex-col">
        <div className="card rounded-box grid place-items-center">
          <form className="flex flex-col gap-2 min-w-md">
            <h1 className="font-serif text-3xl">Login</h1>

            {/* Login form */}
            <div className="main-register-form mt-4 grid grid-cols-1 gap-3">
              <p>Email</p>
              <label className="input validator">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </g>
                </svg>
                <input
                  onChange={handleOnchange}
                  value={form.email}
                  name="email"
                  type="email"
                  placeholder="mail@site.com"
                  required
                />
              </label>
              <div className="validator-hint hidden">
                Enter valid email address
              </div>

              <p>Password</p>
              <label className="input validator">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                    <circle
                      cx="16.5"
                      cy="7.5"
                      r=".5"
                      fill="currentColor"
                    ></circle>
                  </g>
                </svg>
                <input
                  onChange={handleOnchange}
                  value={form.password}
                  type="password"
                  name="password"
                  required
                  placeholder="Password"
                  minLength="6"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                  title="Must be more than 6 characters, including number, lowercase letter, uppercase letter"
                />
              </label>
              <p className="validator-hint hidden">
                Must be more than 6 characters, including
                <br />
                At least one number <br />
                At least one lowercase letter <br />
                At least one uppercase letter
              </p>
            </div>

            {/* Register button */}
            <div className="button-register my-6">
              {isValidatedInput ? (
                <button
                  onClick={handleLogin}
                  className={twMerge(
                    "relative btn btn-primary max-w-max overflow-hidden z-10 ",
                    loading ? "stripe-animation" : ""
                  )}
                >
                  {loading ? "loading..." : "Register"}
                </button>
              ) : (
                <button className="btn btn-dash btn-primary max-w-max" disabled>
                  Login
                </button>
              )}
            </div>
          </form>
        </div>
        <div className="divider">OR</div>
        <div className="card rounded-box grid place-items-center">
          <button className="btn btn-primary max-w-max">
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};
export default Login;
