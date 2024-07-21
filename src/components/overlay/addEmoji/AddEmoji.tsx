import { useOverlay } from "@toss/use-overlay";
import AddRoutineCateogoryModal, { AddEmojiModalProps } from "./AddEmojiModal";
import AddEmojiModal from "./AddEmojiModal";

export function useAddEmojiModalOverlay() {
  const overlay = useOverlay();
  const openOverlay = (props: Omit<AddEmojiModalProps, "onClose">) => {
    return new Promise<boolean>(() => {
      overlay.open(() => (
        <AddEmojiModal
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
