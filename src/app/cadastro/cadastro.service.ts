import { Injectable } from '@angular/core'

@Injectable()
export class CadastroService {

    private paciente = {
        sexo: 'Sexo',
        cidade: 'Cidade',
        unidade: 'Unidade', 
        nome: '',
        queixa: '',
        idade: '',
        classificacao:'',
        cor:''
    };

    getPaciente() {
        return this.paciente;
    }

    setPaciente(paciente) {
        this.paciente = paciente;
    }
}
