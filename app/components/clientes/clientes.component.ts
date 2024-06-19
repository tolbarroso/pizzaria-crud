import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from 'src/app/models/cliente';
import { LocalidadeService } from 'src/app/services/localidade.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clienteForm: FormGroup;
  clientes: Cliente[];
  estados: any[];
  municipios: any[];

  constructor(private fb: FormBuilder, private clienteService: ClienteService, private localidadeService: LocalidadeService) { }

  ngOnInit(): void {
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
      sexo: ['', Validators.required],
    });

    // Obter a lista de clientes
    this.clienteService.getClientes().subscribe(data => {
      this.clientes = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as Cliente
        } as Cliente;
      });
    });

    // Obter a lista de estados
    this.localidadeService.getEstados().subscribe(data => {
      this.estados = data;
    });
  }

  onEstadoChange(estadoId: string) {
    // Obter a lista de municípios ao selecionar um estado
    this.localidadeService.getMunicipios(estadoId).subscribe(data => {
      this.municipios = data;
    });
  }

  onSubmit() {
    // Criar um novo cliente
    this.clienteService.createCliente(this.clienteForm.value);
    this.clienteForm.reset();
  }

  deleteCliente(clienteId: string) {
    // Deletar um cliente
    this.clienteService.deleteCliente(clienteId);
  }

  updateCliente(cliente: Cliente) {
    // Atualizar um cliente
    this.clienteForm.setValue(cliente);
  }
}
