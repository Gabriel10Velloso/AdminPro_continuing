import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { Medico } from '../../models/medico.model';
import { Hospital } from '../../models/hospital.model';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { URL_SERVICOS } from '../../config/config';

@Component({
    selector: 'app-busca-geral',
    templateUrl: './busca-geral.component.html',
    styles: []
})
export class BuscaGeralComponent implements OnInit {
    usuarios: Usuario[] = [];
    medicos: Medico[] = [];
    hospitais: Hospital[] = [];

    constructor(public activatedRoute: ActivatedRoute, public http: HttpClient) {
        activatedRoute.params.subscribe(params => {
            let termino = params['termino'];
            this.buscar(termino);
        });
    }

    ngOnInit() {  }

    buscar(termino: string) {
        let url = URL_SERVICOS + '/buscar/todo/' + termino;
        this.http.get( url )
            .subscribe( (resp: any) => {
              console.log( resp );
              this.hospitais = resp.hospitais;
              this.medicos = resp.medicos;
              this.usuarios = resp.usuarios;
            });
    }
}
