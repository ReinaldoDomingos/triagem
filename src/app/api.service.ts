import {Injectable} from '@angular/core';
import {environment} from 'environments/environment';
import {Http, Response} from '@angular/http';
import {Consulta} from './consulta';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do';

const API_URL = environment.apiUrl;

@Injectable()
export class ApiService {

	constructor(private http: Http) {
	}


	public getAllConsultas(): Observable<Consulta[]> {
		return this.http
		.get(API_URL + '/consultas')
		.map(response => {
			const consultas = response.json();
			return consultas.map((consulta) => new Consulta(consulta));
		})
		.catch(this.handleError);
	}

	public createConsulta(consulta: Consulta): Observable<Consulta> {
		let retorno = this.http
		.post(API_URL + '/consultas', consulta)
		.map(response => {
			return new Consulta(response.json());
		})	
		.catch(this.handleError);
		return retorno
	}
	

	public getConsultaById(consultaId: number): Observable<Consulta> {
		return this.http
		.get(API_URL + '/consultas/' + consultaId)
		.map(response => {
			return new Consulta(response.json());
		})
		.catch(this.handleError);
	}

	public updateConsulta(consulta: Consulta): Observable<Consulta> {
		return this.http
		.put(API_URL + '/consultas/' + consulta.id, consulta)
		.map(response => {
			return new Consulta(response.json());
		})
		.catch(this.handleError);
	}

	public deleteConsultaById(consultaId: number): Observable<null> {
		return this.http
		.delete(API_URL + '/consultas/' + consultaId)
		.map(response => null)
		.catch(this.handleError);
	}

	private handleError(error: Response | any) {
		console.error('ApiService::handleError', error);
		return Observable.throw(error);
	}
}