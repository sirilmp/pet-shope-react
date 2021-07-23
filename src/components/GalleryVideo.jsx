import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import firebase from "./Firebase";

function GalleryVideo({ videoUrl }) {
  const admin = useSelector(selectUser);

  const deleteData = (e) => {
    e.preventDefault();
    // console.log(videoUrl.key);
    firebase.database().ref(`galleryVideoDetails/${videoUrl.key}`).remove();
  };

  return (
    <>
      <div className="overflow-hidden">
        <div className=" bg-gray-500 rounded-lg max-w-2xl mb-8">
        {admin ? (
            <div className="absolute">
              <i
                onClick={deleteData}
                className="ml-4 mt-2 mr-16 text-red-400 hover:text-red-600 transform duration-500 cursor-pointer text-2xl fas fa-trash-alt"
              ></i>
            </div>
          ) : null}
          <iframe
            className="max-w-min rounded-lg"
            width="590"
            height="305"
            src={`https://www.youtube-nocookie.com/embed/${videoUrl.url}?rel=0&modestbranding=1`}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
            allowfullscreen="true"
          ></iframe>
          
        </div>
      </div>
    </>
  );
}

export default GalleryVideo;
