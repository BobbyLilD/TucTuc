import React, { useState } from 'react';
import styled from '@emotion/styled';
import { IoPulseOutline } from 'react-icons/io5';
import { Button, Card } from '@mui/material';

type ServiceAdressSettingsProps = {
  serviceName: string;
  defaultUrl: string;
  status: string;
  endPoint: string;
  setEndPoint: (string) => void;
  onClick: () => void;
};

const ComponentContainer = styled(Card)`
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

export const ServiceAddressSettings = ({
  serviceName,
  status,
  defaultUrl,
  endPoint,
  setEndPoint,
  onClick,
}: ServiceAdressSettingsProps): JSX.Element => {
  const [endPointState, setEndPointState] = useState<string>(defaultUrl);
  const [endPointCurrent, setEndPointCurrent] = useState<string>(endPoint);

  console.log(serviceName + ' ' + status);

  return (
    <ComponentContainer>
      <div>
        <span>{`${serviceName}`}</span>
        <StyledStatusConteiner>
          {status == '200' ? (
            <IoPulseOutline size="25" />
          ) : (
            <label style={{ color: 'red' }}>{status}</label>
          )}
        </StyledStatusConteiner>
      </div>
      <InnerContainer>
        <div>
          <label>End point:</label>
          <StyledInput
            type="string"
            defaultValue={defaultUrl}
            onChange={(e: any) => setEndPointState(e.target.value)}
          />
          <label>{`CurrentEndPoint: ${endPointCurrent}`}</label>
        </div>
        <Button
          onClick={() => {
            console.log('change');
            if (endPointState) {
              console.log('change');

              setEndPoint(endPointState);
              setEndPointCurrent(endPointState);
              onClick();
            }
          }}
        >
          Save
        </Button>
      </InnerContainer>
    </ComponentContainer>
  );
};
