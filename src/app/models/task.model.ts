export interface Task {
    id: number;
    taskName: string;
    dueDate: string; // Suponiendo que deseas almacenar la fecha de vencimiento
    associatedPeople: {
      personName: string;
      personAge: number;
      skills: {
        skillName: string; // Nombre de la habilidad
      }[]; 
    }[];
    completed: boolean;
  }

export type FilterBy = 'all' | 'pending' | 'completed';