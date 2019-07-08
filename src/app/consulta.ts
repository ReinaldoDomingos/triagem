export class Consulta {
	id: number;
	data: string;
	cidade: string;
	unidade: string;
	idade: string;
	gravidade: string;

	constructor(values: Object = {}) {
		Object.assign(this, values);
	}
} 