import { axiosInstance } from "@/lib/axios";
import { ProductResponse } from "@/types/product.types";

export const fetchProducts = async (
  pageParam: number,
  search: string | undefined,
  limit: number = 20
) => {
  const skip = pageParam * limit;

  const params = {
    limit,
    ...(skip > 0 && { skip }),
    ...(search && { q: search }),
  };
  const url = search ? "/products/search" : "/products";

  const res = await axiosInstance.get<ProductResponse>(url, { params });
  return res.data;
};
