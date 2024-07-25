import { RoutineItemType } from "./routine";

export interface RoutineExecution {
  routine: RoutineItemType;
  executionDates: string[];
}
