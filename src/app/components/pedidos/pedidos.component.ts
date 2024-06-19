import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PedidoService } from '../../services/pedido.service';
import { ClienteService } from '../../services/cliente.service';
import { ProdutoService } from '../../services/produto.service';
import { Pedido } from '../../models/pedido';
import { Cliente } from '../../models/cliente';
import { Produto } from '../../models/produto';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {
  pedidoForm: FormGroup;
  pedidos: Pedido[] = [];
  clientes: Cliente[] = [];
  produtos: Produto[] = [];

  constructor(
    private fb: FormBuilder,
    private pedidoService: PedidoService,
    private clienteService: ClienteService,
    private produtoService: ProdutoService
  ) {
    this.pedidoForm = this.fb.group({
      cliente: ['', Validators.required],
      itens: ['', Validators.required],
      total: [{ value: '', disabled: true }, Validators.required],
      dataPedido: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.pedidoService.getPedidos().subscribe(data => {
      this.pedidos = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as Pedido
        };
      });
    });

    this.clienteService.getClientes().subscribe(data => {
      this.clientes = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as Cliente
        };
      });
    });

    this.produtoService.getProdutos().subscribe(data => {
      this.produtos = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as Produto
        };
      });
    });
  }

  onSubmit(): void {
    if (this.pedidoForm.valid) {
      if (!this.pedidoForm.value.id) {
        this.pedidoService.createPedido(this.pedidoForm.value);
      } else {
        this.pedidoService.updatePedido(this.pedidoForm.value);
      }
      this.pedidoForm.reset();
    }
  }

  updatePedido(pedido: Pedido): void {
    this.pedidoForm.setValue(pedido);
  }

  deletePedido(id: string): void {
    this.pedidoService.deletePedido(id);
  }
}
