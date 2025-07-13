// models/Task.ts or types.ts

export type Task = {
  id: string;
  title: string;
  points: number;
  completed: boolean;
  location: string;
  type: 'daily' | 'special';
};
