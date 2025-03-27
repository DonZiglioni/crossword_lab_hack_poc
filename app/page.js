import Converter from "./components/Converter";


export default function Home() {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-4 h-screen bg-gray-200">
      <h1 className="text-2xl font-bold">Crossword Labs Hack PoC</h1>
      <Converter />
    </div>
  );
}
