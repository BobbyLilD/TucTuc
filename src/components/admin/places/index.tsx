import { Box } from "@mui/system";
import { inject } from "mobx-react";
import React from "react";
import CardGrid from "./sub/CardGrid";
import {Stores} from '../../../types';
import SearchBlock from "../../common/SearchBlock";
import PlaceForm from "./sub/PlaceForm";
import {AdminContentSubContainer} from '../../common/StyledComponents';


type CitiesProps = {
    placeAdd: boolean,
    changePlaceAdd: ()=>void,
}

const placesComponent = ({placeAdd, changePlaceAdd}: CitiesProps) => {
    return(
        <>
            {placeAdd ? (
                <PlaceForm/>
            ):(
            <>
                <SearchBlock changeAddState={changePlaceAdd}/>
                <Box sx={AdminContentSubContainer}>
                    <CardGrid />
                </Box>
            </>)
            }
        </>
    );
}

export default inject(({adminPanelStore} : Stores) => ({
    placeAdd: adminPanelStore.placeAdd,
    changePlaceAdd: adminPanelStore.changePlaceAdd
}))(placesComponent);