// @ts-nocheck
import React from "react";
import { Button } from "react-bootstrap";

export default function ImageUploader({ uploadPreset, uploadImageUrl }) {
  const myCropWidget = async () => {
    const uploadWidget = cloudinary.createUploadWidget(
      {
        cloudName: "leaves-client",
        uploadPreset: uploadPreset,
        cropping: true,
      },

      (error, result) => {
        console.log(error, result);

        if (result.event === "success") {
          uploadImageUrl(result.info.url);
        }
      }
    );
    uploadWidget.open();
  };

  return (
    <div>
      <Button variant="success" onClick={myCropWidget}>
        Upload picture
      </Button>
    </div>
  );
}
