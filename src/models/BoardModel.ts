
interface BoardModel {
    id: string;
    title: string;
    description: string;
}

export interface Task {
    id: string;
    title: string;
    description?: string;
    shortDescription: string;
}