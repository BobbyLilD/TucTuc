import { Box, Button, Grid, Input, Modal, TextField } from '@mui/material';
import { inject } from 'mobx-react';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { StyledImageInput, StyledButton } from '../../../common/StyledComponents';
import { Stores } from '../../../../types';
import { letterRegex } from '../../../../commons/const';
import {AdminDataInputSX} from '../../../common/StyledComponents';
import styled from '@emotion/styled';

type CategoryFormProps = {
  categoryAdd: boolean;
  categoryChangeState: () => void;
};

interface IFromInput {
  Name: string;
  SVG_Active: File;
  SVG_Disabled: File;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '400px',
  height: '300px',
  backgroundColor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  'flex-direction': 'column',
  'justify-content': 'space-evenly'
};

export const StyledLabel = styled.label`
  border: 1px solid orange;
  text-align: center;
  padding-top: 12px;
  padding-bottom: 12px;
  // width: inherit;
  border-radius: 12px;
  cursor: pointer;
  font-size: 8pt;
  text-transform: uppercase;
  text-align: center;
`;

const CategoryForm = ({ categoryAdd, categoryChangeState }: CategoryFormProps) => {
  const { register, handleSubmit } = useForm<IFromInput>();
  const onSubmit: SubmitHandler<IFromInput> = (data) => console.log(data);

  return (
    <Modal
      open={categoryAdd}
      onClose={categoryChangeState}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Box sx={style}>
        <TextField sx={AdminDataInputSX} placeholder="Название категории" {...register('Name', {required: true, pattern: letterRegex})} fullWidth/>

        <StyledLabel>
          <StyledImageInput {...register('SVG_Active')} type="file" />
          Загрузить активную картинку
        </StyledLabel>

        <StyledLabel>
          <StyledImageInput {...register('SVG_Disabled')} type="file" />
          Загрузить не активную картинку
        </StyledLabel>

        <Button type="submit" sx={StyledButton}>
          Добавить
        </Button>
      </Box>
    </Modal>
  );
};

export default inject(({ adminPanelStore }: Stores) => ({
  categoryAdd: adminPanelStore.categoryAdd,
  categoryChangeState: adminPanelStore.changeCategoryAdd,
}))(CategoryForm);
