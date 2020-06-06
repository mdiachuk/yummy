import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() changeTab = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onChangeTab(tab: string) {
    this.changeTab.emit(tab);
  }

}
