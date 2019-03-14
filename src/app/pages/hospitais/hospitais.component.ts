import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/hospital/hospital.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { Hospital } from '../../models/hospital.model';

import { SweetAlert } from "sweetalert/typings/core";
import * as _swal from "sweetalert";
const swal: SweetAlert = _swal as any;

@Component({
    selector: 'app-hospitais',
    templateUrl: './hospitais.component.html',
    styles: []
})
export class HospitaisComponent implements OnInit {

    hospitais: Hospital[] =[];
    hospital: Hospital;
    constructor(public _hospitalService: HospitalService,
                public _modalUploadService: ModalUploadService) { }

    ngOnInit() {
        this.cargarHospitais();

        this._modalUploadService.noticacao
            .subscribe(() => this.cargarHospitais());
    }

    criarHospital() {
        swal({
            title: 'Carregar Hospitais',
            text: 'Adicione o nome do hospital',
            content: {
                element: 'input',
                    attributes: {
                    placehoder: '',
                    type: 'text',
                    },
            }
        }).then((valor: string) => {
            if (!valor || valor.length === 0) {
                return;
            }
            this._hospitalService.criarHospital(valor)
                .subscribe(() => this.cargarHospitais());
        });

    }


    cargarHospitais() {
        this._hospitalService.cargarHospitais()
            .subscribe(hospitais => this.hospitais = hospitais);
    }


    atualizarHospital(hospital: Hospital) {
        this._hospitalService.atualizarHospital(hospital)
            .subscribe();
    }

    apagarHospital(hospital: Hospital) {
        this._hospitalService.apagarHospital(hospital._id)
            .subscribe(() => this.cargarHospitais());
    }

    atualizarImg( hospital: Hospital ) {
        this._modalUploadService.mostrarModal( 'hospitais', hospital._id );
    }

    buscarHospital(termino: string) {
        if (termino.length <= 0) {
            this.cargarHospitais();
            return;
        }
        this._hospitalService.buscarHospital(termino)
            .subscribe(hospitais => this.hospitais = hospitais);
    }

    obterHospitalID() {

    }




}
