import { inject, Observer } from 'mobx-react';
import React from 'react';
import { changeDocumentsEndPoint, getDocumentsEndPoint } from '../../api/apiClient';
import { Stores } from '../../types';
import { ServiceAdressSettings } from './ServiceAdressSettings';

type ServiceStatusPanelProps = {
  converterStatus: string;
  storeStatus: string;
  pingServices: () => void;
};

const ServiceStatusPanel = (props: ServiceStatusPanelProps) => {
  return (
    <Observer>
      {() => (
        <>
          <ServiceAdressSettings
            serviceName="Converter"
            getEndPoint={getDocumentsEndPoint}
            setEndPoint={changeDocumentsEndPoint}
            onClick={() => {
              props.pingServices();
            }}
            status={props.converterStatus}
          />
          <div>{`Store: ${props.storeStatus}`}</div>
        </>
      )}
    </Observer>
  );
};

export default inject((stores: Stores) => ({
  converterStatus: stores.serviceStatusStore.converterStatus,
  storeStatus: stores.serviceStatusStore.storeStatus,
  pingServices: stores.serviceStatusStore.pingServices,
}))(ServiceStatusPanel);
