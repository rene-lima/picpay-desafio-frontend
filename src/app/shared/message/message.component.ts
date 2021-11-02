import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  title: string;
  message: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data,
    public dialog: MatDialogRef<MessageComponent>
  ) {
    this.title = this.data.title;
    this.message = this.data.message;
  }

  ngOnInit(): void {
  }

}
