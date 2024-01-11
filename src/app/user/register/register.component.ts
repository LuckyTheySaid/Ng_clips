import { Component } from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import IUser from "../../models/user.model";
import {RegisterValidators} from "../Validators/register-validators";
import{EmailTaken} from "../Validators/email-taken";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  inSubmission=false
  constructor(
    private auth: AuthService,
    private emailTaken: EmailTaken
  )
  {}

  name=new FormControl('',[
    Validators.required,
    Validators.minLength(3)
])
  email=new FormControl('',[
    Validators.required,
    Validators.email
  ],[this.emailTaken.validate])
  age=new FormControl<number|null>(null,[
    Validators.required,
    Validators.min(16),
    Validators.max(120)
  ])
  password=new FormControl('',[
    Validators.required,
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)
  ])
  confirm_password=new FormControl('',[
    Validators.required
  ])
  phoneNumber=new FormControl('',[
    Validators.required,
    Validators.minLength(13),
    Validators.maxLength(13)
  ])

  showAlert= false
  alerColor='blue'
  alertMsg='Please wait! Your account is being created.'

  registerForm= new FormGroup({
    name: this.name,
    email: this.email,
    age: this.age,
    password: this.password,
    confirm_password: this.confirm_password,
    phoneNumber:this.phoneNumber


  },[RegisterValidators.match('password','confirm_password')])
  async register(){
    this.showAlert=true
    this.alertMsg='Please wait! Your account is being created.'
    this.alerColor='blue'
    this.inSubmission=true

    try {
        await this.auth.createUser(this.registerForm.value as IUser)
    }

   catch (e){
      console.log(e)
      this.alertMsg='An unexpected error occurred, Please try again later'
     this.alerColor='red'
     this.inSubmission=false
     return

   }
    this.alertMsg='Success! Your account has been created'
    this.alerColor='green'
  }

  protected readonly RegisterValidators = RegisterValidators;
  protected readonly JSON = JSON;
}
