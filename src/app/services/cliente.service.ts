import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  constructor(private firestore: AngularFirestore) {}

  getClientes() {
    return this.firestore.collection('clientes').snapshotChanges();
  }

  createCliente(cliente: Cliente) {
    return this.firestore.collection('clientes').add(cliente);
  }

  updateCliente(cliente: Cliente) {
    return this.firestore.doc('clientes/' + cliente.id).update(cliente);
  }

  deleteCliente(clienteId: string) {
    return this.firestore.doc('clientes/' + clienteId).delete();
  }
}
