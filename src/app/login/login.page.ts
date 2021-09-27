import { Component, OnInit } from '@angular/core';

import {BbddServiceProvider} from '../../providers/bbdd-service/bbdd-service';
import { ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private persona:FormGroup

  constructor(
    private bbddServiceProvider:BbddServiceProvider, 
    private formBuilder:FormBuilder,
    private toastController: ToastController){ 
      this.persona = this.formBuilder.group({
        user:["",Validators.required],
        password:["",Validators.required]
      })

  }

  ngOnInit() {
  }

  sendData(){
    this.bbddServiceProvider.insert(this.persona.value)
    .then((data)=>{
      this.openToast("Registro insertado");
      alert(JSON.stringify(data))
    })
  }

  async openToast(msg){
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      animated: false

    });
    toast.present();
    toast.onDidDismiss().then((value)=>{
      console.log('toast dissmised');
    });
  }
}
