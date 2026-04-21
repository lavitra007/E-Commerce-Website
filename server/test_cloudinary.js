try {
  const cloudinary = require("cloudinary").v2;
  cloudinary.config({
    cloud_name: undefined,
    api_key: undefined,
    api_secret: undefined,
  });
  console.log("Did not crash");
} catch (e) {
  console.error("Crashed:", e);
}
