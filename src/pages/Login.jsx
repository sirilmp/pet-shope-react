import React, { useRef } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../components/Firebase";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [loading, setLoading] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);

const history=useHistory()

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setLoading(true)
    const config = {
      url: "http://localhost:3000/am-admin/login",
      handleCodeInApp: true,
    };

    auth.sendPasswordResetEmail(emailRef.current.value,config).then(()=>{
        setLoading(false)
        alert('Password reset link send to your mail')
        // history.push('/')
    }).catch((error)=>{
        setLoading(false)
        alert(error.message)
    })

  };

  const logIn = (e) => {
    e.preventDefault();
setLoading(true)
    //console.log(emailRef.current.value, passwordRef.current.value);
    auth
      .signInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((authUser) => {
        //console.log(authUser);
        setLoading(false)
        history.push('/')
      })
      .catch((error) => {
        alert(error.message);
        setLoading(false)
      });
    
  };

  return (
    <>
      {forgotPassword ? (
        //forgot password section
        <>
          <h1 className="text-center p-3 mt-10 underline font-semibold font-mono text-xl text-gray-700">
            Forgot Password
          </h1>
          <form>
            <div className="grid md:grid-cols-2 max-w-xl mx-auto gap-4 mt-8 p-2 place-items-center">
              <input
                 className="w-full h-10 border-2 border-gray-700 p-2 rounded-md text-gray-500 bg-transparent placeholder-current font-mono font-semibold focus:outline-none focus:shadow-md"
                ref={emailRef}
                type="text"
                placeholder="Email id"
                required
              />
              {loading ? (
  
<></>
            
              ) : (
              <button onClick={handleForgotPassword} className="w-full max-w-xl mx-auto grid dark:bg-gray-800 bg-gray-300 text-gray-600 dark:text-gray-500 p-2 m-6 rounded-md font-semibold font-mono">
                Submit
              </button>
              )}
            </div>
          </form>
          {
            loading &&   <div className='max-w-xl mx-auto mt-10'>
            <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
          </div>
          }
          <div className="mx-auto mt-3 max-w-xl">
            <p
              onClick={() => setForgotPassword(false)}
              className="text-right font-mono text-gray-500 cursor-pointer hover:underline"
            >
              Back to Login
            </p>
          </div>
        </>
      ) : (
        //forgot password section closed
        //login section
        <>
          <h1 className="text-center p-3 mt-10 underline font-semibold font-mono text-xl dark:text-gray-500 text-gray-800">
            Admin Login
          </h1>
          <form>
            <div className="grid md:grid-cols-2 max-w-xl mx-auto gap-4 mt-8 p-2">
              <input
                className="w-full border-2 border-gray-700 p-2 rounded-md text-gray-500 bg-transparent placeholder-current font-mono font-semibold focus:outline-none focus:shadow-md"
                ref={emailRef}
                type="text"
                placeholder="Email id"
                required
              />
              <input
                className="w-full border-2 border-gray-700 p-2 rounded-md text-gray-500 bg-transparent placeholder-current font-mono font-semibold focus:outline-none focus:shadow-md"
                ref={passwordRef}
                type="password"
                placeholder="Password"
                required
              />
            </div>
            <div className="p-2">
              {loading ? (
         <div className='max-w-xl mx-auto mt-10 text-center'>
         <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
       </div>
              ) : (
                <button
                  type="submit"
                  onClick={logIn}
                  className="w-full max-w-xl mx-auto grid dark:bg-gray-800 bg-gray-300 text-gray-600 dark:text-gray-500 p-2 m-6 rounded-md font-semibold font-mono"
                >
                  Login
                </button>
              )}
            </div>
          </form>
          <div className="mx-auto max-w-xl">
            <p
              onClick={() => setForgotPassword(true)}
              className="text-right font-mono text-gray-500 cursor-pointer hover:underline"
            >
              forgot password?
            </p>
          </div>
        </>
        //login section closed
      )}
    </>
  );
}

export default Login;
