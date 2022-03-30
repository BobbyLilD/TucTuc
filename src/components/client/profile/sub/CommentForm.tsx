import { Button, Paper, Rating, TextField, Typography } from '@mui/material';
import { inject } from 'mobx-react';
import React, { useState } from 'react';
import { Stores } from '../../../../types';
import {
  BackBtn,
  CommentDataInputSX,
  DataInputSX,
  DescriptionSX,
  OrangeBaseButton,
} from '../../../common/StyledComponents';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useForm, SubmitHandler } from 'react-hook-form';
import styled from '@emotion/styled';
import { Box } from '@mui/system';

type CommentFormProps = {
  changeFormState: () => void;
};

interface IFormInput {
  Text: string;
}

const StyledInput = styled.form`
  width: 500px;
`;

const CommentForm = ({ changeFormState }: CommentFormProps) => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
    console.log(rating);
  };

  const [rating, setRating] = useState(2.5);

  return (
    <>
      <Button sx={BackBtn} onClick={changeFormState}>
        <ArrowBackIosIcon />
        назад
      </Button>
      <Typography variant="h4" fontWeight={600} sx={{ marginBottom: 2 }}>
        Комментарий к заказу
      </Typography>
      <Paper elevation={3} sx={{ marginTop: 2, p: 3, width: 'fit-content' }}>
        <StyledInput onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            multiline
            sx={CommentDataInputSX}
            {...register('Text', { required: true })}
          />
          <Box sx={{ display: 'flex', marginTop: 2, alignItems: 'center' }}>
            <Typography variant="subtitle1" sx={{ marginRight: 1 }}>
              Рейтинг заведения:
            </Typography>
            <Rating
              defaultValue={2.5}
              precision={0.5}
              value={rating}
              onChange={(event, newValue) => setRating(newValue)}
            />
          </Box>
          <Button
            sx={{ ...OrangeBaseButton, ...{ marginLeft: '70%', marginTop: 1 } }}
            type="submit"
          >
            Отправить
          </Button>
        </StyledInput>
      </Paper>
    </>
  );
};

export default inject(({ clientStore }: Stores) => ({
  changeFormState: clientStore.changeShowCommentForm,
}))(CommentForm);
