import { Link } from "react-router-dom";

export default function OAuthRegister() {
  return (
    <div className="flex justify-center items-center h-screen w-full  text-burnt_sienna-400 bg-301 bg-contain">
      <div className=" ">
        <div className="flex flex-col items-center justify-center space-y-8 px-8">
        <p className="text-sunset-300 text-xl lg:text-6xl font-bold text-center pb-15">
        🥳 Congratulations 🥳<br/><br/>
        </p>
          <p className="text-sunset-400 text-xl lg:text-2xl font-semibold text-center">
          You have successfully registered with your Google account!<br/><br/>

          We have just sent you a confirmation with a specially generated password to your email.<br/><br/>

          Also check your spam folder!<br/><br/>

          After the first successful login, we ask you to renew your password via your profile.<br/><br/>

          Now we wish you much success and great adventures!<br/><br/>

          Your ViaTranquilla Team<br/><br/>
          </p>
          <Link
            to="/login"
            className="text-sunset-800 text-xl lg:text-4xl font-semibold hover:underline"
          >
            {" "}
            Go to Login{" "}
          </Link>
        </div>
      </div>
    </div>
  );
}
