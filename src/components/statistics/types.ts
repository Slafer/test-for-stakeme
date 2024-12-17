interface Noder {
  moniker: string;
  address: string;
}

export interface MapDataResponse {
  noder: Noder;
  country: string;
  city: string;
  lat: number;
  lon: number;
  isp: string;
  as: string;
  ip: string;
}



