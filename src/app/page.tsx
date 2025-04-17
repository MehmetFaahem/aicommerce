"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, User } from "lucide-react";
import CartDrawer from "@/components/CartDrawer";
import ProductGrid from "@/components/ProductGrid";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Link href="/" className="text-2xl font-bold">
              ShopAI
            </Link>
          </div>

          <div className="relative w-full max-w-sm px-4">
            <Search className="absolute left-6 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full pl-10 rounded-full bg-muted"
            />
          </div>

          <div className="flex items-center gap-4">
            <Link href="/account">
              <Button variant="ghost" size="icon" aria-label="Account">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <CartDrawer />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Discover Products Tailored Just For You
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Our AI-powered recommendations learn from your preferences to
                show you products you'll love.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/products">
                  <Button size="lg">Shop Now</Button>
                </Link>
                <Link href="/categories">
                  <Button size="lg" variant="outline">
                    Browse Categories
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <Card className="overflow-hidden rounded-xl border-0 shadow-lg">
                <CardContent className="p-0">
                  <img
                    src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80"
                    alt="Shopping Experience"
                    className="aspect-video object-cover w-full h-full"
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="w-full py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Shop by Category
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Explore our wide range of products across different categories
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
            {[
              {
                name: "Electronics",
                image:
                  "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&q=80",
              },
              {
                name: "Clothing",
                image:
                  "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=500&q=80",
              },
              {
                name: "Home & Kitchen",
                image:
                  "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=500&q=80",
              },
              {
                name: "Beauty",
                image:
                  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&q=80",
              },
            ].map((category, index) => (
              <Link
                href={`/categories/${category.name.toLowerCase().replace(" & ", "-")}`}
                key={index}
              >
                <div className="group relative overflow-hidden rounded-lg shadow-md transition-all hover:shadow-xl">
                  <div className="aspect-square w-full overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                    <div className="absolute bottom-0 w-full p-4">
                      <h3 className="text-lg font-medium text-white">
                        {category.name}
                      </h3>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* AI Recommendations */}
      <section className="w-full py-12 md:py-16 lg:py-20 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Recommended For You
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Personalized product suggestions based on your browsing history
            </p>
          </div>

          <Tabs defaultValue="trending" className="mt-8">
            <div className="flex justify-center">
              <TabsList>
                <TabsTrigger value="trending">Trending</TabsTrigger>
                <TabsTrigger value="new-arrivals">New Arrivals</TabsTrigger>
                <TabsTrigger value="for-you">For You</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="trending" className="mt-6">
              <ProductGrid />
            </TabsContent>
            <TabsContent value="new-arrivals" className="mt-6">
              <ProductGrid />
            </TabsContent>
            <TabsContent value="for-you" className="mt-6">
              <ProductGrid />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Newsletter */}
      <section className="w-full py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Stay Updated
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Subscribe to our newsletter for exclusive deals and personalized
              recommendations
            </p>
            <div className="w-full max-w-md space-y-2">
              <form className="flex space-x-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1"
                  required
                />
                <Button type="submit">Subscribe</Button>
              </form>
              <p className="text-xs text-muted-foreground">
                By subscribing, you agree to our Terms of Service and Privacy
                Policy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t bg-background py-6 md:py-8">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Shop</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/products"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    All Products
                  </Link>
                </li>
                <li>
                  <Link
                    href="/new-arrivals"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    New Arrivals
                  </Link>
                </li>
                <li>
                  <Link
                    href="/best-sellers"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Best Sellers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/deals"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Deals & Promotions
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Account</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/account"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    My Account
                  </Link>
                </li>
                <li>
                  <Link
                    href="/orders"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Order History
                  </Link>
                </li>
                <li>
                  <Link
                    href="/wishlist"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Wishlist
                  </Link>
                </li>
                <li>
                  <Link
                    href="/returns"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Returns
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Support</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/contact"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shipping"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Shipping Information
                  </Link>
                </li>
                <li>
                  <Link
                    href="/returns-policy"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Returns Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/about"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careers"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © 2023 ShopAI. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
