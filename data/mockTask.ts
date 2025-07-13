import type {Task} from '../models/Task';

export const mockTaskData: Task[] = [
  { id: '1', title: 'Snipe the Boiler Express', points: 50, completed: false, location: "Engineering Fountain", type: 'daily' },
  { id: '2', title: 'Study at the Wilhment Active Center', points: 30, completed: true, location: "WALC", type: 'daily' },
  { id: '3', title: 'Grab a snack from the ReXCH event', points: 75, completed: false, location: "MSEE", type: 'special' },
  { id: '4', title: 'Walk under the bell tower', points: 100, completed: true, location: "Bell Tower", type: 'special' },
];