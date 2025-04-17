import { ProductResponse } from "@/types/product.types";
import React from "react";
import { SkeletonProducts } from "../ui/skeleton-products";
import { ProductCard } from "./ProductCard";
import { InfiniteData } from "@tanstack/react-query";

interface Props {
  productInfiniteData: InfiniteData<ProductResponse, unknown> | undefined;
  isFetching: boolean;
  isFetchingNextPage: boolean;
  loadMoreTriggerRef: React.RefObject<HTMLDivElement | null>;
}
const ProductList = ({
  productInfiniteData,
  isFetching,
  isFetchingNextPage,
  loadMoreTriggerRef,
}: Props) => {
  const isFirstLoading = !productInfiniteData && isFetching;
  const allProducts =
    productInfiniteData?.pages.flatMap((page) => page.products) || [];

  return (
    <>
      <div className="grid gap-2 gap-y-4 md:gap-5 grid-cols-2 md:grid-cols-3">
        {isFirstLoading && <SkeletonProducts />}

        {allProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}

        {isFetchingNextPage && <SkeletonProducts />}
      </div>
      <div ref={loadMoreTriggerRef} className="h-10" />
    </>
  );
};

export default ProductList;
