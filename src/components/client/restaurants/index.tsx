import React from "react";
import Footer from "../base/Footer";
import ControlBlock from "./sub/ControlBlock";
import RestaurantGrid from "./sub/RestaurantGrid";

const RestaurantsComponent = () => {
    return(
        <>
        <ControlBlock/>
        <RestaurantGrid/>
        <Footer paddingPercentage={22}/>
        </>
    )
}

export default RestaurantsComponent;