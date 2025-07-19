import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '@/firebase'; // Your existing firebase config
import { auth } from '@/firebase';

export const uploadResume = async (file: File): Promise<{ 
  success: boolean; 
  url?: string; 
  error?: string 
}> => {
  try {
    if (!auth.currentUser) throw new Error('Not authenticated');
    
    const userId = auth.currentUser.uid;
    const timestamp = Date.now();
    const extension = file.name.split('.').pop();
    const fileName = `resume_${timestamp}.${extension}`;
    const filePath = `resumes/${userId}/${fileName}`;

    const fileRef = ref(storage, filePath);
    await uploadBytesResumable(fileRef, file, {
      contentType: file.type,
      customMetadata: {
        originalName: file.name,
        uploader: userId,
        uploadedAt: timestamp.toString()
      }
    });

    const downloadURL = await getDownloadURL(fileRef);
    return { success: true, url: downloadURL };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'File upload failed'
    };
  }
};