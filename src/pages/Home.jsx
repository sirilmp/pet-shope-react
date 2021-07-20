import React from "react";
import { useSelector } from "react-redux";
import About from "../components/About";
import AdminNav from "../components/AdminNav";
import AnimatedWhiteDog from "../components/AnimatedWhiteDog";
import AnimatedWhiteDog2 from "../components/AnimatedWhiteDog2";
import Banner from "../components/Banner";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import ProductSellingCards from "../components/ProductSellingCards";
import PuppiesSellingCards from "../components/PuppiesSellingCards";
import StudService from "../components/StudServiceCards";
import { selectUser } from "../features/userSlice";

function Home() {
  const admin = useSelector(selectUser);
  return (
    <div>
      {admin && <AdminNav />}
      <Banner />
      <div className="-mt-10 bg-gray-900 ">
        <AnimatedWhiteDog />
      </div>
      <About />
      <PuppiesSellingCards />
      <ProductSellingCards />
      <StudService />
      <div className="absolute right-20 transform rotate-45 -mt-24 z-10">
        <AnimatedWhiteDog2 />
      </div>
      <div className='mt-32'>
        <Contact />
      </div>
      <Footer/>
    </div>
  );
}

export default Home;
