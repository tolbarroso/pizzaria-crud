import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProdutoService } from '../../services/produto.service';
import { Produto } from '../../models/produto';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {
  produtoForm: FormGroup;
  produtos: Produto[] = [];

  constructor(
    private fb: FormBuilder,
    private produtoService: ProdutoService
  ) {
    this.produtoForm = this.fb.group({
      nome: ['', Validators.required],
      preco: ['', Validators.required],
      categoria: ['', Validators.required]
    });
  }

  ngOnInit(): void {
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
    if (this.produtoForm.valid) {
      if (!this.produtoForm.value.id) {
        this.produtoService.createProduto(this.produtoForm.value);
      } else {
        this.produtoService.updateProduto(this.produtoForm.value);
      }
      this.produtoForm.reset();
    }
  }

  updateProduto(produto: Produto): void {
    this.produtoForm.setValue(produto);
  }

  deleteProduto(id: string): void {
    this.produtoService.deleteProduto(id);
  }
}
