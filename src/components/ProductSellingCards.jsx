import React, { useEffect, useState } from "react";
import ProductSellingCard from "./ProductSellingCard";
import firebase from "./Firebase";



function ProductSellingCards() {
  const [displayData, setDisplayData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    firebase
      .database()
      .ref(`productDetails`).orderByChild("timeStamp")
      .on("value", (snapshot) => {
        let allPuppiesData = [];
        snapshot.forEach((snap) => {
          var key = snap.key;
          // console.log(key);
          var items = snap.val();
          console.log(items);
          allPuppiesData.push({
            key: key,
            brand_name: items.brand_name,
            product_name: items.product_name,
            quantity: items.quantity,
            offer_price: items.offer_price,
            actual_price: items.actual_price,
            type: items.type,
            description: items.description,
            url: items.url,
          });
          // console.log('loading',1+1,allPuppiesData);

          // console.log(allPuppiesData);
        });
        //console.log(allPuppiesData);
        setDisplayData(allPuppiesData);
        setLoading(false);
      });
  }, []);

  return (
    <div id='products' className='pt-16 mt-1'
    data-aos="fade-up"
    data-aos-duration="3000"
    >
         <div className='text-gray-700 flex w-full items-center overflow-hidden relative pl-4'>
       <h1 className="heading_font font-bold text-2xl mb-5 select-none">
       Products for Sell <span className='w-full md:w-1/2 h-0.5 mt-4 ml-3  absolute bg-gray-700'></span>
        </h1>
       </div>

      {loading ? (
        <>

        </>
      ) : (
        <>
          {!displayData.length ? (
            <h1 className="text-center p-5 text-gray-700 main_font font-semibold text-lg">
              Sorry no puppies available now !
            </h1>
          ) : (
            <>
              <div className="flex overflow-x-scroll items-end products_scrollbar p-5">
                {displayData.map((productsDetails) => (
                  <div key={productsDetails.key}>
                    <ProductSellingCard productsDetails={productsDetails} />
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

export default ProductSellingCards;
