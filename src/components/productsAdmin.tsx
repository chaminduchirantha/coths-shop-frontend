import { ImagePlus, Loader2 } from "lucide-react";
import { useRef, useState, type ChangeEvent } from "react";
import {createProduct, updateProduct } from "../services/product";
import { type ProductCardHandle } from "./ProductCard";
import ProductCard from "./ProductCard";

interface Product {
  _id: string;
    itemName :string
    price : string 
    description : string
    itemCategory : string
    imageUrl : string
    size : string
}

export default function ProductsAdmin() {
    const productCards = useRef<ProductCardHandle>(null);
    
    const [showModal, setShowModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    
    const [itemName , setItemName] = useState("")
    const [editProductId, setEditProductId] = useState<string | null>(null);
    const [price , setPrice] = useState("")
    const [description , setDescription] = useState("")
    const [itemCategory , setItemCategory] = useState("")
    const [size, setSize] = useState("")
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState("");
    const [loading, setLoading] = useState(false);

    const [alert, setAlert] = useState<{
        type: "success" | "error";
        message: string;
    } | null>(null);

    const showAlert = (type: "success" | "error", message: string) => {
        setAlert({ type, message });
        setTimeout(() => setAlert(null), 3000);
    };

    const handleEditClick = (product: Product) => {
        setIsEditMode(true);
        setEditProductId(product._id);  
        setItemName(product.itemName);
        setPrice(product.price);
        setDescription(product.description);
        setItemCategory(product.itemCategory);
        setPreview(product.imageUrl);
        setImage(null);
        setShowModal(true);
    };

    const handleAddNewClick = () => {
        setIsEditMode(false);
        resetForm();
        setShowModal(true);
    };

    const resetForm = () => {
        setItemName("");
        setPrice("");
        setDescription("");
        setItemCategory("");
        setImage(null);
        setPreview("");
    };

    const handleCloseModal = () => {
        setShowModal(false);
        resetForm();
        setIsEditMode(false);
    };

   const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setImage(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        try {
          setLoading(true);
          const formData = new FormData();
          formData.append("itemName", itemName);
          formData.append("price", price);
          formData.append("description", description);
          formData.append("itemCategory", itemCategory);
          formData.append("size", size); // Default size, can be made dynamic later
        
          if (image) {
            formData.append("image", image); 
          } else if (isEditMode) {
            formData.append("imageUrl", preview); 
          }

          if (isEditMode && editProductId) {
            await updateProduct(editProductId, formData);
            showAlert("success", "Product updated successfully!");
          } else {
            await createProduct(formData);
            showAlert("success", "Product added successfully!");
          }
        
          showAlert("success", isEditMode ? "Product updated successfully!" : "Product added successfully!");
          resetForm();
          setShowModal(false);
          setIsEditMode(false);
          
          // Refresh the product card grid
          productCards.current?.refreshData();
        } catch (error : any) {
    
          if (error.response?.status === 400) {
            showAlert("error", error.response.data.message);
          } else {
            showAlert("error", "Failed to submit. Try again!");
          }
        
        } finally {
          setLoading(false);
        }
      };


  return (
    <div>

      <div className="mb-6 flex justify-between items-center">
        <button
          onClick={handleAddNewClick}
          className="bg-indigo-400 text-white px-5 py-2 cursor-pointer rounded-lg hover:bg-blue-700"
        >
          + Add Product  Details
        </button>
      </div>

      <div>
        <ProductCard ref={productCards} 
        onEditClick={handleEditClick} 
        onDeleteSuccess={() => showAlert("success", "Product deleted successfully!")}
      />
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900 bg-opacity-50 flex justify-center items-center z-50">
            {alert && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[90%]">
              <div
                className={`
                  p-4 rounded-lg border-l-4 shadow-lg animate-fadeIn
                  ${
                    alert.type === "success"
                      ? "bg-green-100 border-green-500 text-green-800"
                      : "bg-red-100 border-red-500 text-red-800"
                  }
                `}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{alert.message}</span>
                  <button
                    onClick={() => setAlert(null)}
                    className="font-bold text-xl leading-none ml-3"
                  >
                    ×
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="bg-slate-800 border border-slate-700 w-140 rounded-lg shadow-lg p-6 relative max-h-[90vh] overflow-y-auto">

            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-3 cursor-pointer text-gray-600 hover:text-black text-4xl "
            >
              ×
            </button>

            <h2 className="text-xl font-bold mb-4 text-white">{isEditMode ? "Edit Product Details" : "Add New Product"}</h2>

            <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in duration-500">
  
            <div className="mb-8 border-b border-white/5 pb-4">
              <p className="text-slate-500 text-sm">Please fill in the product information accurately.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Fish Name */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Prouduct Name</label>
                <input
                  type="text"
                  name="productName"
                  placeholder="e.g. Blue Diamond Discus"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl px-5 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-slate-600 shadow-inner"
                  required
                />
              </div>

              {/* Price */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Price ($)</label>
                <input
                  type="text"
                  name="price"
                  placeholder="0.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl px-5 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-slate-600 shadow-inner"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Size</label>
              <input
                type="text"
                name="size"
                placeholder="Ex-> S, M, L, XL 2XL 3XL"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl px-5 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-slate-600 shadow-inner"
                required
              />
            </div>  

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Category</label>
              <select
                name="productCategory"
                value={itemCategory}
                onChange={(e) => setItemCategory(e.target.value)}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl px-5 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all appearance-none cursor-pointer"
                required
              >
                <option value="" className="bg-slate-900">Select Category</option>
                <option value="Men's Wear" className="bg-slate-900">Men's Wear</option>
                <option value="Women's Wear" className="bg-slate-900">Women's Wear</option>
                <option value="Kids Collection" className="bg-slate-900">Kids Collection</option>
                <option value="Formal & Suits" className="bg-slate-900">Formal & Suits</option>
                <option value="Streetwear" className="bg-slate-900">Streetwear</option>
                <option value="Accessories" className="bg-slate-900">Accessories</option>
                <option value="Limited Edition" className="bg-slate-900">Limited Edition</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Detailed Description</label>
              <textarea
                name="description"
                placeholder="Describe the fish temperament, size, and care needs..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                // rows="4"
                className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl px-5 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-slate-600 resize-none shadow-inner"
              ></textarea>
            </div>

            <div className="space-y-4 mt-8">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Product Media</label>
              <div className="flex flex-col items-center">
                <label className="group relative w-full h-44 flex flex-col items-center justify-center border-2 border-dashed border-slate-700 rounded-2xl cursor-pointer hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all overflow-hidden">
                  
                  <div className="absolute inset-0 bg-linear-to-b from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="flex flex-col items-center justify-center relative z-10">
                    <ImagePlus className="text-indigo-500 mb-3 group-hover:scale-110 transition-transform duration-300" size={32} />
                    <span className="text-slate-400 font-medium group-hover:text-slate-200 transition-colors">
                      {image ? image.name : (isEditMode ? "Change Image" : "Drop image here or click to upload")}
                    </span>
                    <p className="text-[10px] text-slate-600 mt-1 uppercase tracking-tighter">PNG, JPG up to 10MB</p>
                  </div>
                  
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>

                {preview && (
                  <div className="mt-6 relative w-full p-2 bg-white/5 border border-white/10 rounded-xl overflow-hidden backdrop-blur-sm">
                    <img
                      src={preview}
                      alt="preview"
                      className="w-full h-64 object-cover rounded-2xl shadow-2xl"
                    />
                    <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[10px] text-white font-bold uppercase">
                      Live Preview
                    </div>
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="mt-10 group relative w-full overflow-hidden rounded-2xl bg-indigo-600 p-4 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-600/20"
              disabled={loading}
            >
              <div className="absolute inset-0 w-0 bg-indigo-500 transition-all duration-500 ease-out group-hover:w-full"></div>
              <div className="relative flex justify-center items-center gap-3">
                {loading ? (
                  <Loader2 className="animate-spin text-white" size={22} />
                ) : (
                  <span className="text-sm font-black uppercase tracking-[0.2em] text-white">
                    {isEditMode ? "Update Product" : "Save to Inventory"}
                  </span>
                )}
              </div>
            </button>
          </form>
          </div>
        </div>
      )}
    </div>

    
    
    
  )
}
