import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import * as fromRoot from 'src/app/store/reducers/index';
import * as fromCitizen from 'src/app/store/selectors/citizen.selectors';
import { getCitizens } from '../store/actions/citizen.actions';;
import { ContractService } from '../_services/contract.service';
import Swal from "sweetalert2";
@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  display$: Observable<any>;
  unsubscribe$: Subject<any> = new Subject<any>();
  result:any;

  page = 1;
  count = 0;
  pageSize = 5;
  pageSizes = [5, 10, 15];



  constructor(private store$: Store<fromRoot.State>,
    private service: ContractService) {
      this.display$ = this.store$.pipe(select(fromCitizen.selectCitizenState));
    }

  ngOnInit(): void {
      this.display$.pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe((res) => {
      this.result = res.citizens;
      console.log(this.result);
    });
     this.store$.dispatch(getCitizens());
  }

  getNotes(id){
    this.service.getNoteByCitizenId(id).then((value) => Swal.fire(value,'', 'success'));
  }

  handlePageChange(event): void {
    this.page = event;
  }

  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 1;
  }




}
