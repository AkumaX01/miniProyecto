import { TestBed } from '@angular/core/testing';

import { CompartirUsuarioService } from './compartir-usuario.service';

describe('CompartirUsuarioService', () => {
  let service: CompartirUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompartirUsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
