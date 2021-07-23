import React, { useEffect, useState } from "react";
import firebase, { db } from "./Firebase";
import GalleryVideo from "./GalleryVideo";

function VideoGallery() {
  const [displayData, setDisplayData] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    setLoading(true);
    firebase
      .database()
      .ref(`galleryVideoDetails`).orderByChild("timeStamp")
      .on("value", (snapshot) => {
        let allIVideos = [];
        snapshot.forEach((snap) => {
          var key = snap.key;
          // console.log(key);
          var items = snap.val();
          //console.log(items);
          allIVideos.push({
            key: key,
            url: items.url,
          });
        });

        setDisplayData(allIVideos);
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
              Sorry no video(s) now !
            </h1>
          ) : (
            <>
              {displayData.map((video) => (
                <GalleryVideo videoUrl={video} />
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default VideoGallery; 
//  <iframe className='max-w-min rounded-lg' width="560" height="315" src="https://www.youtube-nocookie.com/embed/vT1Q2VK_L1g?rel=0&modestbranding=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>