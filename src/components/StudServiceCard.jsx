import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import firebase, { storage } from "./Firebase";
import useClipboard from "react-use-clipboard";
import Aos from "aos";
import "aos/dist/aos.css"
Aos.init({ once: true})


function StudServiceCard({ studDogDetails }) {
  const admin = useSelector(selectUser);

  const [fullText, setFullText] = useState(false);
  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + ` ...` : string;
  }

  const deleteData = (e) => {
    e.preventDefault();
    console.log(studDogDetails.key);
    let imageRef = storage.refFromURL(studDogDetails.url);
    imageRef.delete();
    firebase.database().ref(`studDogDetails/${studDogDetails.key}`).remove();
  };

  const showFullText = () => {
    setFullText(true);
  };

  const hideFullText = () => {
    setFullText(false);
  };

  const [isCopied, setCopied] = useClipboard("8078316689", {
    successDuration: 1000,
  });

  return (
    <div className="ml-2 mb-20 rounded-2xl bg-gray-800 "
    data-aos="fade-up"
    data-aos-duration="3000"
    >
      <div className="bg-gray-900 rounded-2xl hover:shadow-lg text-gray-700 main_font transform duration-200 hover:-translate-y-2">
        <div
          className="w-72 h-56 bg-gray-500 group overflow-hidden rounded-lg"
          style={{
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundImage: `url(${studDogDetails.url})`,
          }}
        >
          <div>
            {studDogDetails.offer_price && (
              <h1 className="absolute select-none cursor-default bg-gray-900 p-2 -ml-0.5 -mt-0.5 rounded-br-3xl font-bold">
                {studDogDetails.actual_price - studDogDetails.offer_price} INR
                OFF
              </h1>
            )}
          </div>
        </div>
        <h1 className="w-72 px-3 pt-3 pb-2 break-words font-bold">
          {studDogDetails.dog_name}
        </h1>
        {
          //console.log(studDogDetails.description?.length>52),
          studDogDetails.description?.length > 45 ? (
            !fullText ? (
              <>
                <h1 className=" w-72 px-3 pt-1 pb-2 break-words font-bold truncate-text">
                  {truncate(studDogDetails.description, 45)}{" "}
                  <i
                    title="read more"
                    onClick={showFullText}
                    className="text-gray-700 hover:text-gray-400 transform duration-500 cursor-pointer focus:text-gray-400 text-lg fas fa-arrow-circle-down"
                  ></i>
                </h1>
              </>
            ) : (
              <>
                <h1 className=" w-72 break-words px-3 pt-1 pb-2 font-bold">
                  {studDogDetails.description}{" "}
                  <i
                    title="read less"
                    onClick={hideFullText}
                    className="text-gray-700  hover:text-gray-400 transform duration-500 cursor-pointer focus:text-gray-400 text-lg fas fa-arrow-circle-up"
                  ></i>
                </h1>
              </>
            )
          ) : (
            <h1 className="px-3 pt-1 pb-2 w-72 break-words font-bold">
              {studDogDetails.description}
            </h1>
          )
        }

        {studDogDetails.offer_price === "" ? (
          <>
            <h1 className="w-72 px-3 pt-1 pb-4">
              Fee:
              <span className="font-bold">
                {studDogDetails.actual_price}INR
              </span>
            </h1>
          </>
        ) : (
          <>
            <h1 className="w-72 px-3 pt-1 pb-4">
              Fee:
              <span className="font-bold line-through select-none cursor-default text-gray-700">
                {studDogDetails.actual_price}INR
              </span>{" "}
              <span className="font-bold">{studDogDetails.offer_price}INR</span>
            </h1>
          </>
        )}
      </div>
      <div className="py-1 main_font flex justify-evenly text-gray-700 items-center">
        {admin ? (
          <>
            <div className="copy_icon">
              <i
                onClick={setCopied}
                className="text-gray-700 hover:text-gray-400 transform duration-500 cursor-pointer focus:text-gray-700 text-2xl fas fa-phone-alt"
              ></i>
              <div className="copy_items hidden relative">
                <p
                  className={`bg-gray-500 main_font -mt-77 -ml-10 absolute p-1  rounded-lg w-101 ${
                    isCopied && "w-130"
                  }`}
                >
                  {isCopied ? "number copied !" : "click to copy"}
                </p>
                <i className="absolute -mt-61 text-gray-500 text-lg fas fa-sort-down"></i>
              </div>
            </div>

            <i
              onClick={deleteData}
              className="ml-16 mr-16 text-red-400 hover:text-red-600 transform duration-500 cursor-pointer focus:text-gray-700 text-2xl fas fa-trash-alt"
            ></i>
            <div className="copy_icon z-30">
              <a
                href={`https://api.whatsapp.com/send?phone=919496706647&text=*👋 ABIN I want 👇 product*%0a‎Name : *${studDogDetails.dog_name}*,‎Price : *${studDogDetails.actual_price}INR*`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="text-gray-700 hover:text-gray-400 transform duration-500 cursor-pointer focus:text-gray-700 text-4xl fab fa-whatsapp"></i>
              </a>

              <div className="copy_items hidden relative">
                <p
                  className={`bg-gray-500 main_font -mt-20 -ml-14 absolute p-1  rounded-lg w-132`}
                >
                  start chat & buy
                </p>
                <i className="absolute -mt-16 text-gray-500 ml-3 text-lg fas fa-sort-down"></i>
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
                    className={`bg-gray-500 main_font -mt-77 -ml-10 absolute p-1  rounded-lg w-101 ${
                      isCopied && "w-130"
                    }`}
                  >
                    {isCopied ? "number copied !" : "click to copy"}
                  </p>
                  <i className="absolute -mt-61 text-gray-500 text-lg fas fa-sort-down"></i>
                </div>
              </div>
            </>

            <h1 className="cursor-default font-semibold select-none">or</h1>

            <div className="copy_icon">
              <a
                href={`https://api.whatsapp.com/send?phone=919496706647&text=*👋 ABIN I want 👇 product*%0a‎Name : *${studDogDetails.dog_name}*,‎Price : *${studDogDetails.actual_price}INR*`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="text-gray-700 hover:text-gray-400 transform duration-500 cursor-pointer focus:text-gray-700 text-4xl fab fa-whatsapp"></i>
              </a>

              <div className="copy_items hidden relative">
                <p
                  className={`bg-gray-500 main_font -mt-20 -ml-14 absolute p-1  rounded-lg w-132`}
                >
                  start chat & buy
                </p>
                <i className="absolute -mt-16 text-gray-500 ml-3 text-lg fas fa-sort-down"></i>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default StudServiceCard;
