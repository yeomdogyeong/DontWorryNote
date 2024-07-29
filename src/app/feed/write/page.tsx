"use client";

import imageCompression from "browser-image-compression";
import { Header } from "@/components/Header";
import { PostType, SubjectType, convertPostTypeValue } from "@/types/common";
import { useCallback, useRef, useState } from "react";
import gaemiImg from "../../../../public/small_gaemi.png";
import baejjangeImg from "../../../../public/small_baejjange.png";
import Image from "next/image";
import RightArrowIcon from "@/components/icon/RightArrowIcon";
import AddPictureIcon from "@/components/icon/AddPictureIcon";
import ImageCloseIcon from "@/components/icon/ImageCloseIcon";
import { useAddPostCateogoryModalOverlay } from "@/components/overlay/addPostCategoryModal/AddPostCategoryModalOverlay";
import { postFeed } from "@/apis/feed/feed";
import { postFile } from "@/apis/file/file";
import { FileType } from "@/types/apis/file";
import { useRouter } from "next/navigation";
import { FEED_PATH } from "@/store/path";

export default function AddPostPage() {
  const router = useRouter();
  const [type, setType] = useState(SubjectType.GAEMI);
  const [postType, setPostType] = useState<PostType | null>(null);
  const [contents, setContents] = useState<string | undefined>(undefined);
  const [file, setFile] = useState<File>();
  const [url, setUrl] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const { active } = useAddPostCateogoryModalOverlay();

  const handlePostType = useCallback(() => {
    active({
      list: [
        {
          title: "루틴 공유",
          onClick: async () => setPostType(PostType.ROUTINE_SHARE),
        },
        {
          title: "루틴 인증",
          onClick: async () => setPostType(PostType.ROUTINE_AUTHENTICATION),
        },
        {
          title: "루틴 질문",
          onClick: async () => setPostType(PostType.ROUTINE_QUESTION),
        },
        {
          title: "일상글",
          onClick: async () => setPostType(PostType.DAILY),
        },
        {
          title: "기타",
          onClick: async () => setPostType(PostType.ETC),
        },
      ],
    });
  }, [active, setPostType]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const fileList = event.currentTarget.files as FileList;
    let file = fileList[0];

    const resizingBlob = await imageCompression(file, {
      maxSizeMB: 1.0,
      maxWidthOrHeight: 1920,
    });
    file = new File([resizingBlob], file.name, {
      type: file.type,
    });

    const url = window.URL.createObjectURL(file);
    setUrl(url);
    setFile(file);
  };

  const handleAddClick = useCallback(async () => {
    setIsLoading(true);
    const { data } = await postFile(FileType.FEED_IMAGE, file);
    await postFeed({
      tendency: type,
      category: postType as PostType,
      content: contents as string,
      feedImagePath: data.data.path,
    });
    router.push(FEED_PATH);
    setIsLoading(false);
  }, [file, type, postType, contents, router]);

  const handleContentsChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setContents(e.target.value);
    },
    []
  );
  return (
    <div className="flex flex-col items-center justify-start h-max min-h-full bg-white">
      <Header
        title="게시글 작성"
        rightButton={
          <button
            disabled={isLoading}
            onClick={handleAddClick}
            className="text-mainGreen font-[600] text-[16px]"
          >
            완료
          </button>
        }
      />
      <div className="flex flex-col py-[24px] px-[20px] w-full h-max">
        <div className="flex gap-[8px] w-full">
          <div
            className={`flex-center gap-[8px] border-[1px] rounded-[8px] flex-1 h-[48px] cursor-pointer border-gray-200 ${
              type === SubjectType.GAEMI
                ? "text-mainBlack bg-subBlack border-mainBlack"
                : ""
            }`}
            onClick={() => setType(SubjectType.GAEMI)}
          >
            <Image src={gaemiImg} alt="gaemi" className="w-[24px] h-[24px]" />
            <div>개미 피드</div>
          </div>
          <div
            className={`flex-center gap-[8px] border-[1px] rounded-[8px] flex-1 h-[48px] cursor-pointer border-gray-200 ${
              type === SubjectType.BAEZZANGE
                ? "text-mainGreen bg-subGreen border-mainGreen"
                : ""
            }`}
            onClick={() => setType(SubjectType.BAEZZANGE)}
          >
            <Image
              src={baejjangeImg}
              alt="baejjange"
              className="w-[24px] h-[24px]"
            />
            <div>베짱이 피드</div>
          </div>
        </div>
        <button
          onClick={handlePostType}
          className="mt-[12px] px-[13px] py-[16px] flex justify-between items-center border-[1px] rounded-[8px] w-full h-[48px]"
        >
          <div>{convertPostTypeValue(postType)}</div>
          <RightArrowIcon />
        </button>
        <textarea
          value={contents}
          onChange={handleContentsChange}
          className="bg-transparent	resize-none mt-[8px] px-[16px] py-[20px] border-[1px] rounded-[8px] w-full h-[220px] text-gray-800"
        />
        <button className="mt-[12px] flex-center gap-[6px] border-[1px] rounded-[8px] w-full h-[52px]">
          <AddPictureIcon />
          <div
            className="text-gray-700"
            onClick={() => fileInputRef.current?.click()}
          >
            사진 첨부하기
          </div>
          <input
            type="file"
            accept={"image/jpeg, image/png"}
            ref={fileInputRef}
            onChange={handleFileChange}
            hidden
          />
        </button>
        {url && (
          <div className="w-[88px] h-[88px] relative">
            <Image
              style={{ height: 80 }}
              alt="post-img"
              width={80}
              height={80}
              objectFit="cover"
              className="absolute bottom-0 left-0 rounded-[8px]"
              src={url}
            />
            <button
              className="absolute right-0 top-0"
              onClick={() => {
                setFile(undefined);
                setUrl(null);
              }}
            >
              <ImageCloseIcon />
            </button>
          </div>
        )}
        <div className="mt-[40px] text-gray-900">
          <div>커뮤니티 이용 안내</div>
          <div className="mt-[12px] text-gray-600">
            <div>
              아래와 같은 게시물을 업로드 시, 이용 약관에 따라 예고 없이
              게시물이 삭제되고 계정 이용이 제한되며, 사안에 따라 민형사상 법적
              조치가 이뤄질 수 있습니다.
            </div>
            <div className="mt-[12px] space-y-[5px]">
              <div className="flex items-center text-[13px] text-gray-600">
                <div className="my-[8px] mx-[4px] bg-gray-600 w-[2px] h-[2px] rounded-full" />
                <div>다른 사람에게 불쾌감을 주는 게시물</div>
              </div>
              <div className="flex items-center text-[13px] text-gray-600">
                <div className="my-[8px] mx-[4px] bg-gray-600 w-[2px] h-[2px] rounded-full" />
                <div>여러 번의 신고가 누적된 게시물</div>
              </div>
              <div className="flex items-center text-[13px] text-gray-600">
                <div className="my-[8px] mx-[4px] bg-gray-600 w-[2px] h-[2px] rounded-full" />
                <div>
                  기타 커뮤니티의 이용 목적에 부합하지 않거나, 취지와 무관한
                  게시물 등
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
