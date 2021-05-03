import { Component, OnInit, Output, OnDestroy } from '@angular/core';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { Router } from '@angular/router';
import { ContractService } from '../_services/contract.service';
@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.css']
})
export class ConnectComponent implements OnInit,OnDestroy {
  display$: Observable<any>;
  unsubscribe$: Subject<any> = new Subject<any>();

  constructor(private alertify: AlertifyService, private service:ContractService, private router: Router,) {

   }

  ngOnInit(): void {
  }

  connectAccount() {
    this.service.connectAccount().then((resp) => {
      if(resp){
        this.alertify.success("Connected Successfully");
        this.router.navigate(['/addcitizen']);
      }
    })
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
