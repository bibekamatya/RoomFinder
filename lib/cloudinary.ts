import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "roomfinder",
  api_key: "434176423344947",
  api_secret: "K23w18B232aOs8g-jnla5yJyRGo",
});

export async function uploadImage(file: File) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "roomfinder" }, (error, result) => {
        if (error) reject(error);
        else resolve(result?.secure_url);
      })
      .end(buffer);
  });
}

export async function deleteImage(url: string) {
  const publicId = url.split("/").slice(-2).join("/").split(".")[0];
  await cloudinary.uploader.destroy(publicId);
}

export async function deleteImages(urls: string[]) {
  await Promise.all(urls.map((url) => deleteImage(url)));
}

export default cloudinary;
