import { Component, OnInit, group } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from './../models/usuario.model';
import { UsuarioService } from './../services/usuario/usuario.service';

// Gambiarra pra funcinar SweetAlert
import { SweetAlert } from 'sweetalert/typings/core';
import * as _swal from 'sweetalert';
const swal: SweetAlert = _swal as any;


// serve para o carregamento de préloading   <p class="loader__label">Gabriel Velloso</p>
declare function  init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {
    usuario: Usuario;
    formulario: FormGroup;

    constructor(private _usuarioService: UsuarioService,
                public router: Router    ) { }

    // função de validação igaus para o formulário (senha)
    saoIguais(campo1: string, campo2: string) {
    return(group: FormGroup) => {
        let passo1 = group.controls[campo1].value;
        let passo2 = group.controls[campo2].value;
    
        if (passo1 === passo2) {
            return null
        }
        return {
            saoIguais: true
        };
    };
    }

    ngOnInit() {
        init_plugins();
    
        this.formulario = new FormGroup({
            nome: new FormControl(null , Validators.required),
            email: new FormControl(null , [Validators.required, Validators.email]),
            password: new FormControl(null , Validators.required),
            password2: new FormControl(null , Validators.required),
            condicoes: new FormControl(false),
        }, { validators: this.saoIguais('password' , 'password2')});
    
        // setando formulário para ser preenchido automatiamente - desenvolvimento
        this.formulario.setValue({
            nome: 'Gabriel',
            email: 'ga@ga.com',
            password: '123',
            password2: '123',
            condicoes: true
        });
    }
    
    
    registrarUsuario() {
        if (this.formulario.invalid) {
        return;
        }
    
        if (!this.formulario.value.condicoes) {
            swal('Important !', 'Devem concordar com as condições!', 'warning');

            return;
        }

        let usuario = new Usuario(
            this.formulario.value.nome,
            this.formulario.value.email,
            this.formulario.value.password,
        );
        
        this._usuarioService.criarUsuario(usuario)
            .subscribe(res => {
                console.log(res);
                this.router.navigate(['login']);
            });

        console.log(this.formulario.value);
    }
    
}
