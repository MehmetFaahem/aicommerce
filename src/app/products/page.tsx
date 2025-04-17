"use client";

import React from "react";
import ProductGrid from "@/components/ProductGrid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold">All Products</h1>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search products..." className="pl-10" />
          </div>
        </div>
        <ProductGrid showFilters={true} />
      </div>
    </div>
  );
}
