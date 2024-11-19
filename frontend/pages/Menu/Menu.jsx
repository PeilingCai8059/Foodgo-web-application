import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import Navbar from "../../components/Navbar/Navbar";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import Footer from "../../components/Footer/Footer";
import {useState } from 'react'

export default function Menu() {
const [category,setCategory] = useState("All");
  return (
    <>
    <div className="app">
    <Navbar/>
    <ExploreMenu category={category} setCategory={setCategory} />
    <FoodDisplay category={category} />
    </div>
    <Footer />
    </>
  )
}
