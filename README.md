## Seção: 13 - 150 RegisterComponent (Validação)
* 150 ngNativeValidate [formGroup]="formulario"
  * Validação Formulários   formulario: FormGroup e outros exemplos 
     > input id="phonenum" type="tel" pattern="^\d{4}-\d{3}-\d{4}$" required
   * this.formulario.setValue - mandar formulário preenchido para testar validação
     > this.formulario.setValue({  nome: 'Eu',  email: 'eu@eu.com',  password: '123',   password2: '123',       condicoes: true   });   
}