import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

export default function CreateItem() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [review, setReview] = useState("");
  const navigate = useNavigate();

  // we get the auth slice from the entire state, which(auth slice)
  // is the userInfo and the token
  const { token } = useSelector((state) => state.auth);

  // type="file", e.target.files[0]
  const onChangeFile = (e) => {
    setImage(e.target.files[0]);
  };

  // const handleCloseImg = () => {
  //   setImage("");
  // };

  const handleCreateProduct = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      let filename = null;

      if (image) {
        filename = Date.now() + image.name;
        formData.append("filename", filename);
        formData.append("image", image);

        await fetch(`http://localhost:3000/upload/image`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method: "POST",
          body: formData,
        });
      }

      // uploading product
      const res = await fetch(`http://localhost:3000/product`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: JSON.stringify({
          title,
          desc,
          category,
          img: filename,
          price,
          review,
        }),
      });

      const food = await res.json();
      navigate(`/menu`);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="flex text-white gap-16 my-14 flex-col">
      <div className="flex items-center justify-center font-bold text-3xl">
        Admin Page - Create Item
      </div>
      <div className="flex gap-28 justify-center">
        <form onSubmit={handleCreateProduct} encType="multipart/form-data">
          <div className="flex gap-9  flex-col">
            <div className="flex gap-20 justify-between items-center">
              <label>Title:</label>
              <input
                className="appearance-none bg-transparent border border-amber-400  focus:outline-none p-3 rounded-md"
                type="text"
                placeholder="Title..."
                onChange={(e) => setTitle(e.target.value)}
              ></input>
            </div>
            <div className="flex gap-20 justify-between items-center">
              <label>Description:</label>
              <input
                className="appearance-none bg-transparent border border-amber-400  focus:outline-none p-3 rounded-md"
                type="text"
                placeholder="Description..."
                onChange={(e) => setDesc(e.target.value)}
              ></input>
            </div>
            <div className="flex gap-20 justify-between items-center">
              <label>Category:</label>
              <input
                className="appearance-none bg-transparent border border-amber-400  focus:outline-none p-3 rounded-md"
                type="text"
                placeholder="Category..."
                onChange={(e) =>
                  setCategory(e.target.value.toLowerCase().replace(/\s/g, ""))
                }
              ></input>
            </div>
            <div className="flex justify-between gap-20 items-center">
              <label>Price:</label>
              <input
                className="appearance-none bg-transparent border border-amber-400  focus:outline-none p-3 rounded-md"
                type="number"
                step={0.01}
                placeholder="Price..."
                onChange={(e) => setPrice(e.target.value)}
              ></input>
            </div>
            <div className="flex justify-between gap-20 items-center">
              <label>Rating:</label>
              <input
                className="appearance-none bg-transparent border border-amber-400  focus:outline-none p-3 rounded-md"
                type="number"
                step={0.1}
                placeholder="Rating..."
                onChange={(e) => setReview(e.target.value)}
              ></input>
            </div>
            <div className="flex justify-between gap-20 items-center">
              <label htmlFor="image">Image:</label>
              <input onChange={onChangeFile} type="file"></input>
            </div>
          </div>
          <div className="justify-center items-center flex mt-8">
            <button
              type="submit"
              className=" mx-auto  bg-amber-400 hover:opacity-95 py-1 px-7 rounded-2xl"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
