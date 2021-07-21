import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import firebase, { storage } from "./Firebase";
import useClipboard from "react-use-clipboard";



function ProductSellCard({ productsDetails }) {
  //console.log(productsDetails);
  const admin = useSelector(selectUser);

  const showFullText = () => {
    setFullText(true);
  };

  const hideFullText = () => {
    setFullText(false);
  };

  const [fullText, setFullText] = useState(false);
  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + ` ...` : string;
  }

  const deleteData = (e) => {
    e.preventDefault();
    //console.log(productsDetails.key);
    let imageRef = storage.refFromURL(productsDetails.url);
    imageRef.delete();
    firebase.database().ref(`productDetails/${productsDetails.key}`).remove();
  };

  const [isCopied, setCopied] = useClipboard("8078316689", {
    // `isCopied` will go back to `false` after 1000ms.
    successDuration: 1000,
  });

  return (
    <div className="ml-2 rounded-2xl bg-gray-200 dark:bg-gray-800 "
    data-aos="fade-up"
    data-aos-duration="3000"
    >
      <div className="dark:bg-gray-900 bg-gray-100 rounded-2xl hover:-translate-y-2 transform duration-200 hover:shadow-xl text-gray-700 main_font">
        <div
          className="w-72 h-56 bg-gray-500 group overflow-hidden rounded-lg"
          style={{
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundImage: `url(${productsDetails.url})`,
          }}
        >
          <div>
            {productsDetails.offer_price ? (
              <>
                <h1 className="absolute select-none cursor-default dark:bg-gray-900 bg-gray-100 p-2 -ml-0.5 -mt-0.5 rounded-br-3xl font-bold">
                  {productsDetails.actual_price - productsDetails.offer_price}{" "}
                  INR OFF
                </h1>
                <div className="dark:bg-gray-900 bg-gray-100 p-1 select-none cursor-default absolute rounded-br-lg -ml-0.5 font-semibold mt-9">
                  <h1>{productsDetails.type}</h1>
                </div>
              </>
            ) : (
              <div className="dark:bg-gray-900 bg-gray-100 p-1 -ml-0.5 -mt-0.5 select-none cursor-default absolute rounded-br-lg font-semibold">
                <h1>{productsDetails.type}</h1>
              </div>
            )}
          </div>
        </div>
        <h1 className="w-72 px-3 pt-3 pb-2 font-bold">
          {productsDetails.brand_name}
        </h1>
        <h1 className="w-72  px-3 pt-1 pb-2 font-bold">
          {productsDetails.product_name}
        </h1>
        {
          //console.log(productsDetails.description?.length>52),
          productsDetails.description?.length > 45 ? (
            !fullText ? (
              <>
                <h1 className="w-72 px-3 pt-1 pb-2 break-words font-bold">
                  {truncate(productsDetails.description, 45)}{" "}
                  <i
                    title="read more"
                    onClick={showFullText}
                    className="text-gray-700 hover:text-gray-400 transform duration-500 cursor-pointer focus:text-gray-700 text-lg fas fa-arrow-circle-down"
                  ></i>
                </h1>
              </>
            ) : (
              <>
                <h1 className=" w-72 px-3 pt-1 pb-2 break-words font-bold">
                  {productsDetails.description}{" "}
                  <i
                    title="read less"
                    onClick={hideFullText}
                    className="text-gray-700  hover:text-gray-400 transform duration-500 cursor-pointer focus:text-gray-700 text-lg fas fa-arrow-circle-up"
                  ></i>
                </h1>
              </>
            )
          ) : (
            <h1 className=" w-72 px-3 pt-1 pb-2 break-words font-bold ">
              {productsDetails.description}
            </h1>
          )
        }
        <h1 className="w-72 px-3 pt-1 pb-2">
          Quantity:
          <span className="font-bold">{productsDetails.quantity}</span>
        </h1>
        {productsDetails.offer_price === "" ? (
          <>
            <h1 className="w-72 px-3 pt-1 pb-4">
              Price:
              <span className="font-bold">
                {productsDetails.actual_price}INR
              </span>
            </h1>
          </>
        ) : (
          <>
            <h1 className="w-72 px-3 pt-1 pb-4">
              Price:
              <span className="font-bold line-through cursor-default select-none text-gray-400 dark:text-gray-800">
                {productsDetails.actual_price}INR
              </span>{" "}
              <span className="font-bold">
                {productsDetails.offer_price}INR
              </span>
            </h1>
          </>
        )}
      </div>
      <div className="py-1 font-mono flex justify-evenly text-gray-600 items-center">
        {admin ? (
          <>
   <>
   <div className="copy_icon">
                <i
                  onClick={setCopied}
                  className="text-gray-700 hover:text-gray-400 transform duration-500 cursor-pointer focus:text-gray-700 text-2xl fas fa-phone-alt"
                ></i>
                <div className="copy_items hidden relative">
                  <p
                    className={`dark:bg-gray-500 bg-gray-900 dark:text-gray-800 text-gray-100 main_font -mt-77 -ml-10 absolute p-1  rounded-lg w-101 ${
                      isCopied && "w-130"
                    }`}
                  >
                    {isCopied ? "number copied !" : "click to copy"}
                  </p>
                  <i className="absolute -mt-61 dark:text-gray-500 text-gray-900 text-lg fas fa-sort-down"></i>
                </div>
              </div>
            </>

            <i
              onClick={deleteData}
              className="ml-16 mr-16 text-red-400 hover:text-red-600 transform duration-500 cursor-pointer focus:text-gray-700 text-2xl fas fa-trash-alt"
            ></i>
           <div className="copy_icon z-30">
              <a
                href={`https://api.whatsapp.com/send?phone=919496706647&text=*👋 ABIN I want 👇 product* %0aType : *${productsDetails.type}*,%0a‎Name : *${productsDetails.brand_name}*,%0aProduct : *${productsDetails.product_name}*,%0aQuantity : *${productsDetails.quantity},*%0a‎Price : *${productsDetails.actual_price}INR*`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="text-gray-700 hover:text-gray-400 transform duration-500 cursor-pointer focus:text-gray-700 text-4xl fab fa-whatsapp"></i>
              </a>

              <div className="copy_items hidden relative">
                <p
                  className={`dark:bg-gray-500 bg-gray-900 dark:text-gray-800 text-gray-100 main_font -mt-20 -ml-14 absolute p-1  rounded-lg w-132`}
                >
                  start chat & buy
                </p>
                <i className="absolute -mt-16 dark:text-gray-500 text-gray-900 ml-3 text-lg fas fa-sort-down"></i>
              </div>
            </div>
          </>
        ) : (
          <>
    
    <>
    <div className="copy_icon">
                <i
                  onClick={setCopied}
                  className="text-gray-700 hover:text-gray-400 transform duration-500 cursor-pointer focus:text-gray-700 text-2xl fas fa-phone-alt"
                ></i>
                <div className="copy_items hidden relative">
                  <p
                    className={`dark:bg-gray-500 bg-gray-900 dark:text-gray-800 text-gray-100 main_font -mt-77 -ml-10 absolute p-1  rounded-lg w-101 ${
                      isCopied && "w-130"
                    }`}
                  >
                    {isCopied ? "number copied !" : "click to copy"}
                  </p>
                  <i className="absolute -mt-61 dark:text-gray-500 text-gray-900 text-lg fas fa-sort-down"></i>
                </div>
              </div>
            </>

            <h1 className="cursor-default font-semibold">or</h1>
            <div className="copy_icon">
              <a
                href={`https://api.whatsapp.com/send?phone=919496706647&text=*👋 ABIN I want 👇 product* %0aType : *${productsDetails.type}*,%0a‎Name : *${productsDetails.brand_name}*,%0aProduct : *${productsDetails.product_name}*,%0aQuantity : *${productsDetails.quantity},*%0a‎Price : *${productsDetails.actual_price}INR*`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="text-gray-700 hover:text-gray-400 transform duration-500 cursor-pointer focus:text-gray-700 text-4xl fab fa-whatsapp"></i>
              </a>

              <div className="copy_items hidden relative">
                <p
                  className={`dark:bg-gray-500 bg-gray-900 dark:text-gray-800 text-gray-100 main_font -mt-20 -ml-14 absolute p-1  rounded-lg w-132`}
                >
                  start chat & buy
                </p>
                <i className="absolute -mt-16 dark:text-gray-500 text-gray-900 ml-3 text-lg fas fa-sort-down"></i>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ProductSellCard;


