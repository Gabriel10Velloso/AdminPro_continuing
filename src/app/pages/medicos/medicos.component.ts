import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../services/medico/medico.service';
import { Medico } from '../../models/medico.model';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html'
})
export class MedicosComponent implements OnInit {
    medicos: Medico[];
  constructor( public _medicoService: MedicoService) { }

  ngOnInit() {
      this.cargarMedicos();
  }


  cargarMedicos() {
    this._medicoService.cargarMedicos()
          .subscribe( medicos => this.medicos = medicos );
  }

  cambioHospital() {

  }

  buscarMedico( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargarMedicos();
      return;
    }

    this._medicoService.buscarMedicos( termino )
            .subscribe( medicos =>  this.medicos = medicos );
  }


  deletarMedico(medico: Medico) {
      this._medicoService.deletarMedico(medico._id)
          .subscribe(() => this.cargarMedicos()); // isso é interessante mas está chamando novamente carregarMedicos

  }




  



}
