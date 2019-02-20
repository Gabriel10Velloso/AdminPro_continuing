import { Injectable } from "@angular/core";
import { URL_SERVICOS } from "../../config/config";

import { HttpClient } from "@angular/common/http";

import { Usuario } from "./../../models/usuario.model";
import { Router } from "@angular/router";

// import 'rxjs/Rx';
import "rxjs/add/operator/map";

// Gambiarra pra funcinar SweetAlert
import { SweetAlert } from "sweetalert/typings/core";
import * as _swal from "sweetalert";
const swal: SweetAlert = _swal as any;

@Injectable()
export class SubindoArquivoService {
  usuario: Usuario;
  token;

  constructor(public http: HttpClient, public router: Router) {}

  // foi necessatio criar uma puro Vanilla JS
  // dá pra subir qualquer coisa -- é só adaptar.
  subirArquivo(arquivo: File, tipo: string, id: string) { // aula 172

    return new Promise((resolve, reject) => {

      let formData = new FormData(); // payload que vou manda subir -- javascript puro
      let xhr = new XMLHttpRequest(); // // tenho que mandar o request  por ajax

      formData.append("img", arquivo, arquivo.name);

      xhr.onreadystatechange = function() {
        // confit request ajax
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log("Imagem subiu");
            resolve(JSON.parse(xhr.response));
          } else {
            console.log(" Erro ao subir imagem! ");
            reject(xhr.response);
          }
        }
      };
      let url = URL_SERVICOS + '/upload/' + tipo + '/' + id;

      xhr.open('PUT', url, true );
      xhr.send( formData );
    });
  }
}
