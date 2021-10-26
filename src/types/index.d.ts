import MainStore from '../stores/mainStore';
import OptionsStore from '../stores/optionsStore';
import ServiceStatusStore from '../stores/serviceStatusStore';

declare module '*.jpg';
declare module '*.png';

declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

export interface Config {
  apiGateway: {
    url: string;
  };
  debug?: boolean;
  wsAddress: string;
  metricaId: number;
}

export type Stores = {
  mainStore: MainStore;
  optionsStore: OptionsStore;
  serviceStatusStore: ServiceStatusStore;
};

export type Color = {
  a: number;
  b: number;
  g: number;
  r: number;
};
