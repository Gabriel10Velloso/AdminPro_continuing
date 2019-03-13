import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MedicoService } from './../../services/medico/medico.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

import { Hospital } from './../../models/hospital.model';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Medico } from '../../models/medico.model';


@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html'
})

export class MedicoComponent implements OnInit {

    hospitais: Hospital[] = [];
    medico: Medico = new Medico('', '', '', '', '');
    hospital: Hospital = new Hospital('');

  constructor(public _medicoService: MedicoService,
              public _hospitalService: HospitalService,
              public router: Router,
              public activatedRoute: ActivatedRoute,
              public _modalUploadService: ModalUploadService) {

                activatedRoute.params.subscribe( params => {
                    // console.log("Só params", params);
                    let id = params['id'];
                    // console.log("Só ID", id);
                    if ( id !== 'novo' ) {
                      this.cargarMedico( id );
                    
                    }
                  });
              }

  ngOnInit() {
    this.cargarHospitais();

    this._modalUploadService.noticacao
        .subscribe(resp=> {
            // console.log(resp);
            this.medico.img = resp.medico.img;
        });
  }

  alterarFoto() {
    this._modalUploadService.mostrarModal( 'medicos', this.medico._id );
  }

  cambioHospital(id: string) {  // aula 205
    // na html se eu colcar a penas $event teorna um arry target.value -- e dentro est´o id que estou passando
    //   console.log(event); // basicamente vou pegar evento.target.value que estou passando o _id do hospital
    // console.log(id);
    this._hospitalService.obterHospitalID(id)
    .subscribe( hospital => this.hospital = hospital );


  }


  cargarHospitais() {
    this._hospitalService.cargarHospitais()
        .subscribe(hospitais => this.hospitais = hospitais);
}


  guardarMedico(f: NgForm) {
    //   console.log(f.valid);
    //   console.log(f.value);

      if ( f.invalid ) {
        return;
      }
      this._medicoService.guardarMedico( this.medico )
        .subscribe( medico => {
            this.medico._id = medico._id;
            this.router.navigate(['/medico', medico._id ]);
        });
    }

    cargarMedico( id: string ) {
        this._medicoService.cargarMedico( id )
              .subscribe( medico => {
                // console.log( 'Médico', medico );
                this.medico = medico;
                this.medico.hospital = medico.hospital._id;
                this.cambioHospital( this.medico.hospital );
              });
      }

}
