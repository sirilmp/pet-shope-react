import React from "react";

function Footer() {
  return (
    <div className='text-gray-800 dark:text-gray-700'>
      <div className="w-1/2 h-0.5 mx-auto bg-gray-700" />
      <h1 className="text-center mb-2 mt-7 font-light text-sm  main_font">
        copyright &#169; 2021,all rights reserved
      </h1>
      <h1 className="text-right mr-2 main_font text-xs dark:text-gray-700">
        developed by{" "}
        <a
          href="https://sirilmp.online/"
          target="_blank"
          rel="noopener noreferrer"
          className="signature_font cursor-pointer dark:hover:text-gray-50"
        >
          siril
        </a>
      </h1>
    </div>
  );
}

export default Footer;
