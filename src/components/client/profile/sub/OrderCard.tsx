import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const WhiteBaseButton = {
    bgcolor: 'white',
    color: 'orange',
    ':hover': {
        color:'white'
    },
    border: '1px solid orange',
    marginRight: 2,
    textTransform: 'none',
    paddingX: 3,
    fontWeight: 600
}

const OrderCard = () => {
    return(<Box sx={{width: '100%', marginY: 2,paddingBottom: 2, borderBottom: '1px solid lightgrey'}}>
        <Typography variant='h6' fontSize={18}>Заказ от 24.02.19.</Typography>
        <Box display={'flex'}>
        <Typography variant="h6" sx={{marginRight: 1, fontSize: 18}}>Будет доставлен в </Typography>
        <Typography variant="h6" fontWeight={600} color='orange' fontSize={18} sx={{marginBottom: 1}}>17:25</Typography>
        </Box>
        <Typography variant="subtitle1" fontWeight={600}>Sushi Wok</Typography>
        <Typography variant="subtitle2" sx={{color:"gray"}}>Сушими с лосося 3шт.</Typography>
        <Typography variant="subtitle2" sx={{color:"gray"}}>Удон с курицей 2шт.</Typography>
        <Typography variant="subtitle2" sx={{color:"gray"}}>Сушими с лосося 3шт.</Typography>
        <Typography variant="subtitle2" sx={{color:"gray"}}>Удон с курицей 2шт.</Typography>
        <Typography variant="subtitle1" fontWeight={600} sx={{marginBottom: 1, marginTop: 1}}>1543.00 руб.</Typography>
        <Button sx={WhiteBaseButton}>Повторить</Button>
    </Box>)
}

export default OrderCard;