import { BaseComponent } from '../../lib/base-component';
import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseComponent implements OnInit {
  public registerForm: FormGroup;
  public loginForm: FormGroup;
  constructor(injector: Injector,public  router: Router) { 
    super(injector);
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      Email: new FormControl('', [Validators.required,Validators.email]),
      MatKhau: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ])
    });
    this.loginForm = new FormGroup({
      Email: new FormControl('', Validators.required),
      MatKhau: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      remember: new FormControl(false, []),
    });
  }
  onSubmitLogin(value: any) { 

  }
  onSubmitRegister(value: any) { 

    this._api.post('/api/khachhang/create-kh', {Eamil:value.Email, MatKhau:value.MatKhau} ).takeUntil(this.unsubscribe).subscribe(res => {
     alert('Tạo thành công');
     this.router.navigate(['']);
      }, err => { });      

  }


}
