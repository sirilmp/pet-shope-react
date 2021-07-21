import React from "react";


function About() {
  return (
    <div className="dark:bg-gray-900 bg-gray-100 text-gray-600 z-0">
       <div className='flex w-full items-center overflow-hidden relative pl-4'>
       <h1 className="heading_font font-bold text-3xl mb-5 select-none">
          About <span className='w-full md:w-1/2 h-0.5 mt-4 ml-3  absolute bg-gray-700'></span>
        </h1>
       </div>
      <div className=' max-w-full mx-auto text-center '>
          <img data-aos="fade-up"
     data-aos-duration="3000"  src="../images/dots.png" className='absolute -left-2 mt-28 md:mt-32' alt="" />
      <img data-aos="fade-up"
     data-aos-duration="3000"  src="../images/dots.png" className='absolute right-52 -mt-28' alt="" />
        <h6 >
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi
          inventore aliquid voluptatibus facilis voluptates perferendis odio
          repellendus cum enim! Nostrum!
        </h6>
      </div>
    </div>
  );
}

export default About;
