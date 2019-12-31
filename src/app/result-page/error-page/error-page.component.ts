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


  constructor(
    private http: AngularNetworkService,
  ) { }

  ngOnInit() {
  }


}
