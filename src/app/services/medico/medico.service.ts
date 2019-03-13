import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { URL_SERVICOS } from './../../config/config';
import { UsuarioService } from "../usuario/usuario.service";
import { Medico } from "../../models/medico.model";

@Injectable()
export class MedicoService {

    totalMedicos: number = 0;

    constructor(
        public http: HttpClient,
        public _usuarioService: UsuarioService
    ) { }

    cargarMedicos() {
        let url = URL_SERVICOS + "/medico";

        return this.http.get(url).map((resp: any) => {
            this.totalMedicos = resp.total;
            return resp.medicos;
        });
    }

    cargarMedico(id: string) {
        let url = URL_SERVICOS + "/medico/" + id;

        return this.http.get(url).map((resp: any) => resp.medico);
    }

    buscarMedicos(termino: string) {
        let url = URL_SERVICOS + "/buscar/collection/medicos/" + termino;
        return this.http.get(url).map((resp: any) => resp.medicos);
    }

    deletarMedico(id: string) {
        let url = URL_SERVICOS + "/medico/" + id;
        url += "?token=" + this._usuarioService.token;

        return this.http.delete(url).map(resp => {
            swal("Médico Deletado", "Médico deletado corretamente", "success");
            return resp;
        });
    }
    // atualizar e criar 
    guardarMedico(medico: Medico) {
        // console.log('qqqqqqq', medico);
        // console.log('bbbbbb',medico._id);
        let url = URL_SERVICOS + "/medico";

        if (medico._id) {
            // atualizado
            // console.log(url);
            url += "/" + medico._id;
            url += "?token=" + this._usuarioService.token;
            // console.log(url);
            return this.http.put(url, medico).map((resp: any) => {
                swal("Médico Atualizado", medico.nome, "success");
                return resp.medico;
            });
        } else {
            // criado
            url += "?token=" + this._usuarioService.token;
            return this.http.post(url, medico).map((resp: any) => {
                swal("Médico Criado", medico.nome, "success");
                return resp.medico;
            });
        }
    }
}
