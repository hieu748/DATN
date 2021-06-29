import { BaseComponent } from '../../lib/base-component';
import { Component, OnInit, Injector } from '@angular/core';

@Component({
  selector: 'app-chitiet',
  templateUrl: './chitiet.component.html',
  styleUrls: ['./chitiet.component.css']
})
export class ChitietComponent extends BaseComponent implements OnInit {
  item:any;
  tuongtu:any;
  constructor(injector: Injector) { 
    super(injector);
  }
  ngOnInit(): void {
    this.item = {};
    this._route.params.subscribe(params => {
      let id = params['id'];
      this._api.get('/api/sanpham/get-by-id/'+id).takeUntil(this.unsubscribe).subscribe(res => {
        this.item = res;
        setTimeout(() => {
          this.loadScripts();
        });
      }); 
    });
    // this.getTuongTu();
  }
  getTuongTu(){
    this.tuongtu=[];
    this._route.params.subscribe(params => {
      let id = params['id'];
      this._api.get('/api/sanpham/tuong-tu/'+id).takeUntil(this.unsubscribe).subscribe(res => {
        this.tuongtu = res;
       
      }); 
    });
  }
  addToCart(it) { 
    this._cart.addToCart(it);
    alert('Thêm thành công!'); 
  }
}
