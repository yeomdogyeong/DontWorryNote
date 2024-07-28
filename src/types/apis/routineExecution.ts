import { RoutineItemType } from "./routine";

export interface RoutineExecution {
  routine: RoutineItemType;
  executionDates: string[];
}

export interface RoutineExecutionCount {
  [key: string]: {
    baezzangeCount: number;
    gaemiCount: number;
  };
}
