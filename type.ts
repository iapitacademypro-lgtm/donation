type Donation = {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  image?: {
    asset: {
      url: string;
    };
    alt?: string;
  };
  contributors?: string[];
  amount?: number;
  supporters?: number;
  mealsInProgressRatio?: number;
  galleryImages?: {
    asset: {
      url: string;
    };
    alt?: string;
  }[];
  updates?: {
    title: string;
    date: string;
    content: string;
  }[];
};
