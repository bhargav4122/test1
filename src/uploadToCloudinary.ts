export const uploadToCloudinary = async (file: File): Promise<string | null> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "cv_uploads"); // 👈 use your preset name

  try {
    const res = await fetch("https://api.cloudinary.com/v1_1/dsf4d41i8/auto/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.secure_url) {
      return data.secure_url;
    } else {
      console.error("Cloudinary error:", data);
      return null;
    }
  } catch (error) {
    console.error("Upload error:", error);
    return null;
  }
};
