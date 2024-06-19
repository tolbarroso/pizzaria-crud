import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProdutoService } from 'src/app/services/produto.service';
import { Produto } from 'src/app/models/produto';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

  produtoForm: FormGroup;
  produtos: Produto[];

  constructor(private fb: FormBuilder, private produtoService: ProdutoService) { }

  ngOnInit(): void {
    this.produtoForm = this.fb.group({
      nome: ['', Validators.required],
      preco: ['', Validators.required],
      categoria: ['', Validators.required],
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
    // Criar um novo produto
    this.produtoService.createProduto(this.produtoForm.value);
    this.produtoForm.reset();
  }

  deleteProduto(produtoId: string) {
    // Deletar um produto
    this.produtoService.deleteProduto(produtoId);
  }

  updateProduto(produto: Produto) {
    // Atualizar um produto
    this.produtoForm.setValue(produto);
  }
}
