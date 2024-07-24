import { useOverlay } from "@toss/use-overlay";
import { AddPostCateogoryModalProps } from "./AddPostCategoryModal";
import AddPostCateogoryModal from "./AddPostCategoryModal";

export function useAddPostCateogoryModalOverlay() {
  const overlay = useOverlay();
  const openOverlay = (props: Omit<AddPostCateogoryModalProps, "onClose">) => {
    return new Promise<boolean>(() => {
      overlay.open(() => (
        <AddPostCateogoryModal
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
