import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  clienteForm: FormGroup;
  clientes: Cliente[] = [];
  estados: any[] = [];
  municipios: any[] = [];

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private http: HttpClient
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
    this.clienteService.getClientes().subscribe(data => {
      this.clientes = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as Cliente
        };
      });
    });

    this.http.get<any[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').subscribe(data => {
      this.estados = data;
    });
  }

  onEstadoChange(estadoId: string): void {
    this.http.get<any[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoId}/municipios`).subscribe(data => {
      this.municipios = data;
    });
  }

  onSubmit(): void {
    if (this.clienteForm.valid) {
      if (!this.clienteForm.value.id) {
        this.clienteService.createCliente(this.clienteForm.value);
      } else {
        this.clienteService.updateCliente(this.clienteForm.value);
      }
      this.clienteForm.reset();
    }
  }

  updateCliente(cliente: Cliente): void {
    this.clienteForm.setValue(cliente);
  }

  deleteCliente(id: string): void {
    this.clienteService.deleteCliente(id);
  }
}
