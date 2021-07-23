import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminNav from "../../components/AdminNav";
import firebase from "../../components/Firebase";
import { selectUser } from "../../features/userSlice";

function GalleryVideoUpload() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [uploadError, setUploadError] = useState("");
  const [success, setSuccess] = useState("");
  const [timeStamp,setTimeStamp]=useState('')
  const history = useHistory();

  const admin = useSelector(selectUser);
  if (!admin) {
    history.push("/");
  }
  const uploadGalleryVideo = (e) => {
    e.preventDefault();
    setLoading(true);
 const now = new Date().getTime()
    setTimeStamp(-1*(now))

    const data = firebase.database().ref(`galleryVideoDetails/`);
    const videoData = {
      url: url,
      timeStamp: (-1*(new Date().getTime())),
    };
    data.push(videoData);
    setLoading(false);
    setUrl('')
    setError("");
    setUploadError("");
    setSuccess("");
    toast.success("Video url added successfully !", {
      position: "top-right",
      autoClose: 7000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

  };

  return (
    <>
      <AdminNav />{" "}
      <h1 className="text-center p-3 mt-10 mb-10 underline font-semibold font-mono text-xl text-gray-500">
        Upload video url for gallery.
      </h1>
      <p className="text-center p-3 mt-10 mb-10 underline font-semibold font-mono text-xl text-gray-500">time :{timeStamp}</p>
      <div className="flex justify-center mt-7 mb-7 select-none">
        <p className="text-gray-500 text-center dark:bg-gray-800 px-0.5">
          https://www.youtube.com/watch?v=
          <span className="font-semibold text-gray-200 bg-gray-500">
            8vQeMZbUt98
          </span>
        </p>
        
        <p className="absolute dark:bg-gray-500 bg-gray-900 dark:text-gray-800 text-gray-100 main_font -mt-10 -ml-10 p-1  rounded-lg">
          YouTube url
        </p>
        <i className="absolute -mt-6 -ml-10 dark:text-gray-500 text-gray-900 text-lg fas fa-sort-down"></i>
        
        <p className="absolute dark:bg-gray-500 bg-gray-900 dark:text-gray-800 text-gray-100 main_font mt-8 ml-64 p-1  rounded-lg">
          video code
        </p>
        <i className="absolute mt-5 ml-64 transform rotate-180 dark:text-gray-500 text-gray-900 text-lg fas fa-sort-down"></i>
     
      </div>
      {success && <p>{success}</p>}
      {uploadError && (
        <p className="w-full max-w-xl mx-auto grid bg-red-200 p-2 mt-4 rounded-md text-red-600 font-semibold font-mono">
          {uploadError}
        </p>
      )}
      <form onSubmit={uploadGalleryVideo}>
        <div className="grid md:grid-cols-2 max-w-xl mx-auto gap-4 mt-14 p-2">
          <input
            className={`w-full p-2 rounded-md placeholder-current font-mono font-semibold focus:outline-none focus:shadow-md ${
              error
                ? "text-red-600 error_custom_border"
                : "border-2 border-gray-500 text-gray-500 bg-transparent"
            }`}
            placeholder="Enter video code"
            type="text"
            name="video"
            required
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
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
              </>
            ) : (
              <button
                type="submit"
                className="w-full max-w-xl mx-auto grid p-2 m-6 rounded-md dark:bg-gray-800 bg-gray-300 text-gray-600 dark:text-gray-500 font-semibold font-mono"
              >
                Upload
              </button>
            ))}
        </div>
      </form>
    </>
  );
}

export default GalleryVideoUpload;
