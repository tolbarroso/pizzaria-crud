import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Produto } from '../models/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  constructor(private firestore: AngularFirestore) {}

  getProdutos() {
    return this.firestore.collection('produtos').snapshotChanges();
  }

  createProduto(produto: Produto) {
    return this.firestore.collection('produtos').add(produto);
  }

  updateProduto(produto: Produto) {
    return this.firestore.doc('produtos/' + produto.id).update(produto);
  }

  deleteProduto(produtoId: string) {
    return this.firestore.doc('produtos/' + produtoId).delete();
  }
}
