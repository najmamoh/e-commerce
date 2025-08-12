import { ChevronRight, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCart } from "@/Redux/Slice/cartt/creatCartslice";
import { AppDispatch } from "../Redux/Store";
import {Link} from "react-router-dom"
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CartItem {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  price: number;
  product: {
    name: string;
    image: string;
    doc: string;
  };
}

export default function ShoppingCart() {
  const dispatch = useDispatch<AppDispatch>();
  const { cartItems = [], isLoading, isError } = useSelector(
    (state: any) => state.cart
  );

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const totalPrice = cartItems.reduce(
    (acc: number, item: CartItem) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-white mt-40">
      <div className="container mx-auto p-4 md:p-6 lg:p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="md:col-span-2 space-y-4">
            <Card className="bg-gray-50 border-gray-200">
              <CardContent className="p-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <rect width="16" height="13" x="4" y="5" rx="2" />
                    <path d="M16 2v6M8 2v6M4 11h16" />
                  </svg>
                  <span className="font-medium">Shipping fee</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>
                    Buy <strong>$9.90</strong> more to enjoy{" "}
                    <strong>FREE STANDARD SHIPPING!</strong>
                  </span>
                  <Button variant="ghost" size="sm" className="text-black">
                    Add <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="bg-white border rounded-md p-4">
              <div className="flex items-center gap-2 mb-4">
                <Checkbox id="all-items" />
                <label htmlFor="all-items" className="font-bold text-lg">
                  ALL ITEMS ({cartItems.length})
                </label>
              </div>

              {cartItems.map((item: CartItem) => (
                <div key={item.id} className="border-t pt-4 space-y-4">
                  <div className="flex items-start gap-4">
                    <Checkbox className="mt-2" />
                    <div className="relative w-28 h-28 bg-gray-100">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover rounded"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white text-xs p-1 text-center">
                        Almost Sold Out
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-semibold">{item.product.doc}</h3>
                      <p className="text-gray-600">{item.product.name}</p>
                      <div className="flex items-center gap-2 text-sm mt-1">
                        <span className="text-red-500 font-bold text-lg">
                          ${item.price}
                        </span>
                        <span className="text-gray-400 line-through text-sm">
                          $17.10
                        </span>
                        <span className="text-red-500 text-sm bg-red-50 px-1 rounded">
                          Estimated -49%
                        </span>
                      </div>

                      <div className="mt-3 flex items-center gap-3">
                        <span className="text-sm">Qty:</span>
                        <Select defaultValue={String(item.quantity)}>
                          <SelectTrigger className="w-16 h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[1, 2, 3, 4, 5].map((value) => (
                              <SelectItem key={value} value={String(value)}>
                                {value}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="md:col-span-1">
            <Card>
              <CardContent className="p-6 space-y-6">
                <h2 className="text-xl font-bold">Order Summary</h2>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Order Total:</span>
                  <span className="text-2xl font-bold">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                <Link to='/Checkout'>
                <Button className="w-full bg-black hover:bg-gray-800 text-white h-12">
                  <span className="text-lg font-bold">Checkout Now</span>
                </Button></Link>
                <p className="text-sm text-gray-600 text-center">
                  Apply a <strong>Coupon Code, SHEIN Points</strong> on the
                  next step.
                </p>
              </CardContent>
            </Card>

            <div className="mt-6 space-y-4">
              <h3 className="font-medium">We Accept</h3>
              <div className="grid grid-cols-4 gap-2">
                {[
                  "visa",
                  "mastercard",
                  "paypal",
                  "amex",
                  "klarna",
                  "applepay",
                  "googlepay",
                  "venmo",
                ].map((method, index) => (
                  <div
                    key={index}
                    className="border rounded-md p-2 flex items-center justify-center h-10"
                  >
                    <img
                      src={`/payments/${method}.png`}
                      alt={method}
                      className="max-h-full"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
