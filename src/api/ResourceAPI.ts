import BaseAPI from './BaseAPI';

export const RESOURCE_URL = 'https://ya-praktikum.tech/api/v2/resources';

export interface Resource {
	id: number;
	user_id: number;
	path: string;
	filename:	string;
	content_type: string;
	content_size: number;
	upload_date: string;
}

export class ResourceAPI extends BaseAPI {
	constructor() {
		super('/resources');
	}

	read(identifier?: string | number): Promise<Blob> {
		return this.http.get(`${identifier}`, 'blob');
	}

	create(file: File): Promise<Resource> {
		const formData = new FormData();
		formData.append('resource', file);

		return this.http.post('/', formData, 'multipart/form-data');
	}

	update = undefined;
	delete = undefined;
}

export default new ResourceAPI();
