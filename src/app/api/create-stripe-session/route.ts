import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
    apiVersion: "2023-10-16",
  });

  try {
    const { items, success_url, cancel_url } = await request.json();

    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items.map((item: any) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            images: [item.image],
          },
          unit_amount: Math.round(item.price * 100), // Convert to cents
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url:
        success_url ||
        `${request.headers.get("origin")}/checkout?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:
        cancel_url || `${request.headers.get("origin")}/checkout?canceled=true`,
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error: any) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: { message: error.message } },
      { status: 500 },
    );
  }
}
