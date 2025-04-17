"use client";

import React, { useState } from "react";
import ProductCard from "./ProductCard";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { Search, SlidersHorizontal } from "lucide-react";

interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  rating: number;
  category: string;
}

interface ProductGridProps {
  products?: Product[];
  title?: string;
  showFilters?: boolean;
}

const ProductGrid = ({
  products = [
    {
      id: "1",
      title: "Premium Wireless Headphones",
      price: 199.99,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
      rating: 4.5,
      category: "Electronics",
    },
    {
      id: "2",
      title: "Organic Cotton T-Shirt",
      price: 29.99,
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80",
      rating: 4.2,
      category: "Clothing",
    },
    {
      id: "3",
      title: "Smart Home Speaker",
      price: 129.99,
      image:
        "https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=500&q=80",
      rating: 4.7,
      category: "Electronics",
    },
    {
      id: "4",
      title: "Stainless Steel Water Bottle",
      price: 24.99,
      image:
        "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&q=80",
      rating: 4.3,
      category: "Home & Kitchen",
    },
    {
      id: "5",
      title: "Wireless Charging Pad",
      price: 39.99,
      image:
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&q=80",
      rating: 4.1,
      category: "Electronics",
    },
    {
      id: "6",
      title: "Leather Wallet",
      price: 49.99,
      image:
        "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&q=80",
      rating: 4.4,
      category: "Accessories",
    },
    {
      id: "7",
      title: "Fitness Tracker Watch",
      price: 89.99,
      image:
        "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&q=80",
      rating: 4.6,
      category: "Electronics",
    },
    {
      id: "8",
      title: "Ceramic Coffee Mug",
      price: 14.99,
      image:
        "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500&q=80",
      rating: 4.0,
      category: "Home & Kitchen",
    },
  ],
  title = "Featured Products",
  showFilters = true,
}: ProductGridProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Get unique categories from products
  const categories = [
    "all",
    ...new Set(products.map((product) => product.category)),
  ];

  // Filter products based on search term and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort products based on selected sort option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0; // Default: featured/no sorting
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-background">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>

        {showFilters && (
          <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4 mt-4 md:mt-0">
            <div className="relative w-full sm:w-64">
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>

            <div className="flex gap-2 items-center">
              <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Top Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>

      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              image={product.image}
              rating={product.rating}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">
            No products found matching your criteria.
          </p>
          <Button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("all");
              setSortBy("featured");
            }}
          >
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
