import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { comment } from '../../../../types';
import StarIcon from '@mui/icons-material/Star';

type CommentProps = {
  comment: comment;
};

const containerSX = {
    paddingTop: 2,
    paddingX: 1
}

const Comment = ({ comment }: CommentProps) => {
  let dateString =
    ('0' + comment.date!.getDate()).slice(-2) +
    '.' +
    ('0' + (comment.date!.getMonth() + 1)).slice(-2) +
    '.' +
    comment.date!.getFullYear();

  return (
    <Box sx={containerSX}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 0.5}}>
        <Typography fontSize={14}>{`${comment.name} ${comment.rating}`}<StarIcon sx={{color: 'orange', fontSize: 'inherit'}}/></Typography>
        <Typography color={'gray'}>{dateString}</Typography>
      </Box>
      <Typography variant='subtitle1' color={'gray'} marginLeft={1} marginBottom={1}>
          {comment.text}
      </Typography>
    </Box>
  );
};

export default Comment;
