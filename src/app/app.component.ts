import { Component } from '@angular/core';
import { ServiceProdutoService } from './services/service-produto.service'
import { Produtos } from './model/produtos';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'products';

  produto = {} as Produtos;
  produtos: Produtos[];

  constructor(private prodService: ServiceProdutoService) {}
  
  ngOnInit() {
    this.getProdutos();
  }

  // defini se um produto será criado ou atualizado
  saveProdutos(form: NgForm) {
    if (this.produto.codProduto !== undefined) {
      this.prodService.updateProdutos(this.produto).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.prodService.saveProdutos(this.produto).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  // Chama o serviço para obtém todos os produtos
  getProdutos() {
    this.prodService.getProdutos().subscribe((produtos: Produtos[]) => {
      this.produtos = produtos;
    });
  }

  // deleta um produto
  deleteProdutos(produto: Produtos) {
    this.prodService.deleteProdutos(produto).subscribe(() => {
      this.getProdutos();
    });
  }

  // copia o carro para ser editado.
  editProdutos(produto: Produtos) {
    this.produto = { ...produto };
  }

  // limpa o formulario
  cleanForm(form: NgForm) {
    this.getProdutos();
    form.resetForm();
    this.produto = {} as Produtos;
  }
}
