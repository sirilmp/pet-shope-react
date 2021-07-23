import React, { useEffect, useState } from "react";
import firebase from "./Firebase";
import GalleryImage from "./GalleryImage";

function GalleryImages() {
  const [displayData, setDisplayData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    firebase
      .database()
      .ref(`galleryImageDetails`).orderByChild("timeStamp")
      .on("value", (snapshot) => {
        let allImages = [];
        snapshot.forEach((snap) => {
          var key = snap.key;
          // console.log(key);
          var items = snap.val();
          //console.log(items);
          allImages.push({
            key: key,
            url: items.url,
          });
        });

        setDisplayData(allImages);
        setLoading(false);
      });
  }, []);

  return (
    <div className="mt-8 flex flex-wrap justify-evenly  p-3">
      {loading ? (
        <div className="m-2 flex justify-center mb-8">
          <div class="lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        <>
          {!displayData.length ? (
            <h1 className="text-center p-5 text-gray-700 main_font font-semibold text-lg">
              Sorry no images now !
            </h1>
          ) : (
            <>
              {displayData.map((image) => (
                <GalleryImage imageUrl={image} />
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default GalleryImages;
//className='mt-8 grid place-items-center gap-1 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-6'
