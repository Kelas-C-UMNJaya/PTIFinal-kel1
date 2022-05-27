import { Button } from './components/Button';
import { Link } from 'react-router-dom';
function App() {
  return (
    <div className="App container mx-auto h-screen flex items-center justify-center flex-col gap-5">
      <h1 className="text-5xl font-bold underline">Hello gaes</h1>
      <p className="text-xl">Created using Vite + React + TailwindCSS</p>
      <p className="italic">Sekarang kerjakan tugasnya - <a href="https://github.com/itshiroto" className="text-blue-600">itshiroto</a></p>
      <Link to="/debug">
        <Button>Debug</Button>
      </Link>
    </div>
  )
}

export default App
