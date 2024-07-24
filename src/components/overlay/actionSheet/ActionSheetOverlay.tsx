import { useOverlay } from "@toss/use-overlay";
import ActionSheet, { ActionSheetProps } from "./ActionSheet";

export function useActionSheetOverlay() {
  const overlay = useOverlay();
  const openOverlay = (props: Omit<ActionSheetProps, "onClose">) => {
    return new Promise<boolean>(() => {
      overlay.open(() => (
        <ActionSheet
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
