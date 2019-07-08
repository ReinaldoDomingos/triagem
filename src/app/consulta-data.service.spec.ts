import { TestBed, inject } from '@angular/core/testing';

import { ConsultaDataService } from './consulta-data.service';

describe('ConsultaDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConsultaDataService]
    });
  });

  it('should be created', inject([ConsultaDataService], (service: ConsultaDataService) => {
    expect(service).toBeTruthy();
  }));
});
