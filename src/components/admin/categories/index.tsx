import { Box } from '@mui/system';
import { inject } from 'mobx-react';
import React from 'react';
import CardGrid from './sub/CardGrid';
import { Stores } from '../../../types';
import SearchBlock from '../../common/SearchBlock';
import CategoryForm from './sub/CategoryForm';
import { AdminContentSubContainer } from '../../common/StyledComponents';

type CategoriesProps = {
  categoryAdd: boolean;
  changeCategoryState: () => void;
};

const categoriesComponent = ({ categoryAdd, changeCategoryState }: CategoriesProps) => {
  return (
    <Box>
      <SearchBlock changeAddState={changeCategoryState} />
      <Box sx={AdminContentSubContainer}>
        <CardGrid />
      </Box>
      {categoryAdd ? <CategoryForm /> : <></>}
    </Box>
  );
};

export default inject(({ adminPanelStore }: Stores) => ({
  categoryAdd: adminPanelStore.categoryAdd,
  changeCategoryState: adminPanelStore.changeCategoryAdd,
}))(categoriesComponent);
