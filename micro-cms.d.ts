type Illustration = {
  image: {
    height: number;
    url: string;
    width: number;
  };
};

type Url = {
  fieldId: string;
  url: string;
};

type Information = {
  date: string;
  title: string;
  urlList: Url[];
};

type Video = {
  url: string;
};
