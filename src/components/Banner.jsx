import React from "react";
import Navbar from "./Navbar";

function Banner() {

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

       
        <Navbar/>


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
