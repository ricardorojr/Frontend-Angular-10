import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Produtos } from './../model/produtos';

@Injectable({
  providedIn: 'root'
})
export class ServiceProdutoService {

  url = 'http://localhost:8080/products'; 

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  // Obtem todos os Produtos
  getProdutos(): Observable<Produtos[]> {
    return this.httpClient.get<Produtos[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  // Obtem um Produto pelo codigo
  getProdutosById(cod: number): Observable<Produtos> {
    return this.httpClient.get<Produtos>(this.url + '/' + cod)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // salva um Produto
  saveProdutos(cod: Produtos): Observable<Produtos> {
    return this.httpClient.post<Produtos>(this.url, JSON.stringify(cod), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // utualiza um Produto
  updateProdutos(cod: Produtos): Observable<Produtos> {
    return this.httpClient.put<Produtos>(this.url + '/' + cod.codProduto, JSON.stringify(cod), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // deleta um Produto
  deleteProdutos(cod: Produtos) {
    return this.httpClient.delete<Produtos>(this.url + '/' + cod.codProduto, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}

