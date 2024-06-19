import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalidadeService {

  private estadosUrl = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';
  private municipiosUrl = (estadoId: string) => `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoId}/municipios`;

  constructor(private http: HttpClient) { }

  getEstados(): Observable<any> {
    // Obter todos os estados
    return this.http.get<any>(this.estadosUrl);
  }

  getMunicipios(estadoId: string): Observable<any> {
    // Obter todos os municípios de um estado
    return this.http.get<any>(this.municipiosUrl(estadoId));
  }
}
