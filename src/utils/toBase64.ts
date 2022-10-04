export const toBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === "string") resolve(result);
      else reject("Cannot read file");
    };
    reader.onerror = (error) => reject(error);
  });
