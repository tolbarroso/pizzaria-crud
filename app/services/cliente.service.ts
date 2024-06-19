import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
  import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private firestore: AngularFirestore) { }

  getClientes() {
    // Obter todos os clientes
    return this.firestore.collection('clientes').snapshotChanges();
  }

  createCliente(cliente: Cliente) {
    // Criar um novo cliente
    return this.firestore.collection('clientes').add(cliente);
  }

  updateCliente(cliente: Cliente) {
    // Atualizar um cliente existente
    delete cliente.id;
    this.firestore.doc('clientes/' + cliente.id).update(cliente);
  }

  deleteCliente(clienteId: string) {
    // Deletar um cliente
    this.firestore.doc('clientes/' + clienteId).delete();
  }
}
