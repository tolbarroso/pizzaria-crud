import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { ProdutosComponent } from './components/produtos/produtos.component';

@NgModule({
    declarations: [
        AppComponent,
        ClientesComponent,
        PedidosComponent,
        ProdutosComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        AngularFirestoreModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
