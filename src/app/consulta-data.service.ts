import {Injectable} from '@angular/core';
import {Consulta} from './consulta';
import {ApiService} from './api.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ConsultaDataService {

	lastId = 0;
	consultas: Consulta[] = [];

	constructor(private api: ApiService) {
	}

	salvarConsultasDrive(consulta:Consulta): Observable<Consulta>{
		return this.api.salvarConsultasDrive(consulta);
	}

	addConsulta(consulta: Consulta): Observable<Consulta> {
		return this.api.createConsulta(consulta);
	}

	// Simulate DELETE /consultas/:id
	deleteConsultaById(consultaId: number): Observable<Consulta> {
		return this.api.deleteConsultaById(consultaId);
	}

	// Simulate PUT /consultas/:id
	updateConsulta(consulta: Consulta): Observable<Consulta> {
		return this.api.updateConsulta(consulta);
	}

	// Simulate GET /consultas
	getAllConsultas(): Observable<Consulta[]> {
		return this.api.getAllConsultas();
	}

	// Simulate GET /consultas/:id
	getConsultaById(consultaId: number): Observable<Consulta> {
		return this.api.getConsultaById(consultaId);
	}
}
