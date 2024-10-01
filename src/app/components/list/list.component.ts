import { Component, computed, signal } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  modalRef: MdbModalRef<ModalComponent> | null = null;

  constructor(
    private modalService: MdbModalService
  ) {}

  tasks = [
    'Instalar el Angular CLI',
    'Crear el proyecto',
    'Correr el proyecto'
  ];
  updatedTasks = signal([...this.tasks]);

  openAddTaskModal() {
    this.modalRef = this.modalService.open(ModalComponent, {
      modalClass: 'modal-dialog-centered',
      data: {
        title: 'Nueva tarea',
      }
    });
    this.modalRef.onClose.subscribe((message: any) => {
      // console.log(message);
      if(message) {
        this.tasks.push(message);
        this.updatedTasks.update((tasks) => [...tasks, message])
      }      
    });
  }

  searchHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    // console.log(input.value);
    const regEx = new RegExp(input.value, 'i');
    const updatedTasks = this.tasks.filter(task => regEx.test(task));
    this.updatedTasks.set(updatedTasks);
  }

  createTask(event: Event) {
    const input = event.target as HTMLInputElement;
    // console.log(input.value);
    const regEx = new RegExp(input.value, 'i');
    const updatedTasks = this.tasks.filter(task => regEx.test(task));
    this.updatedTasks.set(updatedTasks);
  }
}
