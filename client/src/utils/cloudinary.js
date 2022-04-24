// import { keys } from "./apiKeys";

export const cloudinaryFunc = async (file) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);

  const formData = new FormData();
  formData.append("file", file);
  // replace this with your upload preset name
  formData.append("upload_preset", process.env.REACT_APP_PRESET);
  const options = {
    method: "POST",
    body: formData,
  };

  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD}/image/upload`,
      options
    );
    const res_1 = await res.json();
    return {
      name: file.name,
      size: file.size,
      type: file.type,
      img: res_1.secure_url,
    };
  } catch (err) {
    return console.log(err);
  }
};
