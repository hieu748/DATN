import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/takeUntil';
import { BaseComponent } from '../../lib/base-component';
import  {saveLocalStorage} from '../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent extends BaseComponent implements OnInit {
  menus: any;
  total: any;
  formSearchHeader: any;
  searchResponse:any;
  list_item: any;
  totalRecords: any;
  constructor(injector: Injector, private fb: FormBuilder,private router: Router) {
    super(injector);
  }
  ngOnInit(): void {
    this.buldformSearchHeader();
    this._api.get('/api/loaisanpham/get-menu').takeUntil(this.unsubscribe).subscribe(res => {
      this.menus = res;
    });
    this._cart.items.subscribe((res) => {
      this.total = res ? res.length : 0;
    });
  }
  buldformSearchHeader() {
    this.formSearchHeader=this.fb.group({
      'danhMuc':[],
      'keyWord':[]
    })
  }

  search() {
    let keyWord = this.formSearchHeader.get('keyWord') && this.formSearchHeader.get('keyWord').value!= '' ? this.formSearchHeader.get('keyWord').value : '%20';
    let itemgroupID = this.formSearchHeader.get('danhMuc') && this.formSearchHeader.get('danhMuc').value != '' ? (this.formSearchHeader.get('danhMuc').value) : '%20';
    itemgroupID=itemgroupID===null? '%20':itemgroupID;
     this._api.get('/api/sanpham/search/'+itemgroupID+'/'+keyWord+'/0/0/1/10/')
      .takeUntil(this.unsubscribe).subscribe(res => {
        console.log(res);
        
        this.searchResponse = res;
        this.list_item = this.searchResponse.data;
        this.totalRecords = this.searchResponse.totalItems;
        var searchResult = {
          keyWord: keyWord,
          danhMuc: itemgroupID,
          data: this.list_item,
          total: this.totalRecords,
          minPrice: 0,
          maxPrice: 0,
          lowToHighPrice: null,
        }     
        localStorage.setItem("ketQuaTimKiem",JSON.stringify(searchResult));
        if(this.router.url==='/search'){
          window.location.reload();
        }
        else
       this.router.navigate(['search']);
      });

  }
}
