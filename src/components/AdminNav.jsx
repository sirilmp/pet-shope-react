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
    <div className='flex justify-end bg-gray-900 p-2 z-50 top-0 sticky'>
      <h1 onClick={home} className='ml-2 mr-2 p-2 font-mono text-gray-800 font-semibold cursor-pointer hover:text-gray-500 hover:bg-gray-800 bg-gray-500 rounded-md border border-gray-500 transform duration-200'>Home</h1>
      <h1 onClick={addPuppies} className='ml-2 mr-2 p-2 font-mono text-gray-800 font-semibold cursor-pointer hover:text-gray-500 hover:bg-gray-800 bg-gray-500 rounded-md border border-gray-500 transform duration-200'>Add Puppies</h1>
      <h1 onClick={addProduct} className='ml-2 mr-2 p-2 font-mono text-gray-800 font-semibold cursor-pointer hover:text-gray-500 hover:bg-gray-800 bg-gray-500 rounded-md border border-gray-500 transform duration-200'>Add Products</h1>
      <h1 onClick={addStudDog} className='ml-2 mr-2 p-2 font-mono text-gray-800 font-semibold cursor-pointer hover:text-gray-500 hover:bg-gray-800 bg-gray-500 rounded-md border border-gray-500 transform duration-200'>Stud Dog</h1>
      <h1 onClick={logout} className='ml-2 mr-2 p-2 font-mono text-gray-800 font-semibold cursor-pointer hover:text-gray-500 hover:bg-gray-800 bg-gray-500 rounded-md border border-gray-500 transform duration-200'>Logout</h1>
    </div>
  );
}

export default AdminNav;
