import React from "react";
import useClipboard from "react-use-clipboard";
import Aos from "aos";
import "aos/dist/aos.css"
Aos.init({ once: true})

function Contact() {

  const [numberCopy, numberCopied] = useClipboard("8078316689", {
    successDuration: 1000,
  });

  const [textCopy, textCopied] = useClipboard("Kozhichal,Cherupuzha,Kannur", {
    successDuration: 1000,
  });

  return (
    <div id="contact" className=' text-gray-500 dark:text-gray-600'>
      <div className="text-gray-700 flex w-full items-center overflow-hidden relative pl-4 pt-3">
        <h1 className="heading_font font-bold text-2xl mb-5">
          Contact Me
          <span className="w-full md:w-1/2 h-0.5 mt-4 ml-3  absolute bg-gray-700"></span>
        </h1>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center mt-6 mb-20">
        <div data-aos="fade-up"  data-aos-duration="2000">
          <div className="max-w-md  mx-auto mb-10 flex items-center">
            {/* whats app icon with hover effects */}
            <div className="copy_icon">
            <a
              href='https://api.whatsapp.com/send?phone=918078316689&text=%F0%9F%91%8BAbin%2C%20I%20am'
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bg-gray-300 text-gray-500 hover:text-gray-900 dark:bg-gray-800 dark:text-gray-600 dark:hover:text-gray-500 cursor-pointer transform duration-500  text-2xl rounded-full px-2.5 py-1 fab fa-whatsapp"></i>
            </a>
              <div className="copy_items hidden">
                <p className="dark:bg-gray-500 dark:text-gray-800 bg-gray-900 text-gray-100 absolute -mt-20 -ml-5 p-1 rounded-lg main_font ">
                  start chat
                </p>
                <i className="absolute -mt-16 ml-4 dark:text-gray-500 text-gray-900 text-lg fas fa-sort-down"></i>
              </div>
            </div>
            {/* whats app icon with hover effects closed */}
{/* whats app number with hover effects */}
            <div className="copy_icon">
            <h1 onClick={numberCopied} className="dark:hover:text-gray-500 hover:text-gray-800 ml-4 cursor-pointer duration-500 font-semibold main_font text-lg">
              +91 8078 316689
            </h1>
              <div className="copy_items hidden">
              <p
                    className={`dark:bg-gray-500 dark:text-gray-800 bg-gray-900 text-gray-100 main_font -mt-16 ml-12 absolute p-1  rounded-lg w-101 ${
                      numberCopy && "w-130"
                    }`}
                  >
                    {numberCopy ? "number copied !" : "click to copy"}
                  </p>
                <i className="absolute -mt-12 ml-24 dark:text-gray-500 text-gray-900 text-lg fas fa-sort-down"></i>
              </div>
            </div>
    {/* whats app number with hover effects closed */}
          </div>
          <div className="max-w-md mx-auto mb-10 flex items-center">
                     {/* location icon with hover effects */}
          <div className="copy_icon">
              <a href="https://www.google.com/maps/dir//Kadumeni,+Kerala+670511/@12.2935781,75.3439402,18.88z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3ba45df42f6550ab:0xaa8ae0c49c4a98e5!2m2!1d75.3441329!2d12.293158?hl=en"
               target="_blank"
               rel="noopener noreferrer"
              >
              <i className="bg-gray-300 text-gray-500 hover:text-gray-900 dark:bg-gray-800 dark:text-gray-600 dark:hover:text-gray-500 cursor-pointer transform duration-500  text-2xl rounded-full px-12px py-1 fas fa-map-marker-alt"></i>
              </a>
              <div className="copy_items hidden">
                <p className="dark:bg-gray-500 dark:text-gray-800 bg-gray-900 text-gray-100 absolute -mt-20 -ml-4 p-1 rounded-lg main_font ">
                  start ride
                </p>
                <i className="absolute -mt-16 ml-4 dark:text-gray-500 text-gray-900 text-lg fas fa-sort-down"></i>
              </div>
            </div>
    {/* location icon with hover effects closed */}
    {/* location text with hover effects */}
    <div className="copy_icon">
            <h1 onClick={textCopied} className="dark:hover:text-gray-500 hover:text-gray-800 ml-4 cursor-pointer duration-500 font-semibold main_font text-lg">
            Kozhichal,Cherupuzha,Kannur.
            </h1>
              <div className="copy_items hidden">
              <p
                    className={`dark:bg-gray-500 bg-gray-900 dark:text-gray-800 text-gray-100 main_font -mt-16 ml-12 absolute p-1  rounded-lg w-101 ${
                      textCopy && "w-101"
                    }`}
                  >
                    {textCopy ? "text copied !" : "click to copy"}
                  </p>
                <i className="absolute -mt-12 ml-24 dark:text-gray-500 text-gray-900 text-lg fas fa-sort-down"></i>
              </div>
            </div>
         
          </div>
        </div>
        <div data-aos="fade-up"  data-aos-duration="2000" className="md:dark:bg-gray-800 md:bg-gray-200 w-full p-1 md:p-0 md:w-1/2 md:ml-5 h-72 rounded-2xl">
          <iframe title='location'
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31186.407930541598!2d75.32735078392618!3d12.295505696041236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba45df42f6550ab%3A0xaa8ae0c49c4a98e5!2sKadumeni%2C%20Kerala%20670511!5e0!3m2!1sen!2sin!4v1626659090902!5m2!1sen!2sin"
            className="w-full h-full rounded-2xl md:transform md:translate-x-3 md:translate-y-3"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default Contact;
