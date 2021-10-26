type Illustration = {
  image: {
    height: number;
    url: string;
    width: number;
  };
};

type Deliveryimages = {
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

type Informationlist = {
  date: string;
  title: string;
  urlList: Url[];
};

type Pricelist = {
  title: string;
  value: string;
};

type Video = {
  url: string;
};
