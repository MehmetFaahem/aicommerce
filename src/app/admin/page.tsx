"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Package,
  Users,
  DollarSign,
  BarChart3,
  Search,
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("products");

  // Mock products data
  const products = [
    {
      id: "1",
      name: "Premium Wireless Headphones",
      price: 129.99,
      category: "Electronics",
      stock: 45,
      status: "Active",
    },
    {
      id: "2",
      name: "Organic Cotton T-Shirt",
      price: 29.99,
      category: "Clothing",
      stock: 120,
      status: "Active",
    },
    {
      id: "3",
      name: "Smart Home Speaker",
      price: 89.99,
      category: "Electronics",
      stock: 30,
      status: "Active",
    },
    {
      id: "4",
      name: "Stainless Steel Water Bottle",
      price: 24.99,
      category: "Home & Kitchen",
      stock: 75,
      status: "Active",
    },
    {
      id: "5",
      name: "Wireless Charging Pad",
      price: 39.99,
      category: "Electronics",
      stock: 60,
      status: "Low Stock",
    },
  ];

  // Mock orders data
  const orders = [
    {
      id: "ORD-001",
      customer: "John Doe",
      date: "2023-05-15",
      total: 154.98,
      status: "Delivered",
    },
    {
      id: "ORD-002",
      customer: "Jane Smith",
      date: "2023-05-14",
      total: 89.99,
      status: "Processing",
    },
    {
      id: "ORD-003",
      customer: "Robert Johnson",
      date: "2023-05-13",
      total: 214.97,
      status: "Shipped",
    },
    {
      id: "ORD-004",
      customer: "Emily Davis",
      date: "2023-05-12",
      total: 54.99,
      status: "Delivered",
    },
    {
      id: "ORD-005",
      customer: "Michael Wilson",
      date: "2023-05-11",
      total: 129.99,
      status: "Cancelled",
    },
  ];

  // Mock customers data
  const customers = [
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      orders: 5,
      spent: 432.95,
      joined: "2023-01-15",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      orders: 3,
      spent: 189.97,
      joined: "2023-02-20",
    },
    {
      id: "3",
      name: "Robert Johnson",
      email: "robert.johnson@example.com",
      orders: 8,
      spent: 756.43,
      joined: "2022-11-05",
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily.davis@example.com",
      orders: 2,
      spent: 104.98,
      joined: "2023-03-10",
    },
    {
      id: "5",
      name: "Michael Wilson",
      email: "michael.wilson@example.com",
      orders: 4,
      spent: 329.96,
      joined: "2023-01-28",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden md:flex w-64 flex-col fixed inset-y-0 border-r bg-card z-30">
          <div className="flex h-14 items-center border-b px-4">
            <h2 className="text-lg font-semibold">Admin Dashboard</h2>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            <Button
              variant={activeTab === "dashboard" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("dashboard")}
            >
              <BarChart3 className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
            <Button
              variant={activeTab === "products" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("products")}
            >
              <Package className="mr-2 h-4 w-4" />
              Products
            </Button>
            <Button
              variant={activeTab === "orders" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("orders")}
            >
              <DollarSign className="mr-2 h-4 w-4" />
              Orders
            </Button>
            <Button
              variant={activeTab === "customers" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("customers")}
            >
              <Users className="mr-2 h-4 w-4" />
              Customers
            </Button>
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1 md:ml-64">
          <div className="p-6">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="space-y-6"
            >
              <TabsList className="md:hidden grid w-full grid-cols-4">
                <TabsTrigger value="dashboard">
                  <BarChart3 className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger value="products">
                  <Package className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger value="orders">
                  <DollarSign className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger value="customers">
                  <Users className="h-4 w-4" />
                </TabsTrigger>
              </TabsList>

              {/* Dashboard Tab */}
              <TabsContent value="dashboard" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold">Dashboard</h1>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Total Revenue
                      </CardTitle>
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">$45,231.89</div>
                      <p className="text-xs text-muted-foreground">
                        +20.1% from last month
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Orders
                      </CardTitle>
                      <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">+573</div>
                      <p className="text-xs text-muted-foreground">
                        +12.4% from last month
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Customers
                      </CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">+2,350</div>
                      <p className="text-xs text-muted-foreground">
                        +18.7% from last month
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Active Products
                      </CardTitle>
                      <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">+198</div>
                      <p className="text-xs text-muted-foreground">
                        +4.3% from last month
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  <Card className="col-span-4">
                    <CardHeader>
                      <CardTitle>Recent Sales</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {orders.slice(0, 5).map((order) => (
                          <div key={order.id} className="flex items-center">
                            <div className="space-y-1">
                              <p className="text-sm font-medium leading-none">
                                {order.customer}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {order.date}
                              </p>
                            </div>
                            <div className="ml-auto font-medium">
                              ${order.total.toFixed(2)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="col-span-3">
                    <CardHeader>
                      <CardTitle>Inventory Status</CardTitle>
                      <CardDescription>
                        Top 5 products by inventory level
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {products.slice(0, 5).map((product) => (
                          <div key={product.id} className="flex items-center">
                            <div className="space-y-1">
                              <p className="text-sm font-medium leading-none">
                                {product.name}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {product.category}
                              </p>
                            </div>
                            <div className="ml-auto font-medium">
                              {product.stock} units
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Products Tab */}
              <TabsContent value="products" className="space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <h1 className="text-2xl font-bold">Products</h1>
                  <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <div className="relative w-full sm:w-64">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search products..."
                        className="pl-10"
                      />
                    </div>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" /> Add Product
                    </Button>
                  </div>
                </div>

                <Card>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Stock</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {products.map((product) => (
                          <TableRow key={product.id}>
                            <TableCell className="font-medium">
                              {product.name}
                            </TableCell>
                            <TableCell>{product.category}</TableCell>
                            <TableCell>${product.price.toFixed(2)}</TableCell>
                            <TableCell>{product.stock}</TableCell>
                            <TableCell>
                              <span
                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${product.status === "Active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
                              >
                                {product.status}
                              </span>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="ghost" size="icon">
                                  <Pencil className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Add New Product</CardTitle>
                    <CardDescription>
                      Fill in the details to add a new product
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Product Name</Label>
                          <Input
                            id="name"
                            placeholder="Premium Wireless Headphones"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="category">Category</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="electronics">
                                Electronics
                              </SelectItem>
                              <SelectItem value="clothing">Clothing</SelectItem>
                              <SelectItem value="home-kitchen">
                                Home & Kitchen
                              </SelectItem>
                              <SelectItem value="beauty">Beauty</SelectItem>
                              <SelectItem value="accessories">
                                Accessories
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="price">Price ($)</Label>
                          <Input id="price" type="number" placeholder="99.99" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="stock">Stock Quantity</Label>
                          <Input id="stock" type="number" placeholder="100" />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            placeholder="Product description..."
                            rows={4}
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="image">Image URL</Label>
                          <Input
                            id="image"
                            placeholder="https://example.com/image.jpg"
                          />
                        </div>
                      </div>
                      <Button type="submit" className="w-full md:w-auto">
                        Add Product
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Orders Tab */}
              <TabsContent value="orders" className="space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <h1 className="text-2xl font-bold">Orders</h1>
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search orders..." className="pl-10" />
                  </div>
                </div>

                <Card>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Order ID</TableHead>
                          <TableHead>Customer</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Total</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {orders.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell className="font-medium">
                              {order.id}
                            </TableCell>
                            <TableCell>{order.customer}</TableCell>
                            <TableCell>{order.date}</TableCell>
                            <TableCell>${order.total.toFixed(2)}</TableCell>
                            <TableCell>
                              <span
                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${order.status === "Delivered" ? "bg-green-100 text-green-800" : order.status === "Cancelled" ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"}`}
                              >
                                {order.status}
                              </span>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm">
                                View Details
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Customers Tab */}
              <TabsContent value="customers" className="space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <h1 className="text-2xl font-bold">Customers</h1>
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search customers..."
                      className="pl-10"
                    />
                  </div>
                </div>

                <Card>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Orders</TableHead>
                          <TableHead>Total Spent</TableHead>
                          <TableHead>Joined</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {customers.map((customer) => (
                          <TableRow key={customer.id}>
                            <TableCell className="font-medium">
                              {customer.name}
                            </TableCell>
                            <TableCell>{customer.email}</TableCell>
                            <TableCell>{customer.orders}</TableCell>
                            <TableCell>${customer.spent.toFixed(2)}</TableCell>
                            <TableCell>{customer.joined}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm">
                                View Details
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
