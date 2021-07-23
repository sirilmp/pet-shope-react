import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminNav from "../../components/AdminNav";
import firebase, { storage } from "../../components/Firebase";
import { selectUser } from "../../features/userSlice";

toast.configure();
function PuppiesSell() {
  const [breedName, setBreedName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [age, setAge] = useState("");
  const [actualPrice, setActualPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const admin = useSelector(selectUser);
  const fileType = [ "image/jpg", "image/jpeg"];

  if (!admin) {
    history.push("/");
  }


  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date+'-'+time;
  //console.log(dateTime);


  const imageUpload = (e) => {
    let selectedImage = e.target.files[0];
    setProgress(null);
    setLoading(false);
    //console.log(e.target.files[0]);
    if (selectedImage && fileType.includes(selectedImage.type)) {
      setImage(selectedImage);
      //console.log(image);
      let displayPreview = new FileReader();
      displayPreview.onload = () => {
        setImagePreview(displayPreview.result);
        //console.log(displayPreview.result);
      };
      displayPreview.readAsDataURL(selectedImage);
      //console.log(displayPreview.readAsDataURL(selectedImage));
      setError("");
    } else {
      setError("Please select a jpg/jpeg file");
      setImage("");
    }
  };

  const addPappiesSell = (e) => {
    e.preventDefault();
    setLoading(true);

    const uploadTask = storage.ref(`puppies_images/${dateTime+'-'+image.name}`).put(image);
    uploadTask.on(
      "state_change",
      (snapshot) => {
        const progressCount =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(Math.floor(progressCount));
        //   console.log(progress);
      },
      (error) => {
        setError(error.message);
      },
      () => {
        storage
          .ref("puppies_images")
          .child(dateTime+'-'+image.name)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            const data = firebase.database().ref(`puppiesDetails/`);
            const productDetails = {
              breed_name: breedName,
              father_name: fatherName,
              mother_name: motherName,
              age: age,
              actual_price: actualPrice,
              offer_price: offerPrice,
              url: url,
              timeStamp:(-1*(new Date().getTime())),
            };
            data.push(productDetails);
          });
        setLoading(false);
        setBreedName("");
        setFatherName("");
        setMotherName("");
        setActualPrice("");
        setOfferPrice("")
        setAge("");
        setImage(null);
        setError("");
        setProgress(null);
        setSuccess("");
        setImagePreview(null)
        toast.success("Puppy added successfully !", {
          position: "top-right",
          autoClose: 7000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    );
  };
  return (
    <>
    <AdminNav/>
      <h1 className="text-center p-3 mt-10 underline font-semibold font-mono text-xl text-gray-500">
        Add Puppies for Sell.
      </h1>

      {success && <p>{success}</p>}

      <form onSubmit={addPappiesSell}>
        <div className="grid md:grid-cols-2 max-w-xl mx-auto gap-4 mt-8 p-2 ">
          <input
            className="w-full border-2 border-gray-500 p-2 rounded-md text-gray-500 bg-transparent placeholder-current font-mono font-semibold focus:outline-none focus:shadow-md"
            type="text"
            placeholder="Breed name"
            name="breed_name"
            required
            onChange={(e) => setBreedName(e.target.value)}
            value={breedName}
          />
          <input
            className="w-full border-2 border-gray-500 p-2 rounded-md text-gray-500 bg-transparent placeholder-current font-mono font-semibold focus:outline-none focus:shadow-md"
            type="text"
            placeholder="Father name"
            name="father_name"
            required
            onChange={(e) => setFatherName(e.target.value)}
            value={fatherName}
          />
          <input
            className="w-full border-2 border-gray-500 p-2 rounded-md text-gray-500 bg-transparent placeholder-current font-mono font-semibold focus:outline-none focus:shadow-md"
            type="text"
            placeholder="Mother name"
            name="mother_name"
            required
            onChange={(e) => setMotherName(e.target.value)}
            value={motherName}
          />
          <input
            className="w-full border-2 border-gray-500 p-2 rounded-md text-gray-500 bg-transparent placeholder-current font-mono font-semibold focus:outline-none focus:shadow-md"
            type="number"
            placeholder="Age (in month eg: 2)"
            name="age"
            required
            onChange={(e) => setAge(e.target.value)}
            value={age}
          />
         <input
            className="w-full border-2 border-gray-500 p-2 rounded-md text-gray-500 bg-transparent placeholder-current font-mono font-semibold focus:outline-none focus:shadow-md"
            type="number"
            placeholder="Actual price (in INR)"
            name="price"
            required
            onChange={(e) => setActualPrice(e.target.value)}
            value={actualPrice}
          />
          <input
            className="w-full border-2 border-gray-500 p-2 rounded-md text-gray-500 bg-transparent placeholder-current font-mono font-semibold focus:outline-none focus:shadow-md"
            type="number"
            placeholder="Offer price (in INR)"
            name="price"
            onChange={(e) => setOfferPrice(e.target.value)}
            value={offerPrice}
          />
          <input
            className={`w-full p-2 rounded-md placeholder-current font-mono font-semibold focus:outline-none focus:shadow-md ${
              error
                ? "text-red-600 error_custom_border"
                : "border-2 border-gray-500 text-gray-500 bg-transparent"
            }`}
            type="file"
            name="image"
            required
            onChange={imageUpload}
          />
        </div>
        {imagePreview && (
          <>
            <div className="max-w-xl mx-auto mt-3">
              <img
                className="w-24 mx-auto p-1"
                src={`${imagePreview}`}
                alt=""
              />
            </div>
          </>
        )}
        {error && (
          <div>
            <p className="w-full max-w-xl mx-auto grid bg-red-200 p-2 mt-4 rounded-md text-red-600 font-semibold font-mono">
              {error}
            </p>
          </div>
        )}
        <div className="p-2">
          {!error &&
            (loading ? (
              <>
                <h1 className="mt-5 relative text-center font-semibold font-mono text-gray-500 bg-transparent">
                  {progress}%
                </h1>
                <div className="max-w-xl dark:bg-gray-800 bg-gray-400 shadow-lg w-full mx-auto py-1 px-1 rounded-full">
                  <div
                    className="rounded-full animate-pulse"
                    style={{
                      width: `${progress}%`,
                      height: "10px",
                      backgroundColor: "rgba(107, 114, 128)",
                    }}
                  ></div>
                </div>
              </>
            ) : (
              <button
                type="submit"
                className="w-full max-w-xl mx-auto grid p-2 m-6 rounded-md dark:bg-gray-800 bg-gray-300 text-gray-600 dark:text-gray-500 font-semibold font-mono"
              >
                ADD
              </button>
            ))}
        </div>
      </form>
    </>
  );
}

export default PuppiesSell;