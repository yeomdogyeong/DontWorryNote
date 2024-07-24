import { useOverlay } from "@toss/use-overlay";
import Alert, { AlertProps } from "./Alert";

export function useAlertOverlay() {
  const overlay = useOverlay();
  const openOverlay = (props: Omit<AlertProps, "onClose">) => {
    return new Promise<boolean>(() => {
      overlay.open(() => (
        <Alert
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
