import { inject, Injector, Component, computed, effect, signal } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ModalComponent } from '../modal/modal.component';
import { Task, FilterBy } from '../../models/task.model';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  modalRef: MdbModalRef<ModalComponent> | null = null;
  searchInputCtrl = new FormControl();
  injector = inject(Injector);

  constructor(
    private modalService: MdbModalService,
  ) {
    // this.searchInputCtrl.valueChanges.subscribe(value => this.searchHandler(value))
  }

  ngOnInit(): void {
    // console.log("Filtered tasks:", this.filteredTasks());  // Verifica si filteredTasks se evalúa aquí
    const taskInStorage = localStorage.getItem('taskList');
    if(taskInStorage) {
      const tasksRetrieved = JSON.parse(taskInStorage);
      this.tasks.set(tasksRetrieved);
    }
    this.getTasks();
  }

  getTasks() {
    effect(() => {
      const tasks = this.tasks();
      console.log(tasks);
      localStorage.setItem('taskList', JSON.stringify(tasks));
    }, { injector: this.injector });
  }
  
  tasks = signal<Task[]>([]);
  // updatedTasks = signal<Task[]>([...this.tasks]);
  filter = signal<FilterBy>('all');
  filteredTasks = computed(() => {
    const filter = this.filter();
    const tasks = this.tasks();
    if(filter === 'pending') {
      return tasks.filter(task => !task.completed)
    } else if(filter === 'completed') {
      return tasks.filter(task => task.completed)
    } else return tasks;
  });

  openAddTaskModal() {
    // this.searchInputCtrl.setValue('');
    this.modalRef = this.modalService.open(ModalComponent, {
      modalClass: 'modal-dialog-centered',
      data: {
        title: 'Nueva tarea',
      }
    });
    this.modalRef.onClose.subscribe((data: any) => {
      // console.log(message);
      if(data) {
        this.createTask(data);
      }      
    });
  }

  // searchHandler(event: Event) {
  //   const input = event.target as HTMLInputElement;
  //   // console.log(input.value);
  //   const regEx = new RegExp(input.value, 'i');
  //   const searchedTasks = this.tasks.filter(task => regEx.test(task.name));
  //   this.updatedTasks.set(searchedTasks);
  // }

  // searchHandler(term: string) {
  //   const regEx = new RegExp(term, 'i');
  //   const searchedTasks = this.tasks().filter(task => regEx.test(task.name));
  //   this.updatedTasks.set(searchedTasks);
  // }

  createTask(taskData: any) {
    // console.log(input.value);
    const newTask = {
      id: Date.now(),
      name: taskData.taskName.trim(),
      completed: false,
    };
    // this.tasks.push(newTask);
    this.tasks.update((tasks) => [...tasks, newTask]);
  }

  deleteTask(taskId: number) {
    // console.log(taskIndex);
    // this.tasks.splice(taskIndex, 1);
    this.tasks.update((tasks) => tasks.filter((task) => task.id !== taskId));
  }

  toggleCompleteTask(taskId: number) {
    // const taskToUpdate = this.tasks()[taskIndex];
    this.tasks.update((tasks) => {
      return tasks.map((task) => {
        if(task.id === taskId) {
          return {
            ...task,
            completed: !task.completed,
          }
        }
        return task;
      });
      // tasks[taskIndex].completed = !tasks[taskIndex].completed
    });
  }

  filterTasks(filter: FilterBy) {
    this.filter.set(filter);
    // this.cdr.detectChanges(); 
    // this.filter.update(value => value);
  }
}
