import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PedidoService } from 'src/app/services/pedido.service';
import { Pedido } from 'src/app/models/pedido';
import { ClienteService } from 'src/app/services/cliente.service';
import { ProdutoService } from 'src/app/services/produto.service';
import { Cliente } from 'src/app/models/cliente';
import { Produto } from 'src/app/models/produto';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  pedidoForm: FormGroup;
  pedidos: Pedido[];
  clientes: Cliente[];
  produtos: Produto[];

  constructor(
    private fb: FormBuilder,
    private pedidoService: PedidoService,
    private clienteService: ClienteService,
    private produtoService: ProdutoService
  ) { }

  ngOnInit(): void {
    this.pedidoForm = this.fb.group({
      cliente: ['', Validators.required],
      itens: [[], Validators.required],
      total: [{ value: 0, disabled: true }, Validators.required],
      dataPedido: [new Date(), Validators.required],
    });

    // Obter a lista de pedidos
    this.pedidoService.getPedidos().subscribe(data => {
      this.pedidos = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as Pedido
        } as Pedido;
      });
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

    // Obter a lista de produtos
    this.produtoService.getProdutos().subscribe(data => {
      this.produtos = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as Produto
        } as Produto;
      });
    });
  }

  onSubmit() {
    // Criar um novo pedido
    const pedido: Pedido = {
      ...this.pedidoForm.value,
      total: this.calculateTotal(this.pedidoForm.value.itens),
    };
    this.pedidoService.createPedido(pedido);
    this.pedidoForm.reset();
  }

  calculateTotal(itens: Produto[]): number {
    // Calcular o total do pedido
    return itens.reduce((acc, item) => acc + item.preco, 0);
  }

  deletePedido(pedidoId: string) {
    // Deletar um pedido
    this.pedidoService.deletePedido(pedidoId);
  }

  updatePedido(pedido: Pedido) {
    // Atualizar um pedido
    this.pedidoForm.setValue(pedido);
  }
}
