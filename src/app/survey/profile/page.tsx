"use client";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import baejjange from "../../../../public/Ellipse1.png";
import gaemi from "../../../../public/Ellipse2.png";
import camera from "../../../../public/camera.png";
import { useUserColor } from "@/store/userColorContext";
import useUserStore from "@/store/useUserStore";
import { useRouter } from "next/navigation";
import { postUserOnboarding } from "@/apis/user/user";
import { postFile } from "@/apis/file/file";
import { FileType } from "@/types/apis/file";
import { HOME_PATH } from "@/store/path";
import useMyStore from "@/store/useMyStore";

export default function Main() {
  const [select, setSelect] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const userColor = useUserColor();
  const userType = useMyStore((state) => state.tendency);
  const router = useRouter();
  const [uploadImg, setUploadImg] = useState<string>("");
  const [uploadFile, setUploadFile] = useState<Blob | string>("");

  const handleToMain = async () => {
    const { data } = await postFile(FileType.USER_IMAGE, uploadFile);

    await postUserOnboarding({
      nickname: "test22",
      tendency: userType,
      profileImagePath: data.data.path,
    });
    router.push(HOME_PATH);
  };

  const changeUserImg = (e: ChangeEvent<HTMLInputElement>) => {
    //유저가 누를때 파일의 0번째 있는걸 가져와서 해당 이미지에 놓을거
    const files = e.target.files;
    console.log(files);
    if (files && files.length > 0) {
      const file = files[0];
      setUploadFile(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        // 이미지를 처리하는 코드
        if (reader.result) {
          setUploadImg(reader.result.toString());
        }
      };
    } else {
      console.log("파일이 선택되지 않았습니다.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-start bg-gray-50 h-full">
      {/* <ProgressBar srcImg={onestep} /> */}

      <div className="w-full p-6 mt-4 flex justify-between items-center ">
        <div className="self-start ml-[20px] mb-[32px]">
          <p className="text-2xl font-bold">개미와 베짱이에서</p>
          <p className="text-2xl font-bold">어떤 프로필로 활동할까요?</p>
        </div>
      </div>
      {uploadImg ? (
        <div className="w-[103px] h-[100px] rounded-full overflow-hidden flex justify-center items-center border-2 border-gray-100">
          <input
            type="file"
            id="fileInput"
            className="hidden"
            accept="image/*"
            onChange={changeUserImg}
          />
          <label htmlFor="fileInput">
            <Image
              src={uploadImg}
              alt="user-upload-img"
              width={103}
              height={100}
            />
          </label>
        </div>
      ) : (
        <div className="relative flex justify-center items-center mb-[24px] cursor-pointer">
          <input
            type="file"
            id="fileInput"
            className="hidden"
            accept="image/*"
            onChange={changeUserImg}
          />
          <label htmlFor="fileInput">
            {userColor === "mainGreen" ? (
              <Image alt="user-img" src={baejjange} width={103} height={100} />
            ) : (
              <Image alt="user-img" src={gaemi} width={103} height={100} />
            )}

            <p className="absolute bottom-0 right-0">
              <Image alt="user-img" src={camera} width={40} />
            </p>
          </label>
        </div>
      )}

      <div>
        <input
          className={`border-b-2 bg-gray-50 w-[335px] h-[40px] focus:outline-none focus:border-${userColor}`}
          placeholder="닉네임을 입력해주세요"
        />
        <div className="self-start mt-[8px] text-gray-600">
          6자리 이내, 문자/숫자 가능, 특수문자/기호 입력불가
        </div>
      </div>

      <button
        className={`${
          select ? `bg-${userColor}` : ""
        } disabled flex flex-col items-center justify-center absolute w-[500px] max-w-[100vw] h-[90px] max-h-[10vh] bg-gray-100 bottom-0 p-2 rounded-t-sm`}
      >
        <span
          onClick={handleToMain}
          className={`${
            select ? "text-white" : "text-gray-400"
          } flex justify-center items-center h-1/3 w-full text-lg`}
        >
          개짱이 시작하기
        </span>
      </button>
    </div>
  );
}
