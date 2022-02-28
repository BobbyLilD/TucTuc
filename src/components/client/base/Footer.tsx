import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import appStoreLogo from '../../../commons/app-store-logo.png';
import playStoreLogo from '../../../commons/Google_Play_logo_black.png';

type FooterProps = {
    paddingPercentage: number
}

const Footer = ({paddingPercentage}: FooterProps) => {
    const FooterContainer = {
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-between', 
        alignItems: 'stretch', 
        paddingX: `${paddingPercentage}%`,
        backgroundColor: 'lightgray',
        marginTop: 4,
        paddingTop: 3,
        height: 300
    }

    return (
    <Box sx={FooterContainer}>
        <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                <Typography variant="subtitle1" fontWeight={600}>О компании</Typography>
                <Typography variant="subtitle1">Правила пользования</Typography>
                <Typography variant="subtitle1">Условия доставки</Typography>
                <Typography variant="subtitle1">Связь с поддержкой</Typography>
                <Typography variant="subtitle1">Частые вопросы</Typography>
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                <Typography variant='subtitle1' fontWeight={600}>Для мобильных устройств</Typography>
                <Box sx={{display: 'flex', marginY: 1}}>
                    <img src={appStoreLogo}/>
                    <img src={playStoreLogo}/>
                </Box>
                <Typography variant='subtitle2' sx={{width: 300}}>
                    Вы также можете пререйти на мобильную версию сайта
                </Typography>
            </Box>
        </Box>
        <Box>
            <Typography variant="h5" sx={{borderTop: '1px solid darkgray', paddingTop: 0.5}}>Тук-Тук 2019 г.</Typography>
        </Box>
    </Box>)
}

export default Footer;