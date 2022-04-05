import { Button, Paper, Rating, TextField, Typography } from '@mui/material';
import { inject } from 'mobx-react';
import React, { useState } from 'react';
import { comment, Stores } from '../../../../types';
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
  selectedComment: comment;
  deleteComment: (id: string) => void;
  changeSelectedComment: (index: number) => void;
};

interface IFormInput {
  Text: string;
}

const StyledInput = styled.form`
  width: 500px;
`;

const CommentForm = ({ changeFormState, selectedComment, deleteComment, changeSelectedComment }: CommentFormProps) => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
    console.log(rating);
  };

  let defaultValues: comment = {
    text: '',
    rating: 2.5
  }
  if(selectedComment != undefined){
    defaultValues.text = selectedComment.text;
    defaultValues.rating = selectedComment.rating;
    defaultValues.id = selectedComment.id;
  }

  const [rating, setRating] = useState(defaultValues.rating);

  return (
    <>
      <Button sx={BackBtn} onClick={() => {changeFormState(); changeSelectedComment(undefined);}}>
        <ArrowBackIosIcon />
        назад
      </Button>
      <Typography variant="h4" fontWeight={600} sx={{ marginBottom: 2 }}>
        Комментарий к заказу
      </Typography>
      <Paper elevation={3} sx={{ marginTop: 2, p: 3, width: 'fit-content' }}>
        <StyledInput onSubmit={handleSubmit(onSubmit)}>
          <TextField
            defaultValue={defaultValues.text}
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
              precision={0.5}
              value={rating}
              onChange={(event, newValue) => setRating(newValue)}
            />
          </Box>
          <Box sx={{display: 'flex', justifyContent: 'end', marginTop: 1}}>
          <Button
            sx={OrangeBaseButton}
            type="submit"
          >
            Отправить
          </Button>
          {selectedComment != undefined && 
          <Button sx={{...OrangeBaseButton, ...{marginLeft: 1}}} onClick={() => deleteComment(selectedComment.id)}>
            Удалить
          </Button>
          }
          </Box>
        </StyledInput>
      </Paper>
    </>
  );
};

export default inject(({ clientStore }: Stores) => ({
  changeFormState: clientStore.changeShowCommentForm,
  selectedComment: clientStore.selectedComment,
  changeSelectedComment: clientStore.changeSelectedComment,
  deleteComment: clientStore.deleteComment
}))(CommentForm);
