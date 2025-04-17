"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  CreditCard,
  Package,
  Truck,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CheckoutPage() {
  // Check if the URL has success or canceled query parameters
  const searchParams =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search)
      : new URLSearchParams();
  const isSuccess = searchParams.get("success") === "true";
  const isCanceled = searchParams.get("canceled") === "true";
  const router = useRouter();
  const [step, setStep] = useState("shipping");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(isSuccess || false);

  // Mock cart data
  const cartItems = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 129.99,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80",
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 89.99,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80",
    },
  ];

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const shipping = 4.99;
  const tax = subtotal * 0.07;
  const total = subtotal + shipping + tax;

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("payment");
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Create a Stripe checkout session
      const response = await fetch("/api/create-stripe-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cartItems,
          success_url: `${window.location.origin}/checkout?success=true`,
          cancel_url: `${window.location.origin}/checkout?canceled=true`,
        }),
      });

      const { url } = await response.json();

      // Redirect to Stripe Checkout
      if (url) {
        window.location.href = url;
      } else {
        throw new Error("Failed to create checkout session");
      }
    } catch (error) {
      console.error("Error:", error);
      setIsProcessing(false);
      // Handle error (show error message to user)
    }
  };

  const handleBackToShopping = () => {
    router.push("/");
  };

  return (
    <div className="container mx-auto py-10 px-4 md:px-6 bg-background">
      {!isComplete ? (
        <div className="flex flex-col space-y-8">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackToShopping}
              className="flex items-center gap-1"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to shopping
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Checkout</CardTitle>
                  <CardDescription>
                    Complete your purchase securely
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs value={step} className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger
                        value="shipping"
                        onClick={() => setStep("shipping")}
                        disabled={isProcessing}
                        className="flex items-center gap-2"
                      >
                        <Truck className="h-4 w-4" />
                        Shipping
                      </TabsTrigger>
                      <TabsTrigger
                        value="payment"
                        onClick={() => setStep("payment")}
                        disabled={step === "shipping" || isProcessing}
                        className="flex items-center gap-2"
                      >
                        <CreditCard className="h-4 w-4" />
                        Payment
                      </TabsTrigger>
                      <TabsTrigger
                        value="confirmation"
                        disabled
                        className="flex items-center gap-2"
                      >
                        <CheckCircle className="h-4 w-4" />
                        Confirmation
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="shipping" className="pt-6">
                      <form
                        onSubmit={handleShippingSubmit}
                        className="space-y-6"
                      >
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">
                            Shipping Information
                          </h3>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="firstName">First Name</Label>
                              <Input
                                id="firstName"
                                placeholder="John"
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="lastName">Last Name</Label>
                              <Input id="lastName" placeholder="Doe" required />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="john.doe@example.com"
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="address">Street Address</Label>
                            <Input
                              id="address"
                              placeholder="123 Main St"
                              required
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="city">City</Label>
                              <Input
                                id="city"
                                placeholder="San Francisco"
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="state">State</Label>
                              <Input id="state" placeholder="CA" required />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="zip">ZIP Code</Label>
                              <Input id="zip" placeholder="94103" required />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                              id="phone"
                              placeholder="(555) 123-4567"
                              required
                            />
                          </div>
                        </div>

                        <Button type="submit" className="w-full">
                          Continue to Payment
                        </Button>
                      </form>
                    </TabsContent>

                    <TabsContent value="payment" className="pt-6">
                      <form
                        onSubmit={handlePaymentSubmit}
                        className="space-y-6"
                      >
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">
                            Payment Information
                          </h3>

                          <div className="space-y-2">
                            <Label htmlFor="cardName">Name on Card</Label>
                            <Input
                              id="cardName"
                              placeholder="John Doe"
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="cardNumber">Card Number</Label>
                            <Input
                              id="cardNumber"
                              placeholder="4242 4242 4242 4242"
                              required
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="expiry">Expiry Date</Label>
                              <Input id="expiry" placeholder="MM/YY" required />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="cvc">CVC</Label>
                              <Input id="cvc" placeholder="123" required />
                            </div>
                          </div>
                        </div>

                        <Button
                          type="submit"
                          className="w-full"
                          disabled={isProcessing}
                        >
                          {isProcessing ? "Processing..." : "Complete Order"}
                        </Button>
                      </form>
                    </TabsContent>

                    <TabsContent value="confirmation">
                      <div className="flex flex-col items-center justify-center py-12 space-y-4 text-center">
                        <CheckCircle className="h-16 w-16 text-green-500" />
                        <h3 className="text-2xl font-bold">Order Confirmed!</h3>
                        <p className="text-muted-foreground">
                          Thank you for your purchase. Your order has been
                          received.
                        </p>
                        <p className="font-medium">Order #12345</p>
                        <p className="text-sm text-muted-foreground">
                          A confirmation email has been sent to your email
                          address.
                        </p>
                        <Button onClick={handleBackToShopping} className="mt-4">
                          Continue Shopping
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center space-x-4"
                      >
                        <div className="h-16 w-16 rounded-md overflow-hidden bg-secondary flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <div className="font-medium">
                          ${item.price.toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Shipping</span>
                      <span>${shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Package className="h-4 w-4" />
                    <span>Free shipping on orders over $100</span>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-lg mx-auto">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12 space-y-4 text-center">
              <CheckCircle className="h-16 w-16 text-green-500" />
              <h3 className="text-2xl font-bold">Order Confirmed!</h3>
              <p className="text-muted-foreground">
                Thank you for your purchase. Your order has been received.
              </p>
              <p className="font-medium">Order #12345</p>
              <p className="text-sm text-muted-foreground">
                A confirmation email has been sent to your email address.
              </p>
              <Button onClick={handleBackToShopping} className="mt-4">
                Continue Shopping
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
