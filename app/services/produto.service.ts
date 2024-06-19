import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Produto } from '../models/produto';

@Injectable({
  providedIn: 'root'
})
  import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Produto } from '../models/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private firestore: AngularFirestore) { }

  getProdutos() {
    // Obter todos os produtos
    return this.firestore.collection('produtos').snapshotChanges();
  }

  createProduto(produto: Produto) {
    // Criar um novo produto
    return this.firestore.collection('produtos').add(produto);
  }

  updateProduto(produto: Produto) {
    // Atualizar um produto existente
    delete produto.id;
    this.firestore.doc('produtos/' + produto.id).update(produto);
  }

  deleteProduto(produtoId: string) {
    // Deletar um produto
    this.firestore.doc('produtos/' + produtoId).delete();
  }
}
