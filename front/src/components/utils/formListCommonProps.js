//리팩토링!!! 생각해보기

import { educationsCommonOptionProps } from "./optionListCommonProps";

//각각의 formset을 저장... form을 사용할 때마다 불러오기?!
//state와 setState함수 관리문제...
//1. 각 컴포넌트 (Educations, Projects ...)등에서
//   따로 선언된 useState활용하여
//   formWrapper에 넣어주기... (너무길다는 문제점? 가독성 떨어짐 )

//2. 여기에서 context를 활용해서 리듀서로(?) type별로.. 관리...ㅜㅜ 복잡? 실력부족
//   (context 사용의 단점 )
//   자주 바뀌는 경우의 문제점, Provider를 제공할 태그를 또 넣어야 한다는 점
//   Provider안에 Provider안에 Provider 안에 Provider

export const educationsCommonFormProps = [
  {
    controlId: "eduSchoolName",
    customClassName: "mb-3",
    label: "학교이름",
    placeholder: "학교이름",
  },
  {
    controlId: "eduMajor",
    customClassName: "mb-3",
    label: "전공",
    placeholder: "전공",
  },
  {
    controlId: "eduDegree",
    select: "true",
    customClassName: "mb-3",
    label: "학위",
    placeholder: "학위",
    optionValue: "학위를 선택하세요",
    optionArr: educationsCommonOptionProps,
  },
  {
    controlId: "startDate",
    customClassName: "mb-3",
    label: "입학연월일",
    type: "date",
  },
  {
    controlId: "endDate",
    customClassName: "mb-3",
    label: "졸업연월일",
    type: "date",
  },
];

export const projectsCommonFormProps = [
  {
    controlId: "projectName",
    customClassName: "mb-3",
    label: "프로젝트명",
    placeholder: "프로젝트명",
  },
  {
    controlId: "projectDetail",
    customClassName: "mb-3",
    label: "프로젝트설명",
    placeholder: "프로젝트설명",
  },
  {
    controlId: "projectImageUrl",
    customClassName: "mb-3",
    label: "프로젝트사진",
    placeholder: "https://",
  },
  {
    controlId: "projectStartDate",
    customClassName: "mb-3",
    label: "프로젝트 시작일",
    type: "date",
  },
  {
    controlId: "projectEndDate",
    customClassName: "mb-3",
    label: "프로젝트 완성일",
    type: "date",
  },
];

export const awardsCommonFormProps = [
  {
    controlId: "awardName",
    customClassName: "mb-3",
    label: "상 명",
    placeholder: "상 명",
  },
  {
    controlId: "awardDetail",
    customClassName: "mb-3",
    label: "수상내용",
    placeholder: "수상내용",
  },
  {
    controlId: "awardOrganization",
    customClassName: "mb-3",
    label: "수상기관",
    placeholder: "수상기관",
  },
  {
    controlId: "awardDate",
    customClassName: "mb-3",
    label: "수상날짜",
    type: "date",
  },
];

export const certificatesCommonFormProps = [
  {
    controlId: "certificateName",
    customClassName: "mb-3",
    label: "자격증 명",
    placeholder: "자격증 명",
  },
  {
    controlId: "certificateDetail",
    customClassName: "mb-3",
    label: "자격증 설명",
    placeholder: "자격증 설명",
  },
  {
    controlId: "certificateOrganization",
    customClassName: "mb-3",
    label: "자격증 발급 기관",
    placeholder: "자격증 발급 기관",
  },
  {
    controlId: "certificateDate",
    customClassName: "mb-3",
    label: "자격증 발급 일자",
    type: "date",
  },
];
