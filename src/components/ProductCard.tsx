"use client";

import React from "react";
import { useDispatch } from "react-redux";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { addItem } from "@/store/cartSlice";

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  image: string;
  rating: number;
  discount?: number;
  isNew?: boolean;
  onAddToCart?: (id: string) => void;
  onQuickView?: (id: string) => void;
}

const ProductCard = ({
  id = "1",
  title = "Premium Wireless Headphones",
  price = 129.99,
  image = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
  rating = 4.5,
  discount,
  isNew = false,
  onAddToCart = () => {},
  onQuickView = () => {},
}: ProductCardProps) => {
  const dispatch = useDispatch();

  const handleAddToCart = (productId: string) => {
    dispatch(addItem({ id: productId, name: title, price, image }));
    onAddToCart(productId);
  };
  return (
    <Card className="group relative overflow-hidden rounded-lg border bg-white transition-all hover:shadow-md">
      {/* Discount badge */}
      {discount && (
        <Badge className="absolute left-3 top-3 z-10 bg-red-500 text-white">
          {discount}% OFF
        </Badge>
      )}

      {/* New badge */}
      {isNew && (
        <Badge className="absolute right-3 top-3 z-10 bg-green-500 text-white">
          NEW
        </Badge>
      )}

      {/* Product image with hover overlay */}
      <div className="relative aspect-square overflow-hidden">
        <Link href={`/product/${id}`}>
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Quick actions overlay */}
        <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
          <Button
            size="sm"
            variant="secondary"
            className="rounded-full"
            onClick={() => onQuickView(id)}
          >
            <Eye className="h-4 w-4" />
            <span className="sr-only">Quick view</span>
          </Button>
          <Button
            size="sm"
            className="rounded-full"
            onClick={() => handleAddToCart(id)}
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="sr-only">Add to cart</span>
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        <Link href={`/product/${id}`} className="block">
          <h3 className="mb-1 line-clamp-2 text-sm font-medium text-gray-900 hover:text-primary">
            {title}
          </h3>
        </Link>

        {/* Rating */}
        <div className="mb-2 flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-3.5 w-3.5 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
            />
          ))}
          <span className="ml-1 text-xs text-gray-500">{rating}</span>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t p-4 pt-2">
        <div className="flex items-baseline gap-2">
          <span className="text-base font-bold text-gray-900">
            ${price.toFixed(2)}
          </span>
          {discount && (
            <span className="text-xs text-gray-500 line-through">
              ${(price / (1 - discount / 100)).toFixed(2)}
            </span>
          )}
        </div>
        <Button
          size="sm"
          variant="outline"
          className="h-8 rounded-full px-3 text-xs"
          onClick={() => handleAddToCart(id)}
        >
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
