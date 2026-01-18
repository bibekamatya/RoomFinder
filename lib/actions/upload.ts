'use server';

import { uploadImage, deleteImage } from '../cloudinary';

export async function uploadPropertyImage(formData: FormData) {
  const file = formData.get('file') as File;
  if (!file) throw new Error('No file provided');

  const url = await uploadImage(file);
  return { url };
}

export async function deletePropertyImage(url: string) {
  await deleteImage(url);
  return { success: true };
}
