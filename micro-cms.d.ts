declare namespace MicroCMS {
  // 納品イメージ
  type DeliveryImage = {
    image: {
      height: number;
      url: string;
      width: number;
    };
  };

  // イラスト
  type Illustration = {
    image: {
      height: number;
      url: string;
      width: number;
    };
  };

  // インフォメーション
  type Information = {
    date: string;
    title: string;
    urlList: Url[];
  };

  // 料金詳細
  type PriceDetail = {
    datehtml: string;
    flowhtml: string;
    pricehtml: string;
    termsOfService: string;
  };

  // 料金体系
  type Price = {
    title: string;
    value: string;
  };

  // 動画
  type Video = {
    url: string;
  };

  type Endpoints = {
    list: {
      deliveryimages: DeliveryImage;
      illustrations: Illustration;
      informationlist: Information;
      pricelist: Price;
      videos: Video;
    };
    object: {
      pricedetail: PriceDetail;
    };
  };
}
