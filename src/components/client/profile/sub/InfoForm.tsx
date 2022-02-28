import { Box, Button, TextField } from "@mui/material";
import { inject } from "mobx-react";
import React from "react";
import { Stores } from "../../../../types";
import { BackBtn, OrangeBaseButton } from "../../../common/StyledComponents";

const DataInputSX = {
    '.MuiOutlinedInput-root': {
        bgcolor: 'white',
        '&.Mui-focused fieldset':{
            borderColor: 'orange'
        }
    },
    marginY: 1,
    minWidth: 450,
}

const SaveBtn = {...OrangeBaseButton, ...{marginTop: 1}}

type InfoFormProps = {
    changeShowForm: () => void;
}

const InfoForm = ({changeShowForm}:InfoFormProps) => {
    return(
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
            <Button sx={BackBtn} onClick={changeShowForm}>{`< `} назад</Button>
            <TextField variant='outlined' placeholder="Имя, Фамилия"  sx={DataInputSX} value='Тод Говард'/>
            <TextField variant='outlined' placeholder="Номер моб. телефона"  sx={DataInputSX} value='+7(911) 164 86 54'/>
            <TextField variant='outlined' placeholder="E-mail"  sx={DataInputSX} value='bethesda@gmail.com'/>
            <Button sx={SaveBtn}>Сохранить</Button>
        </Box>
    )
}

export default inject(({clientStore}: Stores) => ({changeShowForm: clientStore.changeShowInfoForm}))(InfoForm);