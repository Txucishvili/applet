
const API_URL = "/api";

const Fetch = (url: string, params?: any) => {
  return fetch(`${API_URL}${url}`, params).then(r => r.json())
}

export interface HTTPSuccessType {
  data: any;
  status?: boolean;
}

export interface HTTPErrorType {
  status: string;
  statusCode: number;
}

export const HTTPSuccess = function(this: HTTPSuccessType, props: HTTPSuccessType) {
    this.data = props.data;
    this.status = true;
}
export const HTTPError = function(this: HTTPErrorType, props: HTTPErrorType) {
    this.statusCode = props.statusCode;
    this.status = props.status;
}

export default Fetch;