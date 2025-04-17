import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/services/product.api";

interface UseInfiniteProductsProps {
  search?: string;
  limit?: number;
}
export const useInfiniteProducts = ({
  search,
  limit,
}: UseInfiniteProductsProps) =>
  useInfiniteQuery({
    queryKey: ["products", search],
    queryFn: ({ pageParam }) => fetchProducts(pageParam, search, limit),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.skip + lastPage.limit < lastPage.total
        ? allPages.length
        : undefined,
  });
