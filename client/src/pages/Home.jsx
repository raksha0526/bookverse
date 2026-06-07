import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-indigo-600">
          BookVerse 📚
        </h1>

        <div className="flex gap-6">
          <Link to="/" className="hover:text-indigo-600">
            Home
          </Link>

          <Link to="/explore" className="hover:text-indigo-600">
            Explore
          </Link>

          <Link to="/register" className="hover:text-indigo-600">
            Register
          </Link>

          <Link to="/login" className="hover:text-indigo-600">
            Login
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center py-24 px-6">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Discover, Review &
          <span className="text-indigo-600"> Share Books</span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg text-gray-600">
          Join a community of readers. Write reviews, discover new books,
          share your thoughts, and connect with fellow book lovers.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/explore"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition"
          >
            Explore Reviews
          </Link>

          <Link
            to="/register"
            className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg hover:bg-indigo-50 transition"
          >
            Sign Up
          </Link>
        </div>
      </section>

      {/* Featured Reviews */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <h2 className="text-3xl font-bold text-center mb-10">
          Featured Reviews
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition">
            <h3 className="font-bold text-xl mb-3">
              Dune Review
            </h3>

            <p className="text-gray-600">
              A masterpiece of science fiction with incredible world-building
              and unforgettable characters.
            </p>

            <p className="mt-4 text-indigo-600 font-semibold">
              — Rahul Sharma
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition">
            <h3 className="font-bold text-xl mb-3">
              Atomic Habits
            </h3>

            <p className="text-gray-600">
              Practical, easy to understand and packed with advice that can
              change your daily routine.
            </p>

            <p className="mt-4 text-indigo-600 font-semibold">
              — Priya Das
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition">
            <h3 className="font-bold text-xl mb-3">
              The Hobbit
            </h3>

            <p className="text-gray-600">
              A timeless fantasy adventure that introduces readers to a magical
              world.
            </p>

            <p className="mt-4 text-indigo-600 font-semibold">
              — Aman Verma
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-white py-20">
        <h2 className="text-3xl font-bold text-center mb-10">
          Browse Categories
        </h2>

        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 px-6">
          <div className="bg-indigo-100 p-6 rounded-xl text-center font-semibold">
            Fantasy
          </div>

          <div className="bg-pink-100 p-6 rounded-xl text-center font-semibold">
            Romance
          </div>

          <div className="bg-green-100 p-6 rounded-xl text-center font-semibold">
            Self Help
          </div>

          <div className="bg-yellow-100 p-6 rounded-xl text-center font-semibold">
            Mystery
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white text-center py-8 mt-20">
        <h2 className="text-xl font-bold">
          BookVerse 📚
        </h2>

        <p className="text-gray-400 mt-2">
          Discover. Review. Share.
        </p>
      </footer>
    </div>
  );
}