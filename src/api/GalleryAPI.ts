import { IImage } from "./types";

const images: Array<IImage> = [
  {
    id: 1,
    base64Image: "http://localhost/1",
    title: "Image",
    description: "Image",
  },
  {
    id: 2,
    base64Image: "http://localhost/2",
    title: "Image",
    description: "Image",
  },
  {
    id: 3,
    base64Image: "http://localhost/1",
    title: "Image",
    description: "Image",
  },
  {
    id: 4,
    base64Image: "http://localhost/2",
    title: "Image",
    description: "Image",
  },
  {
    id: 5,
    base64Image: "http://localhost/1",
    title: "Image",
    description: "Image",
  },
  {
    id: 6,
    base64Image: "http://localhost/2",
    title: "Image",
    description: "Image",
  },
  {
    id: 7,
    base64Image: "http://localhost/1",
    title: "Image",
    description: "Image",
  },
  {
    id: 8,
    base64Image: "http://localhost/2",
    title: "Image",
    description: "Image",
  },
  {
    id: 9,
    base64Image: "http://localhost/1",
    title: "Image",
    description: "Image",
  },
  {
    id: 10,
    base64Image: "http://localhost/2",
    title: "Image",
    description: "Image",
  },
];

class GalleryAPI {
  static getImages(): Promise<Array<IImage>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(images);
      }, 2000);
    });
  }

  static addImage(): Promise<IImage> {
    return new Promise((resolve) => resolve(images[0]));
  }

  static editImage(): Promise<IImage> {
    return new Promise((resolve) => resolve(images[0]));
  }

  static deleteImage(): Promise<void> {
    return new Promise((resolve) => resolve());
  }
}

export default GalleryAPI;
