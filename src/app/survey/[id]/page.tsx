"use client";
import React, { useEffect } from "react";
//Props의 타입을 명시해준다.
type Props = {
  params: {
    slug: number;
  };
};

function page({ params }: { params: { id: number } }) {
  useEffect(() => {
    console.log(params);
  });
  return <div>ㅇㅇ : {params.id}</div>;
  //접근한 params의 내용물을 화면에 출력해준다.
}

export default page;

// step뒤에 있는 params를 가져와서
// survey?step=2라면 2를 가져옴
