import Link from "next/link";

export default function Banner() {
  return (
    <section
      className="relative min-h-[85vh] flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=1920&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white mb-6">
          🎨 Welcome to ArtHub
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight">
          Discover & Buy
          <span className="block text-orange-400 mt-2">
            Original Artworks
          </span>
        </h1>

        {/* Description */}
        <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-gray-200">
          Explore unique paintings, digital art, illustrations, sculptures,
          and creative masterpieces from talented artists worldwide.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/browse-artworks"
            className="px-8 py-4 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-all duration-300"
          >
            Browse Artworks
          </Link>

          <Link
            href="/register"
            className="px-8 py-4 rounded-lg border border-white text-white hover:bg-white hover:text-black font-semibold transition-all duration-300"
          >
            Join as Artist
          </Link>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-5xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-6">
            <h3 className="text-3xl font-bold text-white">500+</h3>
            <p className="text-gray-300 mt-2">Artworks Listed</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-6">
            <h3 className="text-3xl font-bold text-white">150+</h3>
            <p className="text-gray-300 mt-2">Talented Artists</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-6">
            <h3 className="text-3xl font-bold text-white">1K+</h3>
            <p className="text-gray-300 mt-2">Happy Buyers</p>
          </div>
        </div>
      </div>
    </section>
  );
}