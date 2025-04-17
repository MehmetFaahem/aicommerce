"use client";

import React from "react";
import { useParams } from "next/navigation";
import ProductGrid from "@/components/ProductGrid";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  rating: number;
  category: string;
}

// Sample product data - in a real app, this would come from an API or database
const allProducts: Product[] = [
  {
    id: "1",
    title: "Premium Wireless Headphones",
    price: 199.99,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    rating: 4.5,
    category: "electronics",
  },
  {
    id: "2",
    title: "Organic Cotton T-Shirt",
    price: 29.99,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80",
    rating: 4.2,
    category: "clothing",
  },
  {
    id: "3",
    title: "Smart Home Speaker",
    price: 129.99,
    image:
      "https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=500&q=80",
    rating: 4.7,
    category: "electronics",
  },
  {
    id: "4",
    title: "Stainless Steel Water Bottle",
    price: 24.99,
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&q=80",
    rating: 4.3,
    category: "home-kitchen",
  },
  {
    id: "5",
    title: "Wireless Charging Pad",
    price: 39.99,
    image:
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&q=80",
    rating: 4.1,
    category: "electronics",
  },
  {
    id: "6",
    title: "Leather Wallet",
    price: 49.99,
    image:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&q=80",
    rating: 4.4,
    category: "accessories",
  },
  {
    id: "7",
    title: "Fitness Tracker Watch",
    price: 89.99,
    image:
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&q=80",
    rating: 4.6,
    category: "electronics",
  },
  {
    id: "8",
    title: "Ceramic Coffee Mug",
    price: 14.99,
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500&q=80",
    rating: 4.0,
    category: "home-kitchen",
  },
  {
    id: "9",
    title: "Natural Face Serum",
    price: 34.99,
    image:
      "https://images.unsplash.com/photo-1570194065650-d99fb4d8a609?w=500&q=80",
    rating: 4.8,
    category: "beauty",
  },
  {
    id: "10",
    title: "Yoga Mat",
    price: 29.99,
    image:
      "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=500&q=80",
    rating: 4.3,
    category: "sports-outdoors",
  },
  {
    id: "11",
    title: "Classic Novel Collection",
    price: 49.99,
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&q=80",
    rating: 4.7,
    category: "books",
  },
  {
    id: "12",
    title: "Educational Building Blocks",
    price: 24.99,
    image:
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=500&q=80",
    rating: 4.5,
    category: "toys-games",
  },
  {
    id: "13",
    title: "Silver Pendant Necklace",
    price: 79.99,
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&q=80",
    rating: 4.6,
    category: "jewelry",
  },
];

// Map of category slugs to display names
const categoryDisplayNames: Record<string, string> = {
  electronics: "Electronics",
  clothing: "Clothing",
  "home-kitchen": "Home & Kitchen",
  beauty: "Beauty",
  "sports-outdoors": "Sports & Outdoors",
  books: "Books",
  "toys-games": "Toys & Games",
  jewelry: "Jewelry",
  accessories: "Accessories",
};

export default function CategoryPage() {
  const params = useParams();
  const categorySlug = params.category as string;

  // Get the display name for the category
  const categoryName =
    categoryDisplayNames[categorySlug] ||
    categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1);

  // Filter products by category
  const categoryProducts = allProducts.filter(
    (product) => product.category === categorySlug,
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-8">
        <div className="flex items-center gap-2 mb-6">
          <Link href="/categories">
            <Button variant="ghost" size="sm">
              ← All Categories
            </Button>
          </Link>
          <span className="text-muted-foreground">/</span>
          <h1 className="text-2xl font-bold">{categoryName}</h1>
        </div>

        {categoryProducts.length > 0 ? (
          <ProductGrid
            products={categoryProducts}
            title={`${categoryName} Products`}
            showFilters={true}
          />
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              No products found in this category.
            </p>
            <Link href="/categories">
              <Button>Browse All Categories</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
