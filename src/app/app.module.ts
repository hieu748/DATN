import { NotFoundComponent } from './shared/not-found/not-found.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './shared/menu/menu.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TimkiemComponent } from './timkiem/timkiem.component';
import { SharedModule } from './shared/shared.module';
import { TapluyenComponent } from './tapluyen/tapluyen.component';
const routes: Routes = [
  {path:'search',component:TimkiemComponent},
  {path:'tapluyen',component:TapluyenComponent},
  {
    path: 'product',
    loadChildren: () => import('./product/product.module').then((m) => m.ProductModule),
  },
  {
    path: 'customer',
    loadChildren: () => import('./customer/customer.module').then((m) => m.CustomerModule),
  },
  {
    path: 'new',
    loadChildren: () => import('./shared/menu/new/new.module').then((m) => m.NewModule),
  },
  {
    path: 'system',
    loadChildren: () => import('./shared/menu/system/system.module').then((m) => m.SystemModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./main/main.module').then((m) => m.MainModule),
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  { path: '', component: NotFoundComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    TimkiemComponent,
    TapluyenComponent ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule,SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
