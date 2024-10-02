export interface Task {
    id: number,
    name: string,
    completed: boolean,
}

export type FilterBy = 'all' | 'pending' | 'completed';