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
  return (
    <React.Fragment>
      <div className="grid gap-2 gap-y-4 md:gap-5 grid-cols-2 md:grid-cols-3">
        {!productInfiniteData && isFetching && <SkeletonProducts />}
        {productInfiniteData &&
          productInfiniteData.pages.map((group, i) => (
            <React.Fragment key={i}>
              {group.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </React.Fragment>
          ))}
        {isFetchingNextPage && <SkeletonProducts />}
      </div>
      <div ref={loadMoreTriggerRef} className="h-10" />
    </React.Fragment>
  );
};

export default ProductList;
