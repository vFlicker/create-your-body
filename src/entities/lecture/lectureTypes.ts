type Week = {
  week: number;
  cover: {
    fileId: string;
    fileName: string;
    originalName: string;
    url: string;
    size: number;
  };
  count: number;
};

type Lecture = {
  _id: string;
  title: string;
  week: number;
  duration: number;
  coverImage: {
    fileId: string;
    fileName: string;
    originalName: string;
    url: string;
    size: number;
  };
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type LectureDetail = {
  _id: string;
  title: string;
  week: number;
  duration: number;
  coverImage: {
    fileId: string;
    fileName: string;
    originalName: string;
    url: string;
    size: number;
  };
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  blocks: {
    _id: string;
    type: string;
    order: number;
    lecture: string;
    video?: {
      embedCode: string;
    };
    content?: {
      text: string;
    };
    image?: {
      alignment: string;
    };
    divider?: {
      showLine: boolean;
    };
  }[];
};

export type WeeksResponse = {
  status: string;
  data: Week[];
};

export type LecturesResponse = {
  status: string;
  data: Lecture[];
};

export type LectureDetailResponse = {
  status: string;
  data: LectureDetail;
};
