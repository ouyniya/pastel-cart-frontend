import axios from "axios";
import { KeyRound, MailIcon, User2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(null);

  const [isValidatedInput, setIsValidatedInput] = useState(false);

  // Validation function to check all inputs
  const validateForm = () => {
    const emailValid = /\S+@\S+\.\S+/.test(form.email);

    const usernameValid = /^[A-Za-z][A-Za-z0-9-]{2,29}$/.test(form.name); // min 3 max 30 chars

    const passwordValid = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(
      form.password
    );

    const confirmPasswordValid =
      form.confirmPassword === form.password && passwordValid;

    return emailValid && usernameValid && passwordValid && confirmPasswordValid;
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

  const handleRegister = async (e) => {
    setLoading(true);

    try {
      e.preventDefault();
      await axios.post("http://localhost:5001/api/register", form);
      navigate("/login");

      toast.success("🦄 Register Success");
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
            <h1 className="font-serif text-3xl">Register</h1>

            {/* Register form */}
            <div className="main-register-form mt-4 grid grid-cols-1 gap-3">
              <div className="flex flex-col gap-0.5">
                <p>Email</p>
                <label className="input validator">
                  <MailIcon size={16} className="opacity-50" />
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
              </div>

              <div className="flex flex-col gap-0.5">
                <p>Username</p>
                <label className="input validator">
                  <User2 size={16} className="opacity-50" />
                  <input
                    onChange={handleOnchange}
                    value={form.name}
                    type="text"
                    name="name"
                    required
                    placeholder="Username"
                    pattern="[A-Za-z][A-Za-z0-9\-]*"
                    minLength="3"
                    maxLength="30"
                    title="Only letters, numbers or dash"
                  />
                </label>
                <p className="validator-hint hidden">
                  Must be 3 to 30 characters
                  <br />
                  containing only letters, numbers or dash
                </p>
              </div>

              <div className="flex flex-col gap-0.5">
                <p>Password</p>
                <label className="input validator">
                  <KeyRound size={16} className="opacity-50" />
                  <input
                    onChange={handleOnchange}
                    value={form.password}
                    type="password"
                    name="password"
                    autoComplete="new-password"
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

              <div className="flex flex-col gap-0.5">
                <p>Confirm Password</p>
                <label className="input validator">
                  <KeyRound size={16} className="opacity-50" />
                  <input
                    onChange={handleOnchange}
                    value={form.confirmPassword}
                    type="password"
                    name="confirmPassword"
                    autoComplete="new-password"
                    required
                    placeholder="Confirm Password"
                    minLength="6"
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                    title="Must be more than 6 characters, including number, lowercase letter, uppercase letter"
                  />
                </label>
              </div>
            </div>

            {/* Register button */}
            <div className="button-register my-6">
              {isValidatedInput ? (
                <button
                  onClick={handleRegister}
                  className={twMerge(
                    "relative btn btn-primary max-w-max overflow-hidden z-10 ",
                    loading ? "stripe-animation" : ""
                  )}
                >
                  {loading ? "loading..." : "Register"}
                </button>
              ) : (
                <button className="btn btn-dash btn-primary max-w-max" disabled>
                  Register
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
export default Register;
