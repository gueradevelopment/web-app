
interface BoardModel {
    id: string;
    title: string;
    description: string;
}

export interface Task {
    id: number;
    title: string;
    description?: string;
    shortDescription: string;
}