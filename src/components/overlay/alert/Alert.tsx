import { useCallback } from "react";

export interface AlertProps {
  onClose(): Promise<void>;
  contents: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm(): Promise<void>;
}

export default function Alert(props: AlertProps) {
  const {
    confirmText = "확인",
    cancelText = "취소",
    contents,
    onConfirm,
    onClose,
  } = props;

  const handleConfirm = useCallback(async () => {
    await onConfirm();
    await onClose();
  }, [onConfirm, onClose]);

  const handleCancel = useCallback(async () => {
    onClose();
  }, [onClose]);

  return (
    <>
      <div className="z-100 fixed top-0 left-0 bg-black opacity-[.7] w-screen h-screen"></div>
      <div className="z-100 w-[294px] flex flex-col gap-[16px] pt-[32px] px-[24px] pb-[16px] rounded-[12px] bg-white fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex-center">{contents}</div>
        <div className="gap-[8px] h-[49px] font-[600] text-[15px] flex items-center">
          <div
            className="text-gray-600 flex-center flex-1"
            onClick={handleCancel}
          >
            {cancelText}
          </div>
          <div
            className="text-negative flex-center flex-1"
            onClick={handleConfirm}
          >
            {confirmText}
          </div>
        </div>
      </div>
    </>
  );
}
