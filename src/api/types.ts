export interface IImage {
  id: number;
  base64Image: string;
  title: string;
  description?: string;
}

export type ImageOperationData = Omit<IImage, "id"> & { id?: number };
