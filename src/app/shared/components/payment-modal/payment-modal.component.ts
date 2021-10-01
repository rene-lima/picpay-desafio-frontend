import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Component, EventEmitter, Output, ViewChild } from '@angular/core'
import { PoModalAction, PoModalComponent } from '@po-ui/ng-components'
import { Payment } from 'app/core/entities/payment/payment.interface'
import { CreatePaymentService } from 'app/core/services/payments/create-payment/create-payment.service'
import { EditPaymentService } from 'app/core/services/payments/edit-payment/edit-payment.service'

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  providers: [CreatePaymentService, EditPaymentService]
})
export class PaymentModalComponent {
  @ViewChild(PoModalComponent, { static: true }) modal?: PoModalComponent

  @Output() newPaymentWasRegistered = new EventEmitter()

  @Output() paymentWasEdited = new EventEmitter()

  title?: string

  paymentBeingEdited?: Payment

  form = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    username: new FormControl(null, Validators.required),
    value: new FormControl(null, Validators.required),
    date: new FormControl(null, Validators.required),
    title: new FormControl(null, Validators.required)
  })

  actions: PoModalAction[] = [
    { label: 'Salvar', action: () => (this.paymentBeingEdited ? this.savePaymentEdition() : this.saveNewPayment()) },
    { label: 'Cancelar', action: () => this.close() }
  ]

  constructor(
    private readonly createPaymentService: CreatePaymentService,
    private readonly editPaymentService: EditPaymentService
  ) {}

  open(): void {
    this.form.reset()
    this.title = 'Adicionar pagamento'
    this.modal?.open()
  }

  openWithEditMode(payment: Payment): void {
    this.paymentBeingEdited = payment
    this.form.reset()
    this.title = 'Editar pagamento'
    this.populateFormData(payment)
    this.modal?.open()
  }

  private populateFormData({ name, username, date, value, title }: Payment): void {
    this.form.get('name').setValue(name)
    this.form.get('username').setValue(username)
    this.form.get('value').setValue(value)
    this.form.get('date').setValue(date)
    this.form.get('title').setValue(title)
  }

  private saveNewPayment(): void {
    if (this.form.invalid) return

    this.createPaymentService.Post({ ...this.form.value, isPayed: false }).subscribe(() => {
      this.newPaymentWasRegistered.emit()
      this.close()
    })
  }

  private savePaymentEdition(): void {
    if (this.form.invalid) return

    const paymentEdited: Payment = {
      id: this.paymentBeingEdited.id,
      image: this.paymentBeingEdited.image,
      isPayed: this.paymentBeingEdited.isPayed,
      ...this.form.value
    }

    this.editPaymentService.Put(paymentEdited, this.paymentBeingEdited.id.toString()).subscribe(() => {
      this.paymentWasEdited.emit()
      this.close()
    })
  }

  private close(): void {
    this.paymentBeingEdited = undefined
    this.form.reset()
    this.modal.close()
  }
}
