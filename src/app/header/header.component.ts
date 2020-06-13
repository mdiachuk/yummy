import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
  }

  onSaveData() {
    this.dataService.saveAll();
  }

  onFetchData() {
    this.dataService.getAll().subscribe();
  }
}
