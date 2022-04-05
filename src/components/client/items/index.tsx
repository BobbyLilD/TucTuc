import { inject } from 'mobx-react';
import React, { useEffect } from 'react';
import { Stores } from '../../../types';
import Footer from '../base/Footer';
import CommentList from './sub/CommentList';
import ControlBlock from './sub/ControlBlock';
import ItemGrid from './sub/ItemGrid';

type ItemsComponentProps = {
  showCommentList: boolean;
};

const ItemsComponent = ({ showCommentList }: ItemsComponentProps) => {
  return (
    <>
      <ControlBlock />
      {!showCommentList ? <ItemGrid /> : <CommentList />}
      <Footer paddingPercentage={10} />
    </>
  );
};

export default inject(({ restaurantsStore }: Stores) => ({
  showCommentList: restaurantsStore.showCommentList,
}))(ItemsComponent);
