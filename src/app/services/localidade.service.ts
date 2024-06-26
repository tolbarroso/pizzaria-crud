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

  // Método para obter a lista de estados
  getEstados(): Observable<any> {
    return this.http.get<any>(this.estadosUrl);
  }

  // Método para obter a lista de municípios com base no ID do estado
  getMunicipios(estadoId: string): Observable<any> {
    return this.http.get<any>(this.municipiosUrl(estadoId));
  }
}

