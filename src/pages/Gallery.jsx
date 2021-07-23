import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import GalleryImages from "../components/GalleryImages";
import GalleryVideos from "../components/GalleryVideos";

function Gallery() {
  const [active, setActive] = useState(true);

  const history=useHistory()

  const backToHome=(e)=>{
    e.preventDefault()
    history.push("/#home")
  }

  const activeMenu = () => {
    setActive(!active);
  };

  return (
    <>
      <div id="gallery">
        <div className='fixed top-1/2 right-5'> 
          <i onClick={backToHome} className='fas fa-arrow-circle-left dark:text-gray-100 text-3xl opacity-90 duration-200 cursor-pointer hover:opacity-100'></i>
        </div>
        <div className="flex flex-row p-2 main_font font-semibold dark:text-gray-600 bg-gray-100 sticky top-0 dark:bg-gray-900 z-50">
          <h1
            onClick={activeMenu}
            className={`ml-5 mr-5 mt-3 mb-3 border-2 border-transparent cursor-pointer dark:hover:bg-gray-800 dark:bg-gray-700 bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded-md ${
              active && "dark:bg-gray-800 bg-gray-300 border-gray-700"
            }`}
          >
            Images
          </h1>
          <h1
            onClick={activeMenu}
            className={`ml-5 mr-5 mt-3 mb-3 border-2 border-transparent cursor-pointer dark:hover:bg-gray-800 dark:bg-gray-700 bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded-md ${
              !active && "dark:bg-gray-800 bg-gray-300 border-gray-700"
            }`}
          >
            Videos
          </h1>
        </div>
        {active ? <GalleryImages /> : <GalleryVideos />}
      </div>
    </>
  );
}

export default Gallery;
