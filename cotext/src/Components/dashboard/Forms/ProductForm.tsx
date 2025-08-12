import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../../Redux/Store";
import { createProduct, resetPostProduct } from "../../../Redux/Slice/Products/CreateProductSlice";
import { updateProduct } from "../../../Redux/Slice/Products/updateProductSlice"; // Import update action
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils"


const ProductForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>(); // Get product ID from URL
  const [collapsed, setCollapsed] = useState(false)

  const { isLoading, isSuccess, isError, errorMsg } = useSelector(
    (state: RootState) => state.createProduct
  );

  const { selectedProduct, loading: updateLoading, successMessage } = useSelector(
    (state: RootState) => state.updateProduct
  );

  const [formData, setFormData] = useState({
    name: "", // Ensure this is an empty string
    doc: "",  // Ensure this is an empty string
    price: 0, // Ensure this is a valid number
    image: null as File | null, // Null for file
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Fetch product details if updating
  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/products/get/${id}`);
          const product = response.data.product;
          console.log(product);
          
          setFormData({
            name: product.name || "",  // Set default value if undefined
            doc: product.doc || "",    // Set default value if undefined
            price: product.price || 0, // Ensure a valid price
            image: null,               // Don't store the image file, only show preview
          });
          setImagePreview(product.image || null); // Set image preview or null
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      };
      fetchProduct();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "price" ? Number(value) || 0 : value, // Ensure price is a valid number
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file)); // Generate image preview
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let imageUrl = imagePreview;

    // If a new image is uploaded, upload it to Cloudinary
    if (formData.image) {
      const imageData = new FormData();
      imageData.append("file", formData.image);
      imageData.append("upload_preset", "Upload_Image");
      imageData.append("cloud_name", "dorj2cfvr");

      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dorj2cfvr/image/upload",
          imageData
        );
        imageUrl = response.data.secure_url;
      } catch (error) {
        console.error("Error uploading image:", error);
        return;
      }
    }

    if (id) {
      // If ID exists, update the product
      dispatch(updateProduct({
        id: Number(id), 
        name: formData.name, 
        doc: formData.doc, 
        price: formData.price, 
        image: imageUrl
      }));
    } else {
      // If no ID, create a new product
      dispatch(createProduct({
        name: formData.name, 
        doc: formData.doc, 
        price: formData.price, 
        image: imageUrl
      }));
    }
  };

  useEffect(() => {
    if (isSuccess || successMessage) {
      alert(id ? "Product updated successfully!" : "Product added successfully!");
      setFormData({ name: "", doc: "", price: 0, image: null });
      setImagePreview(null);
      dispatch(resetPostProduct());
    }
  }, [isSuccess, successMessage, dispatch, id]);

  return (
    <div className={cn(`w-full min-h-screen  flex items-center justify-center p-6 bg-gray-501`)}>
      <Card className={`w-full ml-80  shadow-lg`}>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-gray-800">
            {id ? "Update Product" : "Add New Product"}
          </CardTitle>
          <CardDescription className="text-center text-gray-600">
            {id ? "Modify the details of your product." : "Fill in the details to add a new product to your inventory."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Name */}
            <div>
              <label className="text-sm font-medium text-gray-700">Product Name</label>
              <Input
                className="p-6"
                type="text"
                name="name"
                value={formData.name || ""} // Prevent undefined value
                onChange={handleChange}
                placeholder="Enter product name"
                required
              />
            </div>

            {/* Price */}
            <div>
              <label className="text-sm font-medium text-gray-700">Price ($)</label>
              <Input
                className="p-6"
                type="number"
                name="price"
                value={formData.price || 0} // Prevent undefined value
                onChange={handleChange}
                placeholder="Enter price"
                required
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-gray-700">Description</label>
              <Textarea
                name="doc"
                value={formData.doc || ""} // Prevent undefined value
                onChange={handleChange}
                placeholder="Enter product description"
                rows={4}
                required
              />
            </div>

            {/* Image Upload */}
            <div className="md:col-span-2 flex flex-col items-center">
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center p-28 w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-100 hover:bg-gray-200"
              >
                <span className="text-gray-600">Click to upload or drag & drop an image</span>
              </label>
              <Input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-3 w-40 h-40 object-cover rounded-lg border"
                />
              )}
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 flex">
              <Button type="submit" className="mt-3 p-6 w-40" disabled={isLoading || updateLoading}>
                {isLoading || updateLoading ? "Submitting..." : id ? "Update" : "Submit"}
              </Button>
            </div>
          </form>

          {isError && <p className="mt-4 text-center text-red-500">{errorMsg}</p>}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductForm;
