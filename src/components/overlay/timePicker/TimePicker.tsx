import CheckIcon from "@/components/icon/CheckIcon";
import useUserStore from "@/store/useUserStore";
import { SubjectType } from "@/types/common";
import dayjs, { Dayjs } from "dayjs";
import { useCallback, useState } from "react";
import { TimeClock } from "@mui/x-date-pickers";
import CloseIcon from "@/components/icon/CloseIcon";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export interface TimePickerProps {
  onClose(): Promise<void>;
  onConfirm(value: string): Promise<void>;
  value: string;
}

export default function TimePicker(props: TimePickerProps) {
  const { onConfirm, onClose, value } = props;
  const userType = useUserStore((state) => state.userType);

  const [time, setTime] = useState<Dayjs | null>(
    value ? dayjs(value) : dayjs()
  );
  const [selected, setSelected] = useState("AM");

  const handleToggle = (selected: "AM" | "PM") => {
    setSelected(selected);
  };

  const handleConfirm = useCallback(() => {
    onConfirm(
      selected === "AM"
        ? (time?.toString() as string)
        : (time?.add(12, "hour").toString() as string)
    );
    onClose();
  }, [onClose, onConfirm, value, time, selected]);

  return (
    <>
      <div className="absolute top-0 left-0 bg-black opacity-[.7] w-screen h-screen" />

      <div className="w-full h-[576px] flex flex-col pt-[12px] px-[20px] pb-[8px] rounded-t-[12px] bg-white fixed bottom-0">
        <div className="flex items-center justify-between h-[60px]">
          <div className="font-[600] text-[20px]">시간 선택하기</div>
          <button onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        <div className="flex-center mt-[16px] h-[78px] font-[600] text-[48px]">
          {time?.format("hh:mm")}
        </div>
        <div className="mt-[8px] flex justify-center items-center">
          <div className="flex bg-gray-100 h-[44px] rounded-full">
            <button
              className={`flex-center w-[56px] h-[44px] rounded-full  ${
                selected === "AM" ? "bg-gray-900 text-white" : "text-gray-500"
              }`}
              onClick={() => handleToggle("AM")}
            >
              오전
            </button>
            <button
              className={`flex-center  w-[56px] h-[44px] rounded-full  ${
                selected === "PM" ? "bg-gray-900 text-white" : "text-gray-500"
              }`}
              onClick={() => {
                handleToggle("PM");
              }}
            >
              오후
            </button>
          </div>
        </div>
        <div className="mt-[8px]">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimeClock
              value={time}
              onChange={(v) => setTime(v)}
              sx={{
                "& .MuiClock-clock": {
                  backgroundColor: "#ffffff",
                },
                "& .MuiClock-pin": {
                  backgroundColor: "#111111",
                },

                "& .MuiClock-squareMask": {
                  borderRadius: "100%",
                  border: "1px solid #e5e5eb",
                },

                "& .MuiClockPointer-root": {
                  backgroundColor: "#111111",
                },

                "& .MuiClockPointer-thumb": {
                  backgroundColor: "#111111",
                  borderColor: "#111111",
                },
              }}
              views={["hours", "minutes"]}
            />
          </LocalizationProvider>
        </div>

        <button
          onClick={handleConfirm}
          className={`flex-center gap-[8px] mt-[24px] h-[48px] w-full rounded-[12px] text-white ${
            userType === SubjectType.BAEZZANGE ? "bg-mainGreen" : "bg-mainBlack"
          }`}
        >
          <CheckIcon />
          <div>선택완료</div>
        </button>
      </div>
    </>
  );
}
