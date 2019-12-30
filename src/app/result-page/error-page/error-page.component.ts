import { TestBed } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { AngularNetworkService } from 'src/app/network/angular-network.service';
import { DfNetworkOptions } from 'src/app/models/df-network.model';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit {
  isCollapsed = false;
  isReverseArrow = false;
  width: string | number = '200px';

  constructor(
    private http: AngularNetworkService,
  ) { }

  ngOnInit() {
    this.test1();
    // tslint:disable-next-line:only-arrow-functions
    $('button').on('click',  function() {
      alert('xxxxxx');
    });
  }


  test1() {
    this.test().subscribe(data => {});
  }

  test() {
    const params: DfNetworkOptions = { url: '/gateway/hr-common-service/fndLookup/types/queryFndLookupList', method: 'post' };
    return this.http.fullRequest(params, {}, {});
  }




}
