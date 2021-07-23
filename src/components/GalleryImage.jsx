import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import firebase, { storage } from "./Firebase";

function GalleryImage({ imageUrl }) {
  const admin = useSelector(selectUser);

  const deleteData = (e) => {
    e.preventDefault();
    // console.log(imageUrl.key);
    let imageRef = storage.refFromURL(imageUrl.url);
    imageRef.delete();
    firebase.database().ref(`galleryImageDetails/${imageUrl.key}`).remove();
  };

  return (
    <>
      <div className="overflow-hidden">
        <div
          className="mb-4 bg-gray-500 rounded-lg w-72 max-w-2xl h-72"
          style={{
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundImage: `url(${imageUrl.url})`,
          }}
        >
          {admin ? (
            <div className="absolute">
              <i
                onClick={deleteData}
                className="ml-4 mt-2 mr-16 text-red-400 hover:-translate-y-1 hover:text-red-600 transform duration-500 cursor-pointer text-2xl fas fa-trash-alt"
              ></i>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default GalleryImage;
