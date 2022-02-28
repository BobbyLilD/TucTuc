import React from "react";
import Footer from "../base/Footer";
import ControlBlock from "./sub/ControlBlock";
import ItemGrid from "./sub/ItemGrid";

const ItemsComponent = () => {
    return(<>
    <ControlBlock/>
    <ItemGrid/>
    <Footer paddingPercentage={10}/>
    </>)
}

export default ItemsComponent;