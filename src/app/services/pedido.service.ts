import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Pedido } from '../models/pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  constructor(private firestore: AngularFirestore) {}

  getPedidos() {
    return this.firestore.collection('pedidos').snapshotChanges();
  }

  createPedido(pedido: Pedido) {
    return this.firestore.collection('pedidos').add(pedido);
  }

  updatePedido(pedido: Pedido) {
    return this.firestore.doc('pedidos/' + pedido.id).update(pedido);
  }

  deletePedido(pedidoId: string) {
    return this.firestore.doc('pedidos/' + pedidoId).delete();
  }
}

