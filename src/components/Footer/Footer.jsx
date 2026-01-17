import { useState, useEffect } from "react";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const notyf = new Notyf();

  useEffect(() => {
    const subscribed = localStorage.getItem("subscribed");
    if (subscribed) {
      setIsSubscribed(true);
    }
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;

    localStorage.setItem("subscribed", "true");
    setIsSubscribed(true);
    notyf.success("تمت العملية بنجاح!");
    setEmail("");
  };

  const socialLinks = [
    { name: "instagram", url: "https://www.instagram.com/web_site_creator?igsh=bHlrcHh5c2lmdWJp&utm_source=qr" },
    { name: "linkedin", url: "https://www.linkedin.com/in/mohannad-shaaban-59b47b371/" },
    { name: "github", url: "https://github.com/mohannad-shaaabn" },
  ];

  return (
    <footer className="bg-[#262936] text-white py-12">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Subscribe Form */}
          <div className="w-full md:w-2/3">
            {isSubscribed ? (
              <p className="text-active font-semibold">
                You are already subscribed!
              </p>
            ) : (
              <form onSubmit={handleSubscribe}>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email to subscribe..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-4 pr-32 rounded-full text-sm text-gray-900 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-active text-white px-5 py-2 rounded-full text-sm hover:opacity-90 transition"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Social Icons */}
          <div className="flex gap-4 justify-center md:justify-end w-full md:w-1/3">
            {socialLinks.map((icon, index) => (
              <a
                key={index}
                href={icon.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center bg-brandblue text-blue-500 rounded-full hover:bg-active hover:text-white transition cursor-pointer"
              >
                <i className={`fa-brands fa-${icon.name}`}></i>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Text */}
        <div className="mt-8 text-center md:text-left">
          <p className="text-sm text-gray-400">
            © 2025 Mohannad Shaaban. Designed by Themezy. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
