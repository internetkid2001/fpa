function App() {
  return (
    <div className="min-h-screen bg-slate-800 text-sky-100 flex flex-col items-center justify-center p-10">
      <h1 className="text-5xl font-extrabold mb-4 text-cyan-400">
        Tailwind CSS v4 + Vite is Running!
      </h1>
      <p className="text-lg text-slate-300">
        If this text is styled with a dark slate background and vibrant cyan heading, it's working!
      </p>
      <button className="mt-8 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-lg shadow-lg transition-colors duration-300">
        Awesome Button
      </button>
    </div>
  )
}
export default App