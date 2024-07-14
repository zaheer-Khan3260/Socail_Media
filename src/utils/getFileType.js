export default function getFileType(postFile) {
    
    const extension = postFile?.split('.')?.pop()?.toLowerCase();

const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
const videoExtensions = ['mp4', 'webm', 'ogg', 'mov'];

if (imageExtensions.includes(extension)) {
  return "image";
} else if (videoExtensions.includes(extension)) {
  return "video"
}
}