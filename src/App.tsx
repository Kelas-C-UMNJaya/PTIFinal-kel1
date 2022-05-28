import { Button } from "./components/Button";
import { Link, Outlet } from "react-router-dom";
import { useUser } from "@/lib/UserContext";
function App() {
  const { user } = useUser();
  return (
    <div className="App mx-auto h-screen flex items-center justify-center flex-col gap-5 bg-zinc-900 text-gray-200">
      <h1 className="text-5xl font-bold underline">Hello {user.name}</h1>
      <p className="text-xl">Created using Vite + React + TailwindCSS</p>
      <p className="italic">
        Sekarang kerjakan tugasnya -{" "}
        <a href="https://github.com/itshiroto" className="text-blue-600">
          itshiroto
        </a>
      </p>
      <Link to="/debug">
        <Button>Debug</Button>
      </Link>
      <Link to="/game">
        <Button>Game Page</Button>
      </Link>
    </div>
  );
}

export default App;
