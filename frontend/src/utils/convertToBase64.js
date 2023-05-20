export function convertToBase64(e, setFile) {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = function (event) {
    const base64 = event.target.result;
    setFile(base64);
  };

  reader.readAsDataURL(file);
}
