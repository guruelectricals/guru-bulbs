export interface Video {
  _id: string;
  title: string;
  slug: {
    current: string;
  };

  description?: any;

  featured: boolean;

  videoSource: "tiktok" | "upload";

  tiktokUrl?: string;

  videoFile?: {
    asset: {
      _id: string;
      url: string;
    };
  };


  thumbnail?: {
    asset: {
      _id: string;
      url: string;
    };
    alt?: string;
  };

  category?: {
    title: string;
    slug: {
      current: string;
    };
  };
}