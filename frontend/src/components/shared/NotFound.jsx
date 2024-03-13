import { Link } from "react-router-dom";

export default function NotFound({ error }) {
  if (!error) return null;
  return (
    <div className="flex justify-center items-center h-screen w-full  text-burnt_sienna-400 bg-404 bg-contain bg-no-repeat my-8">
      <div className=" ">
        <div className="flex flex-col items-center justify-center space-y-8 px-8">
          <p className="font-bold text-4xl lg:text-6xl uppercase bg-gradient-to-b from-sunset-400 to-burnt_sienna-400 bg-clip-text text-transparent">
            {error}
          </p>
          <p className="text-eggshell-300 text-xl lg:text-2xl font-semibold text-center">
            Looks like the page you are looking for is currently on an adventure
          </p>
          <Link
            to="/"
            className="text-eggshell-600 text-xl lg:text-2xl font-semibold hover:underline"
          >
            {" "}
            Back to Home{" "}
          </Link>
        </div>
      </div>
    </div>
  );
}
