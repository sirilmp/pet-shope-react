import React, { useEffect, useState } from "react";
import firebase from "./Firebase";
import StudServiceCard from "./StudServiceCard";



function StudServiceCards() {
  const [displayData, setDisplayData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    firebase
      .database()
      .ref(`studDogDetails`).orderByChild("timeStamp")
      .on("value", (snapshot) => {
        let allStudDogs = [];
        snapshot.forEach((snap) => {
          var key = snap.key;
          // console.log(key);
          var items = snap.val();
          console.log(items);
          allStudDogs.push({
            key: key,
            dog_name: items.dog_name,
            offer_price: items.offer_price,
            actual_price: items.actual_price,
            description: items.description,
            url: items.url,
          });
          // console.log('loading',1+1,allStudDogs);

          // console.log(allStudDogs);
        });
        //console.log(allStudDogs);
        setDisplayData(allStudDogs);
        setLoading(false);
      });
  }, []);

  return (
    <div id="services" className="pt-16 mt-1"
    data-aos="fade-up"
    data-aos-duration="3000"
    >
      <div className="text-gray-700 flex w-full items-center overflow-hidden relative pl-4">
        <h1 className="heading_font font-bold text-2xl mb-5 select-none">
          Stud Services{" "}
          <span className="w-full md:w-1/2 h-0.5 mt-4 ml-3  absolute bg-gray-700"></span>
        </h1>
      </div>

      {loading ? (
        <>
      <div className='m-2 flex justify-center mb-8'>
      <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      </div>
        </>
      ) : (
        <>
          {!displayData.length ? (
            <>
              <h1 className="text-center p-5 pb-10 text-gray-700 main_font font-semibold text-lg">
                Sorry no stud services available now !
              </h1>
            </>
          ) : (
            <>
              <div className="flex overflow-x-scroll products_scrollbar items-end p-5">
                {displayData.map((studDogDetails) => (
                  <div key={studDogDetails.key}>
                    <StudServiceCard studDogDetails={studDogDetails} />
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default StudServiceCards;
