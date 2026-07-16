import { FaStar, FaQuoteLeft } from "react-icons/fa";

const reviews = [
  {
    name: "Rahul S.",
    review: "Excellent quality vegetables and super fast delivery. The freshness is unmatched!",
    avatar: "RS",
    role: "Regular Customer",
  },
  {
    name: "Priya M.",
    review: "Best grocery app I've ever used. The UI is clean and ordering is seamless.",
    avatar: "PM",
    role: "Premium Member",
  },
  {
    name: "Arun K.",
    review: "Affordable prices and fresh fruits every time. Highly recommended to everyone!",
    avatar: "AK",
    role: "Verified Buyer",
  },
];

const Testimonials = () => {
  return (
    <section
      className="py-20"
      style={{ background: "linear-gradient(180deg, #f9fafb 0%, #f3f4f6 100%)" }}
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">
          <span style={{ color: "#059669", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Testimonials
          </span>
          <h2 className="text-4xl font-bold mt-2 text-gray-900">
            What Our Customers Say
          </h2>
          <p className="text-gray-500 mt-3 max-w-md mx-auto">
            Trusted by thousands of happy customers across the city
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="rounded-2xl p-8 relative group transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "#fff",
                border: "1px solid #f3f4f6",
                boxShadow: "0 4px 15px -3px rgba(0,0,0,0.06)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 20px 40px -8px rgba(0,0,0,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 15px -3px rgba(0,0,0,0.06)";
              }}
            >
              {/* Quote icon - positioned behind content */}
              <FaQuoteLeft
                className="absolute top-6 right-6 opacity-[0.07] text-5xl"
                style={{ color: "#059669" }}
              />

              <div className="flex items-center gap-1 text-lg" style={{ color: "#f59e0b" }}>
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>

              <p className="mt-5 text-gray-600 leading-relaxed relative z-10">
                &ldquo;{review.review}&rdquo;
              </p>

              <div className="mt-6 flex items-center gap-3 pt-5" style={{ borderTop: "1px solid #f3f4f6" }}>
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm text-white"
                  style={{ background: "linear-gradient(135deg, #059669, #047857)" }}
                >
                  {review.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-sm">
                    {review.name}
                  </h4>
                  <p className="text-xs text-gray-400">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;