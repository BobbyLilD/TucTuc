import React, { useState } from 'react';
import styled from '@emotion/styled';
import { IoPulseOutline } from 'react-icons/io5';
import { Button } from '../common/StyledComponents';

type ServiceAdressSettingsProps = {
  serviceName: string;
  getEndPoint: () => string;
  setEndPoint: (string) => string | null;
  onClick: () => void;
  status: string;
};

const ComponentContainer = styled.div`
  padding: 15px;
`;

const InnerContainer = styled.div`
  display: flex;
  width: 100%;
  place-content: space-between;
  align-items: center;
`;

const StyledInput = styled.input`
  margin-right: 10px;
  margin-left: 10px;
`;

const StyledStatusConteiner = styled.span`
  margin-left: 10px;
  svg * {
    color: green;
  }
`;

export const ServiceAdressSettings = (props: ServiceAdressSettingsProps): JSX.Element => {
  const [endPointState, setEndPointState] = useState<string>();
  const [endPointCurrent, setEndPointCurrent] = useState<string>(props.getEndPoint);

  return (
    <ComponentContainer>
      <div>
        <span>{`${props.serviceName}`}</span>
        <StyledStatusConteiner>
          {props.status == '200' ? (
            <IoPulseOutline size="25" />
          ) : (
            <label style={{ color: 'red' }}>{props.status}</label>
          )}
        </StyledStatusConteiner>
      </div>
      <InnerContainer>
        <div>
          <label>End point:</label>
          <StyledInput
            type="string"
            defaultValue="https://"
            onChange={(e: any) => setEndPointState(e.target.value)}
          />
          <label>{`CurrentEndPoint: ${endPointCurrent}`}</label>
        </div>
        <Button
          onClick={() => {
            if (endPointState) {
              const result = props.setEndPoint(endPointState);
              if (result) {
                setEndPointCurrent(endPointState);
              }
              props.onClick();
            }
          }}
        >
          Save
        </Button>
      </InnerContainer>
    </ComponentContainer>
  );
};
