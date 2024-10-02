import { inject, Injector, Component, computed, effect, signal } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ModalComponent } from '../modal/modal.component';
import { Task, FilterBy } from '../../models/task.model';
import { FormControl } from '@angular/forms';

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
  ) {}

  ngOnInit(): void {
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
      // console.log(tasks);
      localStorage.setItem('taskList', JSON.stringify(tasks));
    }, { injector: this.injector });
  }
  
  tasks = signal<Task[]>([]);
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
    this.modalRef = this.modalService.open(ModalComponent, {
      modalClass: 'modal-dialog-centered',
      data: {
        title: 'Nueva tarea',
      }
    });
    this.modalRef.onClose.subscribe((data: Task) => {
      // console.log(message);
      if(data) {
        this.createTask(data);
      }      
    });
  }

  createTask(taskData: Task) {
    // console.log(input.value);
    const newTask = {
      id: Date.now(),
      taskName: taskData.taskName.trim(),
      dueDate: taskData.dueDate,
      associatedPeople: taskData.associatedPeople.map(person => ({
        personName: person.personName.trim(),
        personAge: person.personAge,
        skills: person.skills.map(skill => ({
          skillName: skill.skillName.trim() // Asegúrate de obtener el skillName
        }))
      })),
      completed: false,
    };
    this.tasks.update((tasks) => [...tasks, newTask]);
  }

  deleteTask(taskId: number) {
    // console.log(taskIndex);
    this.tasks.update((tasks) => tasks.filter((task) => task.id !== taskId));
  }

  toggleCompleteTask(taskId: number) {
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
    });
  }

  filterTasks(filter: FilterBy) {
    this.filter.set(filter);
  }
}
