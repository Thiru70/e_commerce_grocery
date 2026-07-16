import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 50%, #a7f3d0 100%)" }}
    >
      {/* Decorative background circles */}
      <div className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full blur-3xl" style={{ background: "rgba(16, 185, 129, 0.15)" }} />
      <div className="absolute bottom-[-50px] left-[-80px] w-[300px] h-[300px] rounded-full blur-3xl" style={{ background: "rgba(5, 150, 105, 0.12)" }} />

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Left Side */}
          <div className="slide-up">
            <span
              className="inline-block px-4 py-2 rounded-full text-sm font-semibold tracking-wide"
              style={{ background: "#d1fae5", color: "#047857" }}
            >
              🥬 Fresh &amp; Organic
            </span>

            <h1 className="text-5xl lg:text-6xl font-bold mt-6 leading-tight text-gray-900">
              Fresh Groceries
              <br />
              <span className="text-emerald-600">Delivered to</span>
              <br />
              Your Doorstep
            </h1>

            <p className="text-gray-600 mt-6 text-lg leading-relaxed max-w-md">
              Order vegetables, fruits, dairy products,
              snacks and daily essentials with fast and
              reliable delivery.
            </p>

            <div className="mt-8 flex gap-4 flex-wrap">
              <Link
                to="/products"
                className="text-white px-8 py-3.5 rounded-xl font-semibold transition-all duration-300 hover:-translate-y-0.5 pulse-glow"
                style={{
                  background: "linear-gradient(135deg, #059669, #047857)",
                  boxShadow: "0 10px 30px -5px rgba(5, 150, 105, 0.4)",
                }}
              >
                Shop Now →
              </Link>

              <Link
                to="/products"
                className="px-8 py-3.5 rounded-xl font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:text-white"
                style={{
                  border: "2px solid #059669",
                  color: "#059669",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#059669";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#059669";
                }}
              >
                Browse Categories
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="mt-10 flex items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ background: "#10b981" }} />
                Free Delivery
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ background: "#10b981" }} />
                Fresh Guarantee
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ background: "#10b981" }} />
                24/7 Support
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex justify-center">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=80"
                alt="Fresh Grocery"
                className="rounded-3xl w-full max-w-lg object-cover"
                style={{
                  boxShadow: "0 25px 60px -12px rgba(0, 0, 0, 0.2)",
                  aspectRatio: "4/3",
                }}
              />
              {/* Floating badge - delivery */}
              <div
                className="absolute -bottom-4 -left-4 rounded-2xl px-5 py-3 flex items-center gap-3"
                style={{
                  background: "#fff",
                  boxShadow: "0 10px 40px -5px rgba(0,0,0,0.15)",
                }}
              >
                <span className="text-3xl">🚚</span>
                <div>
                  <p className="font-bold text-sm text-gray-800">Fast Delivery</p>
                  <p className="text-xs text-gray-500">Within 30 mins</p>
                </div>
              </div>
              {/* Floating badge - discount */}
              <div
                className="absolute -top-4 -right-4 rounded-2xl px-4 py-2.5 text-center text-white"
                style={{
                  background: "linear-gradient(135deg, #059669, #047857)",
                  boxShadow: "0 8px 25px -3px rgba(5,150,105,0.4)",
                }}
              >
                <p className="text-xl font-bold">50%</p>
                <p className="text-xs font-medium" style={{ marginTop: "-2px" }}>OFF</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;