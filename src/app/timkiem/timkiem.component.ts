import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { saveLocalStorage, getLocalStorage } from '../../environments/environment';
import { BaseComponent } from '../lib/base-component';

@Component({
  selector: 'app-timkiem',
  templateUrl: './timkiem.component.html',
  styleUrls: ['./timkiem.component.css']
})
export class TimkiemComponent extends BaseComponent implements OnInit {
  searchResponse: any;
  searchResult: any;
  spResults: any;
  lowToHighPrice: any;
  itemgroupID: any;
  minPrice: any;
  totalItems: any;
  keyWord: any;
  maxPrice: any;
  pageSize: any;
  formGia:any;
  page: any;
  constructor(private injector: Injector, private fb: FormBuilder) {
    super(injector);
  }

  ngOnInit(): void {
    this.formGia= this.fb.group({
      'minP':[''],
      'maxP':['']
    });
    this.page = 1;
    this.pageSize = 12;
    this.renderSearchResult();
  }

  renderSearchResult() {
    if (localStorage.getItem("ketQuaTimKiem"))
      this.searchResult = JSON.parse(localStorage.getItem("ketQuaTimKiem"));

    if (this.searchResult) {
      this.spResults = this.searchResult.data;
      this.totalItems = this.searchResult.total;
      this.keyWord = this.searchResult.keyWord;
      this.minPrice = this.searchResult.minPrice;
      this.maxPrice = this.searchResult.maxPrice;
      this.itemgroupID = this.searchResult.danhMuc;
      this.lowToHighPrice = this.searchResult.lowToHighPrice;
    }
    else {
      this.searchResult = 'Empty';
    }
    console.log(this.searchResult);
  }

  loadPage(page) {
   this.reReneSearch(this.itemgroupID,this.keyWord,this.minPrice,this.maxPrice,page,10);
  }

  locTheoGia(){
    let min = this.formGia.get('minP') && this.formGia.get('minP').value!= '' ? parseInt(this.formGia.get('minP').value) : 0;
    let max = this.formGia.get('maxP') && this.formGia.get('maxP').value!= '' ? parseInt(this.formGia.get('maxP').value) : 0;
    this.reReneSearch(this.itemgroupID,this.keyWord,min,max,this.page,10);

  }

  reReneSearch(itemGroupId, keyWord, min, max, page, size) {
    this._api.get('/api/sanpham/search/' + itemGroupId + '/' + keyWord + '/' + min + '/' + max + '/' + page + '/' + size + '/')
      .takeUntil(this.unsubscribe).subscribe(res => {
        console.log(res);

        this.searchResponse = res;
        let list_item = this.searchResponse.data;
        let totalRecords = this.searchResponse.totalItems;
        var searchResult = {
          keyWord: keyWord,
          danhMuc: itemGroupId,
          data: list_item,
          total: totalRecords,
          minPrice: 0,
          maxPrice: 0,
          lowToHighPrice: null,
        }
        localStorage.setItem("ketQuaTimKiem", JSON.stringify(searchResult));
        this.renderSearchResult();
      });
  }
}