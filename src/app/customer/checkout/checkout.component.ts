import { BaseComponent } from './../../lib/base-component';
import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent extends BaseComponent implements OnInit {
  items2:any;
  total:any;
  public hoadonForm: FormGroup;
  constructor(injector: Injector,public  router: Router) { 
    super(injector);
  }

  onSubmit(value: any) {
    let hoadon = {ho_ten: value.ho_ten, dia_chi:value.dia_chi, sodt:Number.parseInt(value.sodt), email:value.email, listjson_chitiet:this.items2};
    console.log(hoadon);
    this._api.post('/api/hoadon/create-hoadon', hoadon).takeUntil(this.unsubscribe).subscribe(res => {
      alert('Tạo thành công');
      this.router.navigate(['']);
      this.total=0;
      this._cart.clearCart();
       }, err => { });      
  }

  ngOnInit(): void {
    this.hoadonForm = new FormGroup({
      ho_ten: new FormControl('', Validators.required),
      dia_chi: new FormControl(''),
      sodt:new FormControl(''),
      email:new FormControl('',Validators.email)       
    });
    this.items2=[];
    this._cart.items.subscribe((res) => {
      this.items2 = res;
      this.total = 0;
      for(let x of this.items2){ 
        x.so_luong = +x.quantity;
        x.money = x.quantity * x.item_price;
        this.total += x.quantity * x.item_price;
      } 
    });

  }

}
