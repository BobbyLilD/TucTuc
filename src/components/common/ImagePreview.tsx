import styled from "@emotion/styled";
import { Box, Button } from "@mui/material";
import { orange } from "@mui/material/colors";
import React from "react";
import imageDefault from "../../commons/default.jpg";

const StyledImage = styled.img`
border: 1px solid ${orange[500]};
borderRadius: 12px;
width: 164px;
height: 164px;
border-radius: 12px;
`;

const ImagePreview = () => {
    return(
        <Box sx={{position: 'relative', width: 'fit-content', height: 'fit-content'}}>
            <Button sx={{position:'absolute', top: 0, right: 0, color: "white", minWidth: 0, paddingRight: 1, color: 'red'}}>X</Button>
            <StyledImage src={imageDefault}/>
            {/* https://adstandards.com.au/sites/default/files/food_and_beverage.svg */}
        </Box>
    )
}

export default ImagePreview;