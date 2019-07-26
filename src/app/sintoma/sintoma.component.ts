import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SintomaService } from './sintoma.service';
import { CadastroService } from '../cadastro/cadastro.service';
import { Consulta} from '../consulta';
import {ConsultaDataService} from '../consulta-data.service';
import {Http, Response} from '@angular/http';

declare var $: any;

@Component({ 
  selector: 'app-sintoma',
  templateUrl: './sintoma.component.html',
  styleUrls: ['./sintoma.component.css'],
  providers: [ConsultaDataService]
})

export class SintomaComponent implements OnInit {
  consultas: Consulta[] = [];

  newConsulta: Consulta = new Consulta();
  cadastroService: CadastroService;
  sintomaGeral: string;
  private idSintomaGeral: string;

  estadoAtual: string = "vermelho";
  gravidade: string;
  resumoGravidade: string;

  // ultimoNivel: boolean = false;

  sintomas = {};
  sintomasVermelhos;
  sintomasLaranjas;
  sintomasAmarelos;
  sintomasVerdes;

  @Output()
  add: EventEmitter<Consulta> = new EventEmitter();

  constructor(
    private route: ActivatedRoute,
    private sintomaService: SintomaService,
    _cadastroService: CadastroService,
    private consultaDataService: ConsultaDataService,
    private router: Router,
    private http: Http
    ) { 
    this.cadastroService = _cadastroService;
  }



  ngOnInit() {
    //Pegando parâmetro da url
    this.idSintomaGeral = this.route.snapshot.params['sintoma'];
    //Capturando o json responsável pelo sintoma
    this.buscarJsonSintoma();
    //Salvando o nome do sintoma
    this.sintomaGeral = this.sintomaService.getNomeSintomaPorId(this.idSintomaGeral);

    this.route.data
    .map((data) => data['consultas'])
    .subscribe(
      (consultas) => {
        this.consultas = consultas;
      }
      );
    console.log(this.consultas) 
  }

  possui() {

    if (this.estadoAtual == "vermelho") {
      this.gravidade = "Emergência"
      this.resumoGravidade = "Risco imediato de perder a vida."
    } else if (this.estadoAtual == "laranja") {
      this.gravidade = "Muito urgente"
      this.resumoGravidade = "Risco imediato de perda de função de órgãos ou membros."
    } else if (this.estadoAtual == "amarelo") {
      this.gravidade = "Urgente"
      this.resumoGravidade = "Condição pode se agravar sem atendimento."
    } else if (this.estadoAtual == "verde") {
      this.gravidade = "Pouco urgente"
      this.resumoGravidade = "Baixo risco de agravo imediato à saúde."
    }
    this.abrirModal(1);
  }

  naoPossui() {
    if (this.estadoAtual == "vermelho") {
      // if (this.sintomasLaranjas && this.sintomasLaranjas.length > 0) {
        this.estadoAtual = "laranja";
        // } else {
          // this.estadoAtual = "amarelo";
          // }
        } else if (this.estadoAtual == "laranja") {
          this.estadoAtual = "amarelo";
        } else if (this.estadoAtual == "amarelo") {
          // if (this.sintomasVerdes && this.sintomasVerdes.length > 0) {
            //   this.ultimoNivel = true;
            // } else {
              // this.estadoAtual = "verde";
              // }

              this.estadoAtual = "verde";
            } else if (this.estadoAtual == "verde") {
              this.estadoAtual = "azul";
              // this.ultimoNivel = true;
              this.gravidade = "Não urgente"
              this.resumoGravidade = "Sem risco imediato de agravo à saúde."
              this.abrirModal(1);
            }
          }

          voltar() {
            if (this.estadoAtual == "azul") {
              // this.ultimoNivel = false;
              this.estadoAtual = "verde"; 
            } else if (this.estadoAtual == "verde") {
              this.estadoAtual = "amarelo";
            } else if (this.estadoAtual == "amarelo") {
              this.estadoAtual = "laranja";
            } else if (this.estadoAtual == "laranja") {
              this.estadoAtual = "vermelho";
            } else if (this.estadoAtual == "vermelho") {
              this.router.navigate(['/classificacao']);
            }
          }

          abrirModal(n:number) {
            $("#myModal" + n).modal('show');
          }

          addConsulta() {
            let paciente = this.cadastroService.getPaciente()
            this.newConsulta.cidade = paciente.cidade;
            this.newConsulta.idade = paciente.idade;
            this.newConsulta.unidade = paciente.unidade;
            this.newConsulta.gravidade = this.gravidade
            let dataAtual = new Date()
            this.newConsulta.data = (dataAtual.getMonth()+1) + "/"+ dataAtual.getFullYear()
            this.onAddConsulta(this.newConsulta);
            this.newConsulta = new Consulta();

          }

          onAddConsulta(consulta) {
            console.log(consulta)            
            this.consultaDataService
            .addConsulta(consulta)
            .subscribe(
              (consulta) => {
                this.consultas = this.consultas.concat(consulta);
              }
              );
            this.abrirModal(2);
          }

          buscarJsonSintoma() {
            this.sintomaService.getJson(this.idSintomaGeral)
            .subscribe(data => {
              this.sintomas = data;
              this.sintomasVermelhos = this.sintomas["vermelho"];
              this.sintomasLaranjas = this.sintomas["laranja"];
              this.sintomasAmarelos = this.sintomas["amarelo"];
              this.sintomasVerdes = this.sintomas["verde"];

              // console.log(this.sintomas);
              // console.log(this.sintomas["vermelho"]);
            });
          }
        }
