import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss']
})
export class PaymentFormComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  paymentForm = this.formBuilder.group({
    user: "",
    value: "",
    date: "",
    title: ""    
  });


  ngOnInit(): void {
  }

}
