import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer style={{ background: "#111827", color: "#fff" }}>
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-4 gap-10">

          <div>
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold" style={{ color: "#34d399" }}>
              <span
                className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white"
                style={{ background: "#059669" }}
              >
                F
              </span>
              FreshMart
            </Link>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: "#9ca3af" }}>
              Your trusted partner for fresh, high-quality groceries delivered right to your doorstep.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-4">Company</h3>
            <ul className="space-y-3 text-sm" style={{ color: "#9ca3af" }}>
              <li className="cursor-pointer hover:text-emerald-400 transition-colors">About Us</li>
              <li className="cursor-pointer hover:text-emerald-400 transition-colors">Contact</li>
              <li className="cursor-pointer hover:text-emerald-400 transition-colors">Careers</li>
              <li className="cursor-pointer hover:text-emerald-400 transition-colors">Blog</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Support</h3>
            <ul className="space-y-3 text-sm" style={{ color: "#9ca3af" }}>
              <li className="cursor-pointer hover:text-emerald-400 transition-colors">Help Center</li>
              <li className="cursor-pointer hover:text-emerald-400 transition-colors">Privacy Policy</li>
              <li className="cursor-pointer hover:text-emerald-400 transition-colors">Terms &amp; Conditions</li>
              <li className="cursor-pointer hover:text-emerald-400 transition-colors">Refund Policy</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Follow Us</h3>
            <div className="flex gap-3">
              {[
                { icon: <FaFacebook />, hoverBg: "#1877f2" },
                { icon: <FaInstagram />, hoverBg: "#e1306c" },
                { icon: <FaTwitter />, hoverBg: "#1da1f2" },
              ].map((social, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5 text-lg"
                  style={{ background: "#1f2937" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = social.hoverBg;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#1f2937";
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            <div className="mt-6">
              <p className="text-sm mb-2" style={{ color: "#9ca3af" }}>Download the App</p>
              <div className="flex gap-2">
                <span
                  className="text-xs px-3 py-2 rounded-lg cursor-pointer transition-colors"
                  style={{ background: "#1f2937", color: "#d1d5db" }}
                >
                  🍎 App Store
                </span>
                <span
                  className="text-xs px-3 py-2 rounded-lg cursor-pointer transition-colors"
                  style={{ background: "#1f2937", color: "#d1d5db" }}
                >
                  ▶️ Google Play
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div style={{ borderTop: "1px solid #1f2937" }}>
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-sm" style={{ color: "#6b7280" }}>
            © 2026 FreshMart. All Rights Reserved.
          </p>
          <div className="flex gap-6 text-sm" style={{ color: "#6b7280" }}>
            <span className="hover:text-emerald-400 transition-colors cursor-pointer">Privacy</span>
            <span className="hover:text-emerald-400 transition-colors cursor-pointer">Terms</span>
            <span className="hover:text-emerald-400 transition-colors cursor-pointer">Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;