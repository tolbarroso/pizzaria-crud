import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Pedido } from '../models/pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(private firestore: AngularFirestore) { }

  getPedidos() {
    // Obter todos os pedidos
    return this.firestore.collection('pedidos').snapshotChanges();
  }

  createPedido(pedido: Pedido) {
    // Criar um novo pedido
    return this.firestore.collection('pedidos').add(pedido);
  }

  updatePedido(pedido: Pedido) {
    // Atualizar um pedido existente
    delete pedido.id;
    this.firestore.doc('pedidos/' + pedido.id).update(pedido);
  }

  deletePedido(pedidoId: string) {
    // Deletar um pedido
    this.firestore.doc('pedidos/' + pedidoId).delete();
  }
}
