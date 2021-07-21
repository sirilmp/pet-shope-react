import React from "react";
import { useHistory } from "react-router-dom";
import { auth } from "./Firebase";

function AdminNav() {

const history=useHistory()

const addPuppies=(e)=>{
    e.preventDefault()
history.push('/add-puppies')
}
const addProduct=(e)=>{
    e.preventDefault()
    history.push('/add-products')
}
const addStudDog=()=>{
  history.push('/add-stud-dog')
}
const home=()=>{
  history.push('/')
}
const logout=(e)=>{
    e.preventDefault()
    auth.signOut()
}

  return (
    <div className='flex dark:bg-gray-900 bg-gray-100 p-2 z-50 top-0 sticky overflow-scroll'>
      <h1 onClick={home} className='ml-2 mr-2 p-2 font-mono dark:text-gray-400 text-gray-500 font-semibold cursor-pointer hover:text-gray-500 hover:bg-gray-700 dark:bg-gray-800 bg-gray-200 rounded-md transform duration-200'>Home</h1>
      <h1 onClick={addPuppies} className='ml-2 mr-2 p-2 font-mono dark:text-gray-400 text-gray-500 font-semibold cursor-pointer hover:text-gray-500 hover:bg-gray-700 dark:bg-gray-800 bg-gray-200 rounded-md transform duration-200'>Add Puppies</h1>
      <h1 onClick={addProduct} className='ml-2 mr-2 p-2 font-mono dark:text-gray-400 text-gray-500 font-semibold cursor-pointer hover:text-gray-500 hover:bg-gray-700 dark:bg-gray-800 bg-gray-200 rounded-md transform duration-200'>Add Products</h1>
      <h1 onClick={addStudDog} className='ml-2 mr-2 p-2 font-mono dark:text-gray-400 text-gray-500 font-semibold cursor-pointer hover:text-gray-500 hover:bg-gray-700 dark:bg-gray-800 bg-gray-200 rounded-md transform duration-200'>Stud Dog</h1>
      <h1 onClick={logout} className='ml-2 mr-2 p-2 font-mono dark:text-gray-400 text-gray-500 font-semibold cursor-pointer hover:text-gray-500 hover:bg-gray-700 dark:bg-gray-800 bg-gray-200 rounded-md transform duration-200'>Logout</h1>
    </div>
  );
}

export default AdminNav;
