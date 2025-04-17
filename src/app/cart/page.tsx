"use client";

import React from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import {
  selectCartItems,
  selectCartSubtotal,
  updateQuantity,
  removeItem,
} from "@/store/cartSlice";

export default function CartPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotal);
  const shipping = 4.99;
  const tax = subtotal * 0.08; // 8% tax rate
  const total = subtotal + shipping + tax;

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = (id: string) => {
    dispatch(removeItem(id));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center mb-8">
          <Link href="/">
            <Button variant="ghost" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Continue Shopping
            </Button>
          </Link>
          <h1 className="text-3xl font-bold ml-4">Your Cart</h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4 text-center">
            <ShoppingCart className="h-16 w-16 text-muted-foreground" />
            <h2 className="text-2xl font-semibold">Your cart is empty</h2>
            <p className="text-muted-foreground">
              Add items to your cart to see them here.
            </p>
            <Link href="/products">
              <Button>Browse Products</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <div className="flex flex-col sm:flex-row p-4 gap-4">
                    <div className="h-24 w-24 rounded-md overflow-hidden bg-secondary flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{item.name}</h3>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-muted-foreground hover:text-foreground h-5 w-5 flex-shrink-0"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <span className="mt-1 text-sm font-medium">
                        ${item.price.toFixed(2)}
                      </span>
                      <div className="mt-auto flex items-center justify-between pt-4">
                        <div className="flex items-center border rounded-md">
                          <button
                            onClick={() =>
                              handleUpdateQuantity(item.id, item.quantity - 1)
                            }
                            className="h-8 w-8 flex items-center justify-center text-muted-foreground hover:text-foreground"
                            aria-label="Decrease quantity"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-8 text-center text-sm">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleUpdateQuantity(item.id, item.quantity + 1)
                            }
                            className="h-8 w-8 flex items-center justify-center text-muted-foreground hover:text-foreground"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <span className="font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>${shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax (8%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href="/checkout" className="w-full">
                    <Button className="w-full" size="lg">
                      Proceed to Checkout
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
