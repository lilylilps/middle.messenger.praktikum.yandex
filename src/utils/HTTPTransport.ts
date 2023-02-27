enum HTTPMethods { 
    GET = 'GET', 
    POST = 'POST', 
    PUT = 'PUT', 
    DELETE = 'DELETE', 
};

type HTTPOptions = {
  headers?: Record<string, string>;
  method?: HTTPMethods;
  timeout?: number;
  data?: Record<string, any>;
};

type HTTPRequest = (url: string, options?: HTTPOptions) => Promise<XMLHttpRequest>;
   
function queryStringify(data: Record<string, any>) { 
    if (typeof data !== 'object') { 
        throw new Error('Data is not object'); 
    } 
     
    const keys = Object.keys(data); 

    return keys.reduce((result, key, index) => { 
        return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`; 
    }, '?'); 
} 
   
class HTTPTransport { 
    get: HTTPRequest = (url, options = {}) => {
        return this.request(url, {...options, method: HTTPMethods.GET}); 
    }; 
   
    post: HTTPRequest = (url, options = {}) => { 
        return this.request(url, {...options, method: HTTPMethods.POST}); 
    }; 
   
    put: HTTPRequest = (url, options = {}) => { 
        return this.request(url, {...options, method: HTTPMethods.PUT}); 
    }; 
   
    delete: HTTPRequest = (url, options = {}) => {  
        return this.request(url, {...options, method: HTTPMethods.DELETE}); 
    }; 
   
    request: HTTPRequest = (url, options = {}, timeout = 5000): Promise<XMLHttpRequest> => { 
        const {headers = {}, method, data} = options; 
   
        return new Promise(function(resolve, reject) { 
            if (!method) { 
                reject('No method provided'); 
                return; 
            } 
    
            const xhr = new XMLHttpRequest(); 
            const isGet = method === HTTPMethods.GET; 
   
            xhr.open( 
                method,  
                isGet && !!data 
                    ? `${url}${queryStringify(data)}`
                    : url, 
            ); 
   
            Object.keys(headers).forEach(key => { 
                xhr.setRequestHeader(key, headers[key]); 
            }); 
        
            xhr.onload = function() { 
                resolve(xhr); 
            }; 
        
            xhr.onabort = reject; 
            xhr.onerror = reject; 
        
            xhr.timeout = timeout; 
            xhr.ontimeout = reject; 
            
            if (isGet || !data) { 
                xhr.send(); 
            } else { 
                xhr.send(JSON.stringify(data)); 
            } 
       }); 
    }; 
}

export default HTTPTransport;
