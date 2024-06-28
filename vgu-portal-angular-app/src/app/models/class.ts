export interface Class {
  name: string;
  code: string;
  majorId: number;
  startDate: string;
  endDate: string;
  moduleId: number;
  moduleName: string;
  assignments: Assignment[];
}

export interface Assignment {
  name: string;
}