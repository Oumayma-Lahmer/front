import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  @Input() type: string = ''; // Initialisation lors de la déclaration
  @Output() onClose = new EventEmitter<any>();
  constructor() {
    
  }
  ngOnInit(): void {
  }
  Close(){
    this.onClose.emit();
  }
}
