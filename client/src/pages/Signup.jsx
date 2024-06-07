import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  signinFailuer,
  signinStart,
  signinSuccess,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Signup = () => {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password || !formData.email) {
      return dispatch(signinFailuer("please fill all the fields"));
    }
    try {
      dispatch(signinStart());
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signinFailuer(data.message));
      }

      if (res.ok) {
        dispatch(signinSuccess(data));
        navigate("/signin");
      }
    } catch (error) {
      dispatch(signinFailuer(error.message));
    }
  };
  return (
    <div className="min-h-screen mt-20 flex flex-col gap-5">
      <div className=" p-3 max-w-3xl mx-auto flex flex-col md:flex-row md:items-center">
        {/* Left */}
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Medium
            </span>
            blog
          </Link>
          <p className="text-sm mt-5 dark:text-white">
            This is the demo project. You can use this page to sign up here and
            then you can enjoy yourself.
          </p>
        </div>
      </div>
      <div className="flex p-3 max-w-3xl mx-auto">
        {/* Right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="username" value="User Name" />
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="email" value="User Email" />
              <TextInput
                type="email"
                placeholder="Email"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="password" value="User Password" />
              <TextInput
                type="password"
                placeholder="Password"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone="purpleToPink"
              className=" text-black border-2 bg-pink-500 "
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size={10} />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5 dark:text-white">
            <span>Have an account?</span>
            <Link to="/signin" className="text-blue-500">
              Sign in
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5 bg-red-400" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;
