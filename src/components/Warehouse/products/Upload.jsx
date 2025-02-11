import axios from "axios";
import { X } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";

const Upload = () => {
  const [previewImages, setPreviewImages] = useState([]);
  const [images, setImages] = useState([]);
  const [savedImages, setSavedImages] = useState([]);
  const [selectedImagesCount, setSelectedImagesCount] = useState(0);
  const [savedMode, setSavedMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOnChange = (e) => {
    setImages((prevImg) => [...prevImg, ...e.target.files]);
    const selectedImagesArray = Array.from(e.target.files);
    const previewImagesArray = selectedImagesArray.map((image) =>
      URL.createObjectURL(image)
    );
    setSelectedImagesCount((prev) => prev + selectedImagesArray.length);
    setPreviewImages((prevImages) => [...prevImages, ...previewImagesArray]);
  };

  const removeHandler = (image) => {
    const removedImageIndex = previewImages.indexOf(image);
    setPreviewImages(previewImages.filter((img) => img !== image));
    URL.revokeObjectURL(image);

    const updatedImages = images.filter((img, index) => {
      return index !== removedImageIndex;
    });
    setSelectedImagesCount((prev) => prev - 1);
    setImages(updatedImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (savedMode) {
      console.log("Product image has saved");
    } else {
      if (selectedImagesCount) {
        const formData = new FormData();
        for (let i = 0; i < images.length; i++) {
          formData.append("product_images", images[i]);
        }
        formData.append("product_id", editProductId);
        try {
          const res = await axios.post("api");
          if (res.message) {
            console.log("Success");
          } else {
            throw new Error(res.message);
          }
        } catch (err) {
          console.error(err.message);
        }
      } else {
        console.error("Products images must be uploaded two photos!!!");
      }
    }
    setLoading(false);
  };

  //   const getImages = useCallback(
  //     async (id) => {
  //       try {
  //         const res = await axios.get("id");
  //         if (res.ok) {
  //           setSavedImages(res.images);
  //         } else {
  //           throw new Error(res.message);
  //         }
  //       } catch (err) {
  //         message.error(err.message);
  //       }
  //     },
  //     [setSavedImages]
  //   );

  //   useEffect(() => {
  //     getImages("id");
  //   }, [getImages, editProductId]);

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4 text-black">
        Upload Product Image
      </h1>
      <form
        action=""
        method="post"
        encType="multipart/form-data"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <label
          htmlFor="upload"
          className="p-2 rounded-md border-dashed border-2 border-black font-medium my-4 text-black cursor-pointer"
        >
          Upload From Device
        </label>
        <input
          type="file"
          hidden
          id="upload"
          name="product_image"
          multiple
          accept="image/png, image/jpg, image/jpeg"
          onChange={(e) => {
            handleOnChange(e);
          }}
        />
        <div className="m-4 flex items-center justify-center gap-4 flex-wrap">
          {previewImages.length > 0 &&
            previewImages.map((image, index) => {
              return (
                <div key={index} className="w-80 h-56 my-4 basis-1/4 relative">
                  <img
                    src={image}
                    alt={`Preview ${index}`}
                    className="w-full h-full object-cover rounded-md"
                  />
                  <div className="bg-black w-6 h-6 absolute z-20 -top-2 -right-3 cursor-pointer rounded-full">
                    <X
                      width={25}
                      height={25}
                      className="text-red-600 w-full h-full"
                      onClick={() => {
                        removeHandler(image);
                      }}
                    />
                  </div>
                </div>
              );
            })}
        </div>
        {savedImages.length > 0 && selectedImagesCount < 1 && (
          <button
            className="block my-4 text-white bg-blue-600 rounded-md px-3 py-2 font-medium"
            disabled={loading}
            onClick={() => setSavedMode(true)}
          >
            {loading ? (
              <l-bouncy size="30" speed="1.75" color="white"></l-bouncy>
            ) : (
              "Save"
            )}
          </button>
        )}
      </form>
    </div>
  );
};

export default Upload;
