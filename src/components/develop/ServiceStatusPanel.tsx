import styled from '@emotion/styled';
import { inject } from 'mobx-react';
import React from 'react';
import { storeApi } from '../../api/apiClient';
import { storeRawApi } from '../../api/apiConfig';
import { Stores } from '../../types';
import { ServiceAddressSettings } from './ServiceAddressSettings';

type ServiceStatusPanelProps = {
  converterStatus: string;
  storeStatus: string;
  documentsStatus: string;
  pingServices: () => void;
};

const ServiceStatusContainer = styled.div`
  min-width: 500px;
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-top: 30px;
  overflow-y: scroll;
  padding-right: 7px;
  margin-right: -7px;
  > * {
    margin-bottom: 10px;
  }
`;

const ServiceStatusPanel = ({
  converterStatus,
  storeStatus,
  documentsStatus,
  pingServices,
}: ServiceStatusPanelProps) => {
  return (
    <ServiceStatusContainer>
      <ServiceAddressSettings
        defaultUrl="http://127.0.0.1:3001"
        serviceName="Store"
        endPoint={storeApi.getUrl()}
        setEndPoint={(url: string) => storeApi.changeClient(url, storeRawApi)}
        onClick={() => {
          pingServices();
        }}
        status={storeStatus}
      />
    </ServiceStatusContainer>
  );
};

export default inject(({ serviceStatusStore }: Stores) => ({
  storeStatus: serviceStatusStore.storeStatus,
  pingServices: serviceStatusStore.pingServices,
}))(ServiceStatusPanel);
