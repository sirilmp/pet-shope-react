import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import firebase, { storage } from "./Firebase";
import useClipboard from "react-use-clipboard";
import Aos from "aos";
import "aos/dist/aos.css"
Aos.init({ once: true})

function PuppiesSellingCard({ puppiesDetails }) {
  const admin = useSelector(selectUser);

  const [isCopied, setCopied] = useClipboard("8078316689", {
    // `isCopied` will go back to `false` after 1000ms.
    successDuration: 1000,
  });

  const deleteData = (e) => {
    e.preventDefault();
    console.log(puppiesDetails.key);
    let imageRef = storage.refFromURL(puppiesDetails.url);
    imageRef.delete();
    firebase.database().ref(`puppiesDetails/${puppiesDetails.key}`).remove();
  };

  return (
    <div className="ml-2 rounded-2xl bg-gray-200 dark:bg-gray-800 "
    data-aos="fade-up"
    data-aos-duration="3000"
    >
      <div className="dark:bg-gray-900 bg-gray-100 rounded-2xl transform duration-200 hover:-translate-y-2 hover:shadow-xl text-gray-700 main_font">
        <div
          className="w-72 h-56 bg-gray-500 group overflow-hidden rounded-lg"
          style={{
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundImage: `url(${puppiesDetails.url})`,
          }}
        >
          <div>
            {puppiesDetails.offer_price && (
              <h1 className="absolute select-none cursor-default dark:bg-gray-900 bg-gray-100 p-2 -ml-0.5 -mt-0.5 rounded-br-3xl font-bold">
                {puppiesDetails.actual_price - puppiesDetails.offer_price} INR
                OFF
              </h1>
            )}
          </div>
        </div>

        <h1 className="w-72  px-3 pt-3 pb-2 font-bold">
          {puppiesDetails.breed_name}
        </h1>
        <h1 className="w-72 px-3 pt-1 pb-2 break-words">
          Father:<span className="font-bold">{puppiesDetails.father_name}</span>{" "}
          ,Mother:
          <span className="font-bold">{puppiesDetails.mother_name}</span>
        </h1>
        <h1 className="w-72 px-3 pt-1 pb-2">
          Age:<span className="font-bold">{puppiesDetails.age}M</span>
        </h1>
        {puppiesDetails.offer_price === "" ? (
          <>
            <h1 className="w-72 px-3 pt-1 pb-4">
              Price:
              <span className="font-bold">
                {puppiesDetails.actual_price}INR
              </span>
            </h1>
          </>
        ) : (
          <>
            <h1 className="w-72 px-3 pt-1 pb-4">
              Price:
              <span className="font-bold line-through cursor-default select-none text-gray-400 dark:text-gray-800">
                {puppiesDetails.actual_price}INR
              </span>{" "}
              <span className="font-bold">{puppiesDetails.offer_price}INR</span>
            </h1>
          </>
        )}
      </div>
      <div className="py-1 font-mono flex justify-evenly text-gray-700 items-center">
        {admin ? (
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

            <i
              title="delete items"
              onClick={deleteData}
              className="ml-16 mr-16 text-red-400 hover:text-red-600 transform duration-500 cursor-pointer focus:text-gray-700 text-2xl fas fa-trash-alt"
            ></i>

            <div className="copy_icon">
              <a
                href={`https://api.whatsapp.com/send?phone=919496706647&text=*👋 ABIN I want 👇 puppy* %0a‎Name : *${puppiesDetails.breed_name}*,%0aFather : *${puppiesDetails.father_name}*,%0aMother : *${puppiesDetails.mother_name}*,%0aAge : *${puppiesDetails.age}M,*%0a‎Price : *${puppiesDetails.actual_price}*`}
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


            <h1 className="cursor-default font-semibold">or</h1>

            <div className="copy_icon">
              <a
                href={`https://api.whatsapp.com/send?phone=919496706647&text=*👋 ABIN I want 👇 puppy* %0a‎Name : *${puppiesDetails.breed_name}*,%0aFather : *${puppiesDetails.father_name}*,%0aMother : *${puppiesDetails.mother_name}*,%0aAge : *${puppiesDetails.age}M,*%0a‎Price : *${puppiesDetails.actual_price}*`}
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

export default PuppiesSellingCard;
