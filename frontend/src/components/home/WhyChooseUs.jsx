import {
  FaTruck,
  FaLeaf,
  FaCreditCard,
  FaTags,
} from "react-icons/fa";

const features = [
  {
    icon: <FaLeaf size={24} />,
    title: "Fresh Products",
    desc: "Farm fresh groceries delivered daily to your doorstep.",
    bg: "#ecfdf5",
    iconColor: "#059669",
  },
  {
    icon: <FaTruck size={24} />,
    title: "Fast Delivery",
    desc: "Lightning-fast delivery within 30 minutes.",
    bg: "#eff6ff",
    iconColor: "#2563eb",
  },
  {
    icon: <FaCreditCard size={24} />,
    title: "Secure Payment",
    desc: "100% safe and encrypted online payments.",
    bg: "#faf5ff",
    iconColor: "#7c3aed",
  },
  {
    icon: <FaTags size={24} />,
    title: "Best Prices",
    desc: "Unbeatable prices and daily exclusive offers.",
    bg: "#fffbeb",
    iconColor: "#d97706",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20" style={{ background: "#fff" }}>
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">
          <span style={{ color: "#059669", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Our Benefits
          </span>
          <h2 className="text-4xl font-bold mt-2 text-gray-900">
            Why Choose FreshMart?
          </h2>
          <p className="text-gray-500 mt-3 max-w-lg mx-auto text-center">
            We're committed to delivering the freshest groceries with the best service
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl p-8 text-center transition-all duration-300 hover:-translate-y-1 group cursor-pointer"
              style={{
                background: "#fff",
                border: "1px solid #f3f4f6",
                boxShadow: "none",
                textAlign: "center",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 20px 40px -8px rgba(0,0,0,0.1)";
                e.currentTarget.style.borderColor = "transparent";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.borderColor = "#f3f4f6";
              }}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
                style={{ background: feature.bg, color: feature.iconColor, margin: "0 auto 1.25rem auto" }}
              >
                {feature.icon}
              </div>

              <h3 className="font-bold text-xl text-gray-800">
                {feature.title}
              </h3>

              <p className="text-gray-500 mt-3 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;