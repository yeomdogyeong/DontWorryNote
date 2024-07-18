import { useOverlay } from "@toss/use-overlay";
import Calendar, { CalendarProps } from "./TimePicker";

export function useTimePickerOverlay() {
  const overlay = useOverlay();
  const openOverlay = (props: Omit<CalendarProps, "onClose">) => {
    return new Promise<boolean>(() => {
      overlay.open(() => (
        <Calendar
          {...props}
          onClose={async () => {
            overlay.exit();
          }}
        />
      ));
    });
  };

  return { overlay, active: openOverlay };
}
