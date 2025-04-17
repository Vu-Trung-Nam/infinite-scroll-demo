import { Product } from "@/types/product.types";
import Image from "next/image";

type Props = {
  product: Product;
};

export const ProductCard = ({ product }: Props) => {
  return (
    <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 bg-white flex flex-col gap-3">
      <Image
        src={product.thumbnail}
        alt={product.title}
        height={192}
        width={384}
        className="w-full h-48 object-fill rounded-md"
      />

      <div className="flex-1">
        <h2 className="text-lg font-semibold line-clamp-1">{product.title}</h2>
        <p className="text-sm text-gray-500 line-clamp-2">
          {product.description}
        </p>
      </div>

      <div className="flex justify-between items-center text-sm mt-2">
        <span className="text-green-600 font-bold">${product.price}</span>
        <span className="text-red-500">-{product.discountPercentage}%</span>
      </div>

      <div className="flex justify-between items-center text-xs text-gray-600">
        <span>
          {product.stock <= 5 ? (
            <span className="text-red-600">Low Stock ({product.stock})</span>
          ) : (
            <span>In Stock ({product.stock})</span>
          )}
        </span>
        <span>⭐ {product.rating}</span>
      </div>

      <div className="text-xs text-gray-400 italic text-right">
        {product.brand}
      </div>
    </div>
  );
};
