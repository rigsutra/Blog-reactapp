import { Button, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";

const Signup = () => {
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
          <form className="flex flex-col gap-4">
            <div>
              <Label htmlFor="username" value="User Name" />
              <TextInput type="text" placeholder="Username" id="username" />
            </div>
            <div>
              <Label htmlFor="email" value="User Email" />
              <TextInput type="email" placeholder="Email" id="email" />
            </div>
            <div>
              <Label htmlFor="password" value="User Password" />
              <TextInput type="password" placeholder="Password" id="password" />
            </div>
            <Button gradientDuoTone="purpleToPink" type="submit">
              Sign Up
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5 dark:text-white">
            <span>Have an account?</span>
            <Link to="/signin" className="text-blue-500">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
