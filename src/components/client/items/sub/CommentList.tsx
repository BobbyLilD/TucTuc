import { Box, Button, Divider, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { BackBtn } from '../../../common/StyledComponents';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { inject } from 'mobx-react';
import { comment, Restaurant, Stores } from '../../../../types';
import { useParams } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import Comment from './Comment';

const paddingPercentage = 18;
const RATING_FONT_SIZE = 24;
const CONTENT_PADDING = 3;

type CommentListProps = {
  getComments: (id: string) => void;
  changeShowState: () => void;
  commentList: comment[];
  selectedRestaurant: Restaurant;
};

const CommentList = ({
  getComments,
  changeShowState,
  commentList,
  selectedRestaurant,
}: CommentListProps) => {
  const { id } = useParams();

  useEffect(() => {
    getComments(id);
  });

  let ratingStars: JSX.Element[] = [];
  for (let i = 0; i < parseFloat(selectedRestaurant.rating.toFixed(0)); i++) {
    ratingStars.push(<StarIcon sx={{ color: 'orange', fontSize: RATING_FONT_SIZE }} />);
  }
  for (let i = 0; i < 5 - parseFloat(selectedRestaurant.rating.toFixed(0)); i++) {
    ratingStars.push(<StarIcon sx={{ color: 'gray', fontSize: RATING_FONT_SIZE }} />);
  }

  let comments: JSX.Element[] = [];
  if (commentList != undefined) {
    for (let i = 0; i < commentList.length; i++) {
      comments.push(
        <>
          <Comment comment={commentList[i]} />
          <Divider />
        </>,
      );
    }
  }

  return (
    <Box sx={{ paddingX: paddingPercentage }}>
      <Button sx={BackBtn} onClick={changeShowState}>
        <ArrowBackIosIcon />
        назад
      </Button>
      <Box sx={{ paddingX: CONTENT_PADDING }}>
        <Typography variant="h4" fontWeight={600} marginTop={2}>
          {selectedRestaurant.name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
          {ratingStars}
          <Typography marginLeft={1} fontSize={RATING_FONT_SIZE}>
            {`${selectedRestaurant.rating}/5`}
          </Typography>
        </Box>
        <Typography variant="h6" fontSize={16} marginLeft={3} marginY={2}>
          Комментарии ({selectedRestaurant.commentIDs.length})
        </Typography>
        <Divider />
        {comments}
      </Box>
    </Box>
  );
};

export default inject(({ restaurantsStore }: Stores) => ({
  changeShowState: restaurantsStore.changeCommentListShow,
  getComments: restaurantsStore.getCommentsByPlaceID,
  commentList: restaurantsStore.commentList,
  selectedRestaurant: restaurantsStore.selectedRestaurant,
}))(CommentList);
