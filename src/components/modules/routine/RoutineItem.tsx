import {
  deleteRoutineExecution,
  postRoutineExecution,
} from "@/apis/routine-execution/routine-execution";
import { deleteRoutine } from "@/apis/routine/routine";
import CheckFillIcon from "@/components/icon/CheckFillIcon";
import CheckIcon from "@/components/icon/CheckIcon";
import MoreIcon from "@/components/icon/MoreIcon";
import { useActionSheetOverlay } from "@/components/overlay/actionSheet/ActionSheetOverlay";
import { useAlertOverlay } from "@/components/overlay/alert/AlertOverlay";
import { RoutineItemType } from "@/types/apis/routine";
import { SubjectType, convertEmojiImgSrc } from "@/types/common";
import dayjs from "dayjs";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props extends RoutineItemType {
  isExecution: boolean;
  formatDate: string;
  refetch: () => void;
}

export default function RoutineItem(props: Props) {
  const router = useRouter();
  const {
    tendency,
    description,
    name,
    emoji,
    isExecution,
    formatDate,
    routineId,
    refetch,
  } = props;
  const { active } = useActionSheetOverlay();
  const { active: alertActive } = useAlertOverlay();

  return (
    <div className="rounded-[12px] pt-[12px] px-[16px] pb-[20px] bg-white h-[109px] w-full">
      <div className="flex items-center">
        <div
          className={`flex-center h-[21px] px-[8px] py-[2px] rounded-[8px] text-[12px] font-[400] ${
            tendency === SubjectType.BAEZZANGE
              ? "text-mainGreen bg-subGreen"
              : "text-mainBlack bg-subBlack"
          }`}
        >
          {tendency === SubjectType.BAEZZANGE ? "베짱이루틴" : "개미루틴"}
        </div>
        <button
          className="ml-auto"
          onClick={() =>
            active({
              list: [
                {
                  title: "루틴 편집",
                  onClick: async () => {
                    router.push(`/routine/${routineId}/edit`);
                  },
                },
                {
                  title: "루틴 삭제",
                  className: "text-negative",
                  onClick: async () => {
                    alertActive({
                      contents: "루틴을 정말 삭제할까요?",
                      confirmText: "삭제",
                      onConfirm: async () => {
                        await deleteRoutine(routineId);
                        refetch();
                      },
                    });
                  },
                },
                {
                  title: "취소",
                  onClick: async () => {},
                },
              ],
            })
          }
        >
          <MoreIcon color={"#999999"} />
        </button>
      </div>
      <div className="mt-[8px] flex items-center">
        <div className="flex flex-col">
          <div className="flex items-center text-gray-900">
            <Image
              src={convertEmojiImgSrc(emoji) as StaticImport}
              width={20}
              height={20}
              alt="routine-emoji"
            />
            <div className="ml-[4px]">{name}</div>
          </div>
          <div className="mt-[4px] font-[400] text-gray-600 text-[12px]">
            {description}
          </div>
        </div>
        <div className="ml-auto">
          <button
            onClick={async () => {
              if (isExecution) {
                await deleteRoutineExecution(routineId, formatDate);
              } else {
                await postRoutineExecution(routineId, formatDate);
              }
              refetch();
            }}
          >
            <CheckFillIcon
              fillColor={
                isExecution
                  ? tendency === SubjectType.BAEZZANGE
                    ? "#2FA464"
                    : "#353C49"
                  : undefined
              }
            />
          </button>
        </div>
      </div>
    </div>
  );
}
