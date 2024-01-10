import { Component, OnInit } from '@angular/core';
import {ModalService} from "./services/modal.service";
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'clips';
  showModal=true;

  constructor(public modal: ModalService, public auth:AuthService) {

  }
  ngOnInit(){
    setInterval(()=>this.showModal=!this.showModal,1000)
  }
}
