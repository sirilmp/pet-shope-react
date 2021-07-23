import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminNav from "../../components/AdminNav";
import firebase, { storage } from "../../components/Firebase";
import { selectUser } from "../../features/userSlice";

function GalleryImageUpload() {

    const [image, setImage] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [uploadError,setUploadError]=useState('')
    const [success, setSuccess] = useState("");
    const [progress, setProgress] = useState(null);
    const history = useHistory();
    const fileType = ["image/png", "image/jpg", "image/jpeg"];

    const admin = useSelector(selectUser);
    if (!admin) {
      history.push("/");
    }

    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+'-'+time;
   // console.log(dateTime);
  
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
      setError("Please select a png/jpg/jpeg file");
      setImage("");
    }
  };


  const uploadGalleryImage = (e) => {
    e.preventDefault();
    setLoading(true);

    const uploadTask = storage.ref(`gallery_images/${dateTime+'-'+image.name}`).put(image);
    console.log(dateTime+'-'+image.name);
    uploadTask.on(
      "state_change",
      (snapshot) => {
        const progressCount =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(Math.floor(progressCount));
        //   console.log(progress);
      },
      (error) => {
        setUploadError(error.message);
        setProgress(null);
        setSuccess("");
        setError("");
      },
      () => {
        storage
          .ref("gallery_images")
          .child(dateTime+'-'+image.name)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            const data = firebase.database().ref(`galleryImageDetails/`);
            const imageData= {
              url: url,
              timeStamp:(-1*(new Date().getTime())),
            };
            data.push(imageData);
          });
        setLoading(false)
        setImage(null);
        setError("");
        setUploadError('')
        setProgress(null);
        setSuccess("");
        setImagePreview(null)
        toast.success("image upload successfully !", {
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
         <AdminNav/>      <h1 className="text-center p-3 mt-10 underline font-semibold font-mono text-xl text-gray-500">
      Upload image for gallery.
      </h1>

      {success && <p>{success}</p>}
{uploadError && <p className="w-full max-w-xl mx-auto grid bg-red-200 p-2 mt-4 rounded-md text-red-600 font-semibold font-mono">{uploadError}</p>}
      <form onSubmit={uploadGalleryImage}>
        <div className="grid md:grid-cols-2 max-w-xl mx-auto gap-4 mt-8 p-2 ">
          
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
                <h1 className="mt-5 relative text-center text-lg font-semibold font-mono text-gray-500 bg-transparent">
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
                Upload
              </button>
            ))}
       </div>
       </form> 
        </>
    )
}

export default GalleryImageUpload
 
