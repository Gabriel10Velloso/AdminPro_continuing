import { Component, OnInit, group } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

declare function  init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

    formulario: FormGroup;

    constructor() { }
    
    // função de validação igaus para o formulário
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
            console.log('Devem concordar com as condições ');
            return;
        }
        console.log(this.formulario.value);
    }
    
}
