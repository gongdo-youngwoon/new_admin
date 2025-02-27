export interface BannerFormType {
  title: string;
  desc: string;
  cta: string;
  bgColor: string;
  textColor: string;
  previewImage: string;
  imageFile: File | null;
  link: string;
  order: string;
  display: string;
}

export interface ClassFormType {
  previewImage: string;
  imageFile: File | null;
  tags: string[];
  level: number;
}
