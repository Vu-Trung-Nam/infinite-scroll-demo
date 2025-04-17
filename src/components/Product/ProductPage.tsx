"use client";

import { useEffect, useRef, useState } from "react";
import { useDebounce } from "@/hooks/Debounce/useDebounce";
import { useInfiniteProducts } from "@/hooks/Product/useInfiniteProducts";
import React from "react";
import { Input } from "@/components/ui/input";
import ProductList from "./ProductList";

const ProductPage = () => {
  const [search, setSearch] = useState("");
  const searchDebounced = useDebounce(search);
  const loadMoreTriggerRef = useRef<HTMLDivElement>(null);

  const {
    data: productInfiniteData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    isError,
  } = useInfiniteProducts({ search: searchDebounced });

  const _onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  useEffect(() => {
    if (!loadMoreTriggerRef.current || !hasNextPage || isFetchingNextPage)
      return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) fetchNextPage();
    });

    observer.observe(loadMoreTriggerRef.current);
    return () => observer.disconnect();
  }, [loadMoreTriggerRef, hasNextPage, isFetchingNextPage]);

  return (
    <div className="max-w-5xl mx-auto">
      <Input
        placeholder="Search products..."
        value={search}
        onChange={_onChangeSearchInput}
        className="mb-4"
      />
      {isError && <div className="mx-auto">Error</div>}
      {!isError && (
        <ProductList
          isFetching={isFetching}
          isFetchingNextPage={isFetchingNextPage}
          productInfiniteData={productInfiniteData}
          loadMoreTriggerRef={loadMoreTriggerRef}
        />
      )}
    </div>
  );
};
export default ProductPage;
