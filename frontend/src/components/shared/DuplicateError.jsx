import { Link } from "react-router-dom";

export default function OAuthDuplicateError() {
  return (
    <div className="flex justify-center items-center h-screen w-full  text-burnt_sienna-400 bg-301 bg-contain">
      <div className=" ">
        <div className="flex flex-col items-center justify-center space-y-8 px-8">
        <p className="text-sunset-300 text-xl lg:text-6xl font-bold text-center pb-15">
        🚨 Duplicate Error 🚨<br/><br/>
        </p>
          <p className="text-eggshell-300 text-xl lg:text-2xl font-semibold text-center">
          It seems that an account with this data already exists!<br/><br/>

          Please go back to the registration and sign in with another Google account or use the manual option.<br/><br/>

          <p className="text-sunset-300 text-xl lg:text-3xl font-bold text-center pb-15 underline">
          Your ViaTranquilla Team<br/><br/>
          </p>
          </p>
          <Link
            to="/register"
            className="text-sunset-800 text-xl lg:text-4xl font-semibold hover:underline"
          >
            {" "}
            Go to Register{" "}
          </Link>
        </div>
      </div>
    </div>
  );
}
