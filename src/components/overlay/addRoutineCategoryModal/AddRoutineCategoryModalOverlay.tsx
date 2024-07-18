import { useOverlay } from "@toss/use-overlay";
import AddRoutineCateogoryModal, {
  AddRoutineCateogoryModalProps,
} from "./AddRoutineCategoryModal";

export function useAddRoutineCateogoryModalOverlay() {
  const overlay = useOverlay();
  const openOverlay = (
    props: Omit<AddRoutineCateogoryModalProps, "onClose">
  ) => {
    return new Promise<boolean>(() => {
      overlay.open(() => (
        <AddRoutineCateogoryModal
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
