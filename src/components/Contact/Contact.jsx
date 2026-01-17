import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import photo from "../../assets/81632a31-7890-469a-b2db-bc15edaeb77f.png";

export default function Contact() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_rznt59k",
        "template_r1u6dl8",
        form.current,
        "AnLm6kBmsRocem_qo"
      )
      .then(
        (result) => {
          alert("Message sent successfully!");
          form.current.reset();
        },
        (error) => {
          alert("Something went wrong. Please try again.");
        }
      );
  };

  return (
    <div className="bg-brandblue min-h-screen flex flex-col md:flex-row pt-10">
      <div className="w-full md:w-1/2 flex justify-center items-center p-6 md:p-0">
        <img
          src={photo}
          alt="weather contact"
          className="w-[70%] md:w-[47%] max-w-md rounded-xl"
        />
      </div>

      <div className="w-full md:w-1/2 text-white flex justify-center md:justify-end items-start md:items-center p-6">
        <div className="flex flex-col items-start w-full md:w-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>

          <div className="border-t border-l border-white/40 p-6 md:p-8 w-full md:w-auto">
            <form ref={form} onSubmit={sendEmail} className="w-full md:w-auto">
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    name="user_name"
                    className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-white/40 appearance-none focus:outline-none focus:border-active peer"
                    placeholder=" "
                    required
                  />
                  <label className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Full Name
                  </label>
                </div>

                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="email"
                    name="user_email"
                    className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-white/40 appearance-none focus:outline-none focus:border-active peer"
                    placeholder=" "
                    required
                  />
                  <label className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Email
                  </label>
                </div>
              </div>

              <div className="relative z-0 w-full mb-5 group">
                <textarea
                  name="message"
                  rows="4"
                  className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-white/40 appearance-none focus:outline-none focus:border-active peer resize-none"
                  placeholder=" "
                  required
                />
                <label className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Message
                </label>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-8 text-lg ">
                <button className="bg-active whitespace-nowrap  px-10 py-2 rounded-full hover:animate-pulse-glow-large mt-6">
                  Send Message
                </button>
                <div className="translate-y-[50%] flex gap-5">
                  <a
                    target="_blank"
                    href="https://www.instagram.com/web_site_creator?igsh=bHlrcHh5c2lmdWJp&utm_source=qr"
                  >
                    <i className="fa-brands fa-instagram" />
                  </a>
                  <a
                    target="_blank"
                    href="https://www.linkedin.com/in/mohannad-shaaban-59b47b371/"
                  >
                    <i className="fa-brands fa-linkedin" />
                  </a>
                  <a target="_blank" href="https://github.com/mohannad-shaaabn">
                    <i className="fa-brands fa-github" />
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
