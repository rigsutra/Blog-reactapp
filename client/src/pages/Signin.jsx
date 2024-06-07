import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Signin = () => {
  const [formData, setFormData] = useState({});
  const [errormessage, setErrormessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password || !formData.email) {
      return setErrormessage("please fill all the fields");
    }
    try {
      setLoading(true);
      setErrormessage(null);
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrormessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate("/");
      }
    } catch (error) {
      setErrormessage(error.message);
    }
    setLoading(false);
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
            This is the demo project. You can use this page to sign in here and
            then you can enjoy yourself.
          </p>
        </div>
      </div>
      <div className="flex p-3 max-w-3xl mx-auto">
        {/* Right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
                "Sign In"
              )}
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5 dark:text-white">
            <span> Dont Have an account?</span>
            <Link to="/signup" className="text-blue-500">
              Sign up
            </Link>
          </div>
          {errormessage && (
            <Alert className="mt-5 bg-red-400" color="failure">
              {errormessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signin;
