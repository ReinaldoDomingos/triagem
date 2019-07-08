import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Consulta } from './consulta';
import { ConsultaDataService } from './consulta-data.service';

@Injectable()
export class ConsultasResolver implements Resolve<Observable<Consulta[]>> {

  constructor(private consultaDataService: ConsultaDataService) {
  }

  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<Consulta[]> {
    return this.consultaDataService.getAllConsultas();
  }
} 