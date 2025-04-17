"use client";

import React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

interface Category {
  name: string;
  image: string;
  description: string;
}

export default function CategoriesPage() {
  // This would ideally come from an API or database
  const categories: Category[] = [
    {
      name: "Electronics",
      image:
        "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&q=80",
      description:
        "The latest gadgets and tech innovations for your everyday needs.",
    },
    {
      name: "Clothing",
      image:
        "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=500&q=80",
      description:
        "Stylish apparel for all occasions, from casual to formal wear.",
    },
    {
      name: "Home & Kitchen",
      image:
        "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=500&q=80",
      description:
        "Everything you need to make your house a home, from appliances to decor.",
    },
    {
      name: "Beauty",
      image:
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&q=80",
      description:
        "Premium skincare, makeup, and personal care products for your beauty routine.",
    },
    {
      name: "Sports & Outdoors",
      image:
        "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=500&q=80",
      description:
        "Equipment and gear for all your athletic and outdoor adventures.",
    },
    {
      name: "Books",
      image:
        "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=500&q=80",
      description: "Bestsellers, classics, and niche titles across all genres.",
    },
    {
      name: "Toys & Games",
      image:
        "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=500&q=80",
      description: "Fun and educational toys for children of all ages.",
    },
    {
      name: "Jewelry",
      image:
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&q=80",
      description:
        "Elegant jewelry pieces from everyday wear to special occasions.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-12 md:py-16 lg:py-20">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Shop by Category
          </h1>
          <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Explore our wide range of products across different categories
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link
              href={`/categories/${category.name.toLowerCase().replace(" & ", "-")}`}
              key={index}
              className="group h-full"
            >
              <Card className="overflow-hidden h-full transition-all hover:shadow-lg">
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg font-medium mb-2">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {category.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
