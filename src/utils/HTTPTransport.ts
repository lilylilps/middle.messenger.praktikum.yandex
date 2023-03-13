export enum Method {
    Get = 'Get',
    Post = 'Post',
    Put = 'Put',
    Patch = 'Patch',
    Delete = 'Delete'
}

type Options = {
    method: Method;
    responseType?: XMLHttpRequestResponseType;
    contentType?: string;
    data?: any;
};
  
class HTTPTransport {
    static API_URL = 'https://ya-praktikum.tech/api/v2';
    protected endpoint: string;
  
    constructor(endpoint: string) {
        this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
    }
  
    public get<Response>(path = '/', responseType?: XMLHttpRequestResponseType): Promise<Response> {
        return this.request<Response>(this.endpoint + path, {
            method: Method.Get,
            responseType: responseType
        });
    }
  
    public post<Response = void>(path: string, data?: unknown): Promise<Response> {
        return this.request<Response>(this.endpoint + path, {
            method: Method.Post,
            data,
        });
    }
  
    public put<Response = void>(path: string, data: unknown, contentType?: string): Promise<Response> {
        return this.request<Response>(this.endpoint + path, {
            method: Method.Put,
            data,
            contentType
        });
    }
  
    public patch<Response = void>(path: string, data: unknown): Promise<Response> {
        return this.request<Response>(this.endpoint + path, {
            method: Method.Patch,
            data,
        });
    }
  
    public delete<Response>(path: string, data?: unknown): Promise<Response> {
        return this.request<Response>(this.endpoint + path, {
            method: Method.Delete,
            data
        });
    }
  
    private request<Response>(url: string, options: Options = {method: Method.Get}): Promise<Response> {
        const {method, data} = options;
    
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url);

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            xhr.onreadystatechange = (_e) => {

                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status < 400) {
                        resolve(xhr.response);
                    } else {
                        reject(xhr.response);
                    }
                }
            };
  
            xhr.onabort = () => reject({reason: 'abort'});
            xhr.onerror = () => reject({reason: 'network error'});
            xhr.ontimeout = () => reject({reason: 'timeout'});
    
            xhr.withCredentials = true;
            xhr.responseType = options.responseType ?? 'json';
    
            if (method === Method.Get || !data) {
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send();
            } else if (options.contentType === 'multipart/form-data') {
                xhr.send(data);
            } else {
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(JSON.stringify(data));
            }
        });
    }
}

export default HTTPTransport;
