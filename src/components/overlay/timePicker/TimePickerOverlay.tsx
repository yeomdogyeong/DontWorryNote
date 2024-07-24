import { useOverlay } from "@toss/use-overlay";
import { TimePickerProps } from "./TimePicker";
import TimePicker from "./TimePicker";

export function useTimePickerOverlay() {
  const overlay = useOverlay();
  const openOverlay = (props: Omit<TimePickerProps, "onClose">) => {
    return new Promise<boolean>(() => {
      overlay.open(() => (
        <TimePicker
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
