import React, { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import Scrollspy from 'react-scrollspy'

function Banner() {
  const [isOpen, setIsOpen] = useState(false);
  const [navBarBg, showNavBarBg] = useState(false);
  
  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      showNavBarBg(true);
    } else {
      showNavBarBg(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);
    return () => {
      window.removeEventListener("scroll", transitionNavBar);
    };
  }, []);

  return (
    <>
      <div
      id='home'
        style={{
          backgroundSize: "cover",
          
          backgroundPosition: "center center",
          backgroundImage: `url('../images/bg_1.jpg')`,
        }}
      >
        {/* nav bar*/}

       
        <nav
          className={`nav_animation fixed w-full z-50 text-white ${
            navBarBg && "dark:bg-gray-900 bg-gray-100 shadow-lg dark:text-gray-400 text-gray-800"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-12">
              <div className="flex items-center">
                <div className="flex-shrink-0 absolute left-2">
                  <a href="/"><img className="h-10 w-10" src="./logo.png" alt="Workflow" /></a>
                </div>
                <div className="hidden md:block right-2 absolute">
                  <div className="ml-10 flex items-center space-x-4 main_font">
                  <Scrollspy items={['home','puppies','products','services','contact']} currentClassName="text-gray-700 border-b-2 border-gray-600">
                    <a
                      href="#home"
                      className={`px-3 py-2  text-sm font-semibold transform duration-200 hover:scale-105`}
                    >
                      Home
                    </a>

                    <a
                      href="#puppies"

                      className={`px-3 py-2  text-sm font-semibold transform duration-200 hover:scale-105`}
                    >
                   Puppies
                    </a>

                    <a
                      href="#products"

                      className={`px-3 py-2  text-sm font-semibold transform duration-200 hover:scale-105`}
                    >
                      Products
                    </a>

                    <a
                      href="#services"

                      className={`px-3 py-2  text-sm font-semibold transform duration-200 hover:scale-105`}
                    >
                      Services
                    </a>

                    {/* <a
                      href="#gallery"

                      className={`px-3 py-2  text-sm font-semibold transform duration-200 hover:scale-105 ${activeMenu==='gallery' && 'text-gray-700 border-b-2 border-gray-600'}`}
                    >
                      Gallery
                    </a> */}

                    <a
                      href="#contact"

                      className={`px-3 py-2  text-sm font-semibold`}
                    >
                     Contact
                    </a>
                    </Scrollspy>
                  </div>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  type="button"
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-700 focus:outline-non"
                  aria-controls="mobile-menu"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>
                  {!isOpen ? (
                    <svg
                      className="block h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="block h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          <Transition
            show={isOpen}
            enter="transition ease-out duration-100 transform"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-75 transform"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            {(ref) => (
              <div
                className={`md:hidden max-w-md mx-auto dark:bg-gray-900 bg-gray-100 text-center rounded-md ${navBarBg && 'h-screen'}`}
                id="mobile-menu"
              >
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 main_font">
                  <a
                    href="#home"
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-gray-400 font-semibold hover:text-gray-700 block px-3 py-2"
                  >
                  Home
                  </a>

                  <a
                    href="#puppies"
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-gray-400 font-semibold hover:text-gray-700 block px-3 py-2"
                  >
                  Puppies
                  </a>

                  <a
                    href="#products"
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-gray-400 font-semibold hover:text-gray-700 block px-3 py-2"
                  >
                    Products
                  </a>

                  <a
                    href="#services"
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-gray-400 font-semibold hover:text-gray-700 block px-3 py-2"
                  >
                  Services
                  </a>

                  {/* <a
                    href="#gallery"
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-gray-400 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium"
                  >
                Gallery
                  </a> */}

                  <a
                    href="#contact"
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-gray-400 font-semibold hover:text-gray-700 block px-3 py-2"
                  >
                  Contact
                  </a>
                </div>
              </div>
            )}
          </Transition>
        </nav>


        {/* banner text */}
        <div data-aos="fade-up">
          <h1 className="md:text-left lg:text-6xl text-5xl font-extrabold banner_main_font text-gray-300 text-center pt-72 p-5 leading-normal">
            buy your <span className="text-gray-800 underline">perfect</span> one
          </h1>
          <h3 className="md:text-left lg:text-xl lg:mt-1 text-center font-semibold text-gray-700 text-lg banner_sub_font p-5 -mt-5">
            High breed labrador puppies and stud services.
          </h3>
        </div>
        <div className="flex items-end justify-end max-w-36 opacity-0 sm:opacity-100 ">
        <svg className='fill-current dark:text-gray-900 text-gray-100' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill-opacity="1" d="M0,32L48,58.7C96,85,192,139,288,170.7C384,203,480,213,576,218.7C672,224,768,224,864,202.7C960,181,1056,139,1152,138.7C1248,139,1344,181,1392,202.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
        </div>
      </div>
    </>
  );
}

export default Banner;
