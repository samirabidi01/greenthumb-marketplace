import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle, Loader2, Package } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";

const CheckoutSuccess = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<"verifying" | "paid" | "error">("verifying");
  const { clearCart } = useCart();
  const orderId = searchParams.get("order_id");
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    const verify = async () => {
      if (!sessionId || !orderId) {
        setStatus("error");
        return;
      }

      try {
        const { data, error } = await supabase.functions.invoke("verify-payment", {
          body: { session_id: sessionId, order_id: orderId },
        });

        if (error) throw error;
        if (data?.status === "paid") {
          setStatus("paid");
          clearCart();
        } else {
          setStatus("error");
        }
      } catch {
        setStatus("error");
      }
    };

    verify();
  }, [sessionId, orderId]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md text-center"
      >
        {status === "verifying" && (
          <>
            <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
            <h2 className="mt-4 font-display text-2xl text-foreground">Verifying payment...</h2>
            <p className="mt-2 text-muted-foreground">Please wait while we confirm your order.</p>
          </>
        )}

        {status === "paid" && (
          <>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle className="h-10 w-10 text-primary" />
            </div>
            <h2 className="mt-4 font-display text-3xl text-foreground">Order Confirmed! 🌿</h2>
            <p className="mt-2 text-muted-foreground">
              Thank you for your purchase. Your plants are on their way!
            </p>
            {orderId && (
              <p className="mt-2 text-xs text-muted-foreground">
                Order ID: <span className="font-mono">{orderId.slice(0, 8)}...</span>
              </p>
            )}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground"
              >
                <Package className="h-4 w-4" />
                Continue Shopping
              </Link>
            </div>
          </>
        )}

        {status === "error" && (
          <>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
              <span className="text-3xl">⚠️</span>
            </div>
            <h2 className="mt-4 font-display text-2xl text-foreground">Something went wrong</h2>
            <p className="mt-2 text-muted-foreground">
              We couldn't verify your payment. If you were charged, please contact support.
            </p>
            <Link
              to="/cart"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground"
            >
              Back to Cart
            </Link>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default CheckoutSuccess;
