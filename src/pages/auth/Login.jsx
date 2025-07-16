import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";
import useEcommerceStore from "../../stores/ecommerceStore";

const Login = () => {
  const actionLogin = useEcommerceStore((state) => state.actionLogin);

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

      await actionLogin(form);
      navigate("/");

      toast.success("🦄 Login Success");
    } catch (error) {
      console.log(error);
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
                  {loading ? "loading..." : "Login"}
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
          {/* Google */}
          <button className="btn bg-white text-black border-[#e5e5e5]">
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};
export default Login;
