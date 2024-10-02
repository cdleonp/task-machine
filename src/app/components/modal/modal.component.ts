import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

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
    dueDate: ['', Validators.required],
    associatedPeople: this.fb.array([
      this.createPerson()],
      Validators.required
    ),
  });

  minDate: string = '';

  constructor(
    public modalRef: MdbModalRef<ModalComponent>,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');   
    // Formatear la fecha en YYYY-MM-DD
    this.minDate = `${year}-${month}-${day}`;    
  }

  initializeForm() {
    this.addTaskForm = this.fb.group({
      taskName: ['', [Validators.required, Validators.pattern('^\\S.*$'), Validators.minLength(3)]],
      dueDate: ['', Validators.required],
      associatedPeople: this.fb.array([
        this.createPerson()
      ])
    });
  }

  close(): void {
    const closeMessage = 'Modal closed';
    this.modalRef.close(closeMessage)
  }

  onSubmit() {
    // console.warn(this.addTaskForm.value);
    this.modalRef.close(this.addTaskForm.value);
  }

  createPerson(): FormGroup {
    return this.fb.group({
      personName: ['', [
        Validators.required,
        Validators.pattern('^\\S.*$'),
        Validators.minLength(4),
      ]],
      personAge: ['', [
        Validators.required,
        Validators.min(18),
      ]],
      skills: this.fb.array([
        this.createSkill()],
        Validators.required
      ), // Cada persona tendrá su propio array de skills
    });
  }  

  // Método para crear un nuevo control dentro del array
  createSkill(): FormGroup {
    return this.fb.group({
      skillName: ['', [
        Validators.required,
        Validators.pattern('^\\S.*$'),
        Validators.minLength(3),
      ]]
    });
  }

  get associatedPeople(): FormArray {
    return this.addTaskForm.get('associatedPeople') as FormArray;
  }

  addNewPerson(): void {
    this.associatedPeople.push(this.createPerson());
  }

  removePerson(index: number): void {
    this.associatedPeople.removeAt(index);
  }  

  getSkillsForPerson(index: number): FormArray {
    const person = this.associatedPeople.at(index) as FormGroup;
    return person.get('skills') as FormArray;
  }  

  // // Método para agregar un nuevo item al FormArray
  addSkillToPerson(index: number): void {
    const skills = this.getSkillsForPerson(index);
    skills.push(this.createSkill());
  }  

  // // Método para eliminar un item del FormArray
  removeSkillFromPerson(personIndex: number, skillIndex: number): void {
    const skills = this.getSkillsForPerson(personIndex);
    if (skills.length > 1) {
      skills.removeAt(skillIndex);
    }
  }  
}
