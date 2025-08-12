// src/Components/Order.tsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Package, ShoppingBag } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

import { fetchOrders } from "../Redux/Slice/Order/GetOrderslice";
import { RootState, AppDispatch } from "../Redux/Store"; // Make sure to import the RootState type

export default function OrderSuccessPage() {
  const [copied, setCopied] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const { orders, isLoading, isError, errorMsg } = useSelector(
    (state: RootState) => state.GetOrderslice
  );
  console.log( orders);

  useEffect(() => {
    console.log('Fetching orders...');
    dispatch(fetchOrders());
  }, [dispatch]);

  const orderNumber = "ORD-24601-XYZ";
  const orderDate = "April 21, 2025";
  const estimatedDelivery = "April 25-27, 2025";

  const copyOrderNumber = () => {
    navigator.clipboard.writeText(orderNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

//   const subtotal = orders.items.map((sum, item) => sum + item.totalAmount, 0);  // Calculate total amount correctly
//   console.log("Subtotal:", subtotal);

//   const shippingCost = 2.99;
//   const tax = subtotal * 0.1;
//   const shipping = 4.99;
//   const totalPrice = subtotal + tax + shipping;

//   if (isLoading) return <div>Loading...</div>;
//   if (isError) return <div>Error: {errorMsg}</div>;

  return (
    <div className="container max-w-4xl py-10 px-4 md:py-32">
      <div className="flex flex-col items-center text-center mb-10">
        <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Order Successful!</h1>
        <p className="text-muted-foreground max-w-md">
          Thank you for your purchase. We've received your order and are processing it now.
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader></CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
              <Package className="h-8 w-8 text-muted-foreground" />
              <div>
                <h3 className="font-medium">Estimated Delivery</h3>
                <p className="text-sm text-muted-foreground">{estimatedDelivery}</p>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="font-medium">Order Summary</h3>
              <div>
                <h4 className="font-medium">Items:</h4>
                {/* {orders.map((order) => (
                  <div key={order.id}>
                    <div>{order.customerName}</div>
                    <div>{order.totalAmount}</div>
                  </div>
                ))} */}
              </div>
            </div>

            <Separator />

            {/* <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div> */}
          </div>
        </CardContent>
      </Card>

      <Accordion type="single" collapsible className="mb-8">
        <AccordionItem value="faq-1">
          <AccordionTrigger>What happens next?</AccordionTrigger>
          <AccordionContent>
            <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
              <li>We're processing your order and will send a confirmation email shortly.</li>
              <li>Once your order ships, you'll receive tracking information via email.</li>
              <li>You can check your order status anytime in your account dashboard.</li>
            </ol>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild className="gap-2 border flex bg-gray-800 text-white hover:bg-green-100 hover:text-black">
          <Link to="/products">
            <ShoppingBag className="h-4 w-4" />
            Continue Shopping
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
