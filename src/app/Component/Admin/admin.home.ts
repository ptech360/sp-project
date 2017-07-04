import {Component} from '@angular/core';

declare let $:any;

@Component({
  selector:'admin-home',
  templateUrl:'./admin.home.html',
  styleUrls:['./admin.home.css']
})
export class AdminHome{
  constructor(){

  }

  ngAfterViewInit(){
    $("#wrapper").toggleClass("toggled");
    $("#menu-toggle").click(function(e:any) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });
  }

  logout(){
      localStorage.clear();
  }
}