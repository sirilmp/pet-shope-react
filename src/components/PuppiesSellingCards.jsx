import React, { useEffect, useState } from "react";
import PuppiesSellingCard from "./PuppiesSellingCard";
import firebase from "./Firebase";


function PuppiesSellingCards() {
  const [displayData, setDisplayData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    firebase
      .database()
      .ref(`puppiesDetails`).orderByChild("timeStamp")
      .on("value", (snapshot) => {
        let allPuppiesData = [];
        snapshot.forEach((snap) => {
          var key = snap.key;
          // console.log(key);
          var items = snap.val();
          console.log(items);
          allPuppiesData.push({
            key: key,
            breed_name: items.breed_name,
            father_name: items.father_name,
            mother_name: items.mother_name,
            offer_price: items.offer_price,
            actual_price: items.actual_price,
            age: items.age,
            url: items.url,
          });
          // console.log('loading',1+1,allPuppiesData);

          // console.log(allPuppiesData);
        });
        console.log(allPuppiesData);
        setDisplayData(allPuppiesData);
        setLoading(false);
      });
  }, []);

  return (
    <div id='puppies' className='pt-12' data-aos="fade-up"
    data-aos-duration="3000">
             <div className='text-gray-700 flex w-full items-center overflow-hidden relative pl-4'>
       <h1 className="heading_font font-bold text-2xl mb-5 select-none">
       Puppies for Sell <span className='w-full md:w-1/2 h-0.5 mt-4 ml-3  absolute bg-gray-700'></span>
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
            <h1 className="text-center p-5 text-gray-700 main_font font-semibold text-lg">
              Sorry no puppies available now !
            </h1>
          ) : (
            <>
              <div className="flex overflow-x-scroll products_scrollbar p-5">
                {displayData.map((puppiesDetails) => (
                  <div key={puppiesDetails.key}>
                    <PuppiesSellingCard puppiesDetails={puppiesDetails} />
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

export default PuppiesSellingCards;
