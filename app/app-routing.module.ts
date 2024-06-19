import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './components/clientes/clientes.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { ProdutosComponent } from './components/produtos/produtos.component';

const routes: Routes = [
    { path: 'clientes', component: ClientesComponent },
    { path: 'pedidos', component: PedidosComponent },
    { path: 'produtos', component: ProdutosComponent },
    { path: '', redirectTo: '/clientes', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
