import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  title: string | null = null;
  addTaskForm = this.fb.group({
    taskName: ['', [
      Validators.required,
      Validators.pattern('^\\S.*$'),
      Validators.minLength(3),
    ]],
    // dueDate: [''],
  });

  constructor(
    public modalRef: MdbModalRef<ModalComponent>,
    private fb: FormBuilder,
  ) {}

  close(): void {
    const closeMessage = 'Modal closed';
    this.modalRef.close(closeMessage)
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    // const { taskName } = this.addTaskForm.value;
    // console.warn(this.addTaskForm.value);
    this.modalRef.close(this.addTaskForm.value);
  }
}
