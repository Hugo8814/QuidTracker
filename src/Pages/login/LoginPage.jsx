import Logo from "../../imgs/Logo.svg";

import hero from "../../imgs/hero.png";
import { Link } from "react-router-dom";

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Email, password }),
    });

    const data = await response.json();

    // Inside handleSubmit after successful login:
    if (response.ok) {
      localStorage.setItem("token", data.token); // Store token in localStorage
      dispatch(setAuthToken(data.token)); // Dispatch action to set token in Redux
      navigate("/app/Overview"); // Redirect using useNavigate
    } else {
      setError(data.error); // Handle error from server
    }
  } catch (error) {
    console.error("Error logging in:", error);
    setError("An unexpected error occurred. Please try again.");
  }
};
function LoginPage() {
  return (
    <div className="shadow-xl flex items-center p-5 h-screen bg-[#ffffff] max-1100:flex-col max-1100:p-0  ">
      <div className="relative bg-[#0055ff]  h-full max-w-[560px] flex-1 overflow-hidden rounded-[12px] bg-grey-900 p-12  max-1100:hidden max-1100:p-0 flex flex-col  ">
        <div className="w-full flex flex-col  gap-4 items-center max-1100:hidden">
          <img
            src={Logo}
            alt=""
            className=" z-20 relative w-40  mt-7 max-1100:hidden"
          />
          <p className="z-20 relative text-white text-5xl font-bold">
            Quid Tracker
          </p>
        </div>

        {/* <div className="absolute inset-0 z-0 h-full w-full max-1100:hidden">
          add img  here if you want a img as bg
        </div> */}

        <div className=" h-full w-[90%] max-1100:hidden self-center ">
          <img
            className="w-full mt-[10%] "
            src={hero}
            alt="preview of the app"
          />
        </div>
        <div className="z-10 mt-auto flex flex-col gap-8 mb-10 text-white max-1100:hidden">
          <h2 className="text-[2.7rem] font-bold max-w-[20ch]">
            Keep track of your money and save for your future
          </h2>
          <p className="text-2xl font-normal">
            Quid Tracker puts you in control of your spending. Track
            transactions, set budgets, and track subscriptions easily.
          </p>
        </div>
      </div>

      <div className="w-[60%] flex justify-center items-center text-2xl  max-1100:w-full max-1100:h-full">
        <div className="flex flex-col w-full h-full justify-center items-center ">
          <h1 className="text-[3.6rem] font-semibold mb-6">
            Welcome to Quid Tracker
          </h1>
          <div className="flex  justify-center gap-2">
            <h3 className="text-2xl mb-10 font-semibold">
              Don't have an account?
            </h3>

            <Link to="/Signup" className="text-[#0055ff] font-semibold  ">
              Sign up for free
            </Link>
          </div>

          <div
            className="bg-white p-12   rounded-xl  w-[45%] flex flex-col gap-6 max-1300:w-[60%] max-1100:w-[55%] max-1100:m-[10%]
        max-700:w-full max-700:m-[10%] max-380:m-[3%]  "
          >
            {/* {error && <p className="text-red-500 text-sm mb-4">{error}</p>} */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-xl font-bold mb-2"
                  htmlFor="Email"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="Email"
                  // value={Email}
                  // onChange={(e) => setEmail(e.target.value)}
                  className="shadow appearance-none border rounded-xl w-full py-5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-xl font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  // value={password}
                  // onChange={(e) => setPassword(e.target.value)}
                  className="shadow appearance-none border rounded-xl w-full py-5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-[#0055FF] text-2xl hover:bg-gray-700 text-white font-bold py-6 px-4 rounded-xl focus:outline-none focus:shadow-outline w-full  max-380:text-xl"
              >
                Login
              </button>
              <button
                type="submit"
                onClick={() => {
                  setEmail("Demo1234");
                  setPassword("Demo1234");
                }}
                className="bg-black  border-2 text-white  text-2xl hover:bg-gray-800 font-bold py-6 px-4 rounded-xl focus:outline-none focus:shadow-outline w-full  max-380:text-xl "
              >
                Try out a Demo Account
              </button>
            </form>
            <div>
              <p className="text-gray-600 text-xl text-center p-3">
                Need to reset your password?{" "}
                <Link
                  to="/reset-password"
                  className="text-gray-900 font-semibold underline "
                >
                  Reset Password
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
