import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { Hospital } from '../../models/hospital.model';

import { SweetAlert } from "sweetalert/typings/core";
import * as _swal from "sweetalert";
const swal: SweetAlert = _swal as any;

@Injectable()
export class HospitalService {

  totalHospitais: number = 0;

  constructor( public http: HttpClient,  public _usuarioService: UsuarioService
  ) { }


  cargarHospitais() {

    let url = URL_SERVICOS + '/hospital';
    return this.http.get( url )
              .map( (resp: any) => {
                this.totalHospitais = resp.total;
                // console.log(resp);
                return resp.hospitais;
              });
  }

  obterHospitalID( id: string ) {

    let url = URL_SERVICOS + '/hospital/' + id;
    return this.http.get( url )
                .map( (resp: any) => resp.hospital );

  }

  apagarHospital( id: string ) {

    let url = URL_SERVICOS + '/hospital/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete( url )
                .map( resp =>  swal('Hospital Apagado', 'Hospital apagado corretamente', 'success') );

  }



  criarHospital( nome: string ) {

    let url = URL_SERVICOS + '/hospital';
    url += '?token=' + this._usuarioService.token;

    return this.http.post( url, { nome } )
              .map( (resp: any) => resp.hospital );

  }

  buscarHospital( termino: string ) {
    let url = URL_SERVICOS + '/buscar/collection/hospitais/' + termino;
    return this.http.get( url )
                .map( (resp: any) => resp.hospitais );

  }

  atualizarHospital( hospital: Hospital ) {

    let url = URL_SERVICOS + '/hospital/' + hospital._id;
    url += '?token=' + this._usuarioService.token;

    return this.http.put( url, hospital )
              .map( (resp: any) => {
                swal('Hospital Atualizado', hospital.nome, 'success');
                return resp.hospital;
              });

  }


}
