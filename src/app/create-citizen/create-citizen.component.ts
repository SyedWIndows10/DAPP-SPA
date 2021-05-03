import { Component, OnInit} from '@angular/core';
import { AlertifyService } from '../_services/alertify.service';
import {
  FormGroup,
  Validators,
  FormBuilder
} from '@angular/forms';
import { Citizen } from '../_models/citizen';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { CustomValidator } from '../custom-validator';
import { ContractService } from '../_services/contract.service';
@Component({
  selector: 'app-create-citizen',
  templateUrl: './create-citizen.component.html',
  styleUrls: ['./create-citizen.component.css']
})
export class CreateCitizenComponent implements OnInit {
  display$: Observable<any>;
  unsubscribe$: Subject<any> = new Subject<any>();
  citizen: Citizen;
  result:any;
  citizenForm: FormGroup;

  constructor(
    private router: Router,
    private alertify: AlertifyService,
    private service: ContractService,
    private fb: FormBuilder
  ) {

  }

  ngOnInit() {
    this.createCitizenForm();
  }

  createCitizenForm() {
    this.citizenForm = this.fb.group(
      {
        username: ['', Validators.required],
        age: [
          null,
          Validators.compose([CustomValidator.ageLimitValidator(18, 150)])
        ],
        city: ['', Validators.required],
        notes: ['', Validators.required]
      }
    );
  }

  create() {
    if (this.citizenForm.valid) {
      this.citizen = Object.assign({}, this.citizenForm.value);
      console.log(this.citizen);
      this.service.addCitizen(this.citizen.username,
        this.citizen.age,
        this.citizen.city,
        this.citizen.notes).then((res) => {
          if(res.events){
            this.alertify.success("Citizen has been added Successfully");
            this.router.navigate(['/lists']);
        }
        });
    }
  }

  clear() {
   this.citizenForm.reset();
  }
}

