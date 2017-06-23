import { Component, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

declare let $:any;

@Component({
  selector:'login',
  templateUrl:'./login.html',
  styleUrls:['./login.css']
})
export class Login{
  public loginForm: FormGroup;
  public loginStart: boolean = false;
  public error:boolean = false;
  constructor(public formBuilder: FormBuilder){
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required]]
    });
  }
  ngOnInit() {
    
  }
  ngAfterViewChecked() {
    $("#login-button").click(function(event:any) {
      event.preventDefault();
      $('form').fadeOut(500);
      $('.wrapper').addClass('form-success');
    });
  }
  private onSubmit() {
    this.loginStart = true;
    setTimeout(function() {
      this.loginStart = false;
    }, 1000);
  }
}