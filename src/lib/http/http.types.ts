export interface BasicRequestHeaders {
  'Content-Type': string;
  [key: string]: string;
}

export interface BasicRequestOptions {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers: BasicRequestHeaders;
  query?: {
    [key: string]: string;
  };
  params?: {
    [key: string]: string;
  };
}

export interface BasicPOSTRequestOptions extends BasicRequestOptions {
  method: 'POST';
  body: {
    [key: string]: any;
  };
}

export interface BasicGETRequestOptions extends BasicRequestOptions {
  method: 'GET';
}

export interface BasicPUTRequestOptions extends BasicRequestOptions {
  method: 'PUT';
  body: {
    [key: string]: any;
  };
  params: {
    id: string;
  };
}

export interface BasicDELETERequestOptions extends BasicRequestOptions {
  method: 'DELETE';
  params: {
    id: string;
  };
}
