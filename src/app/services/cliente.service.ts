import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';
import { LocalidadeService } from '../../services/localidade.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  clienteForm: FormGroup;
  estados: any[] = [];
  municipios: any[] = [];

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private localidadeService: LocalidadeService
  ) {
    this.clienteForm = this.fb.group({
      nome: ['', Validators.required],
      rua: ['', Validators.required],
      bairro: ['', Validators.required],
      numero: ['', Validators.required],
      cidade: ['', Validators.required],
      cep: ['', Validators.required],
      estado: ['', Validators.required],
      telefone: ['', Validators.required],
      cpf: ['', Validators.required],
      sexo: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.localidadeService.getEstados().subscribe(data => {
      this.estados = data;
    });

    this.clienteForm.get('estado')?.valueChanges.subscribe(estadoId => {
      this.localidadeService.getMunicipios(estadoId).subscribe(data => {
        this.municipios = data;
      });
    });
  }

  onSubmit() {
    if (this.clienteForm.valid) {
      this.clienteService.createCliente(this.clienteForm.value).then(() => {
        console.log('Cliente criado com sucesso!');
      });
    }
  }
}
