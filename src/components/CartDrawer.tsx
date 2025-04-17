"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { X, ShoppingCart, Trash2, Plus, Minus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import {
  selectCartItems,
  selectCartSubtotal,
  selectCartTax,
  selectCartTotal,
  selectCartIsOpen,
  updateQuantity,
  removeItem,
  setIsOpen,
} from "@/store/cartSlice";

interface CartDrawerProps {
  onCheckout?: () => void;
}

export default function CartDrawer({
  onCheckout = () => (window.location.href = "/checkout"),
}: CartDrawerProps) {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const open = useSelector(selectCartIsOpen);
  const subtotal = useSelector(selectCartSubtotal);
  const tax = useSelector(selectCartTax);
  const total = useSelector(selectCartTotal);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleCheckout = () => {
    dispatch(setIsOpen(false));
    onCheckout();
  };

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };

  const handleRemoveItem = (id: string) => {
    dispatch(removeItem(id));
  };

  return (
    <Sheet open={open} onOpenChange={(value) => dispatch(setIsOpen(value))}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {items.length > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
              {items.reduce((total, item) => total + item.quantity, 0)}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md bg-background">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle className="text-xl font-semibold">Your Cart</SheetTitle>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search items..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </SheetHeader>

        {filteredItems.length === 0 ? (
          <div className="flex h-[50vh] flex-col items-center justify-center space-y-3">
            <ShoppingCart className="h-12 w-12 text-muted-foreground" />
            <div className="text-center">
              <h3 className="text-lg font-medium">
                {searchQuery ? "No matching items found" : "Your cart is empty"}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {searchQuery
                  ? "Try a different search term"
                  : "Add items to your cart to see them here."}
              </p>
            </div>
            <SheetClose asChild>
              <Button className="mt-4">Continue Shopping</Button>
            </SheetClose>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-5 overflow-y-auto pr-2 my-6 max-h-[65vh]">
              {filteredItems.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="h-24 w-24 rounded-md overflow-hidden bg-secondary flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between">
                      <h4 className="font-medium line-clamp-2">{item.name}</h4>
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
                    <div className="mt-auto flex items-center justify-between">
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
              ))}
            </div>

            <div className="space-y-4 mt-auto">
              <Separator />
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <SheetFooter className="flex-col gap-2 sm:flex-col">
                <Button onClick={handleCheckout} className="w-full" size="lg">
                  Checkout
                </Button>
                <SheetClose asChild>
                  <Button variant="outline" className="w-full" size="lg">
                    Continue Shopping
                  </Button>
                </SheetClose>
              </SheetFooter>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
