import BaseAPI from './BaseAPI';

export class ResourceAPI extends BaseAPI {
  constructor() {
    super('/resources');
  }

  read(identifier?: string | number): Promise<Blob> {
    return this.http.get(`${identifier}`, 'blob');
  }

  create = undefined;
  update = undefined;
  delete = undefined;
}

export default new ResourceAPI();
