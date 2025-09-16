import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { usePayment } from '@/hooks/usePayment';
import { useToast } from '@/hooks/use-toast';
import { CreditCard, Loader2, CheckCircle } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: () => void;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export function PaymentModal({ isOpen, onClose, onPaymentSuccess }: PaymentModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const { createPaymentOrder, refreshPaymentStatus } = usePayment();
  const { toast } = useToast();

  const handlePayment = async () => {
    try {
      setIsProcessing(true);

      // Create Razorpay order
      console.log('Creating payment order...');
      const orderData = await createPaymentOrder();
      console.log('Order created:', orderData);

      // Load Razorpay script if not already loaded
      if (!window.Razorpay) {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
        
        await new Promise((resolve) => {
          script.onload = resolve;
        });
      }

      // Create Razorpay options
      const options = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'HTML Creator App',
        description: 'Code Generation Access - ₹99',
        order_id: orderData.order_id,
        handler: async (response: any) => {
          try {
            // Payment successful - refresh payment status
            await refreshPaymentStatus();
            
            toast({
              title: "Payment Successful!",
              description: "You now have access to code generation for 24 hours.",
            });
            
            onPaymentSuccess();
            onClose();
          } catch (error) {
            console.error('Error handling payment success:', error);
            toast({
              title: "Error",
              description: "Payment was successful but there was an error processing it. Please refresh the page.",
              variant: "destructive",
            });
          }
        },
        prefill: {
          name: 'User',
          email: 'user@example.com',
        },
        theme: {
          color: '#3b82f6',
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
          },
        },
      };

      // Open Razorpay checkout
      console.log('Opening Razorpay checkout with options:', options);
      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Failed",
        description: error instanceof Error ? error.message : "Failed to initiate payment",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Payment Required
          </DialogTitle>
          <DialogDescription>
            Access to code generation requires a one-time payment of ₹99
          </DialogDescription>
        </DialogHeader>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Code Generation Access</CardTitle>
            <CardDescription>
              Get 24-hour access to download your website's HTML, CSS, and JavaScript code
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Access Duration:</span>
              <span className="font-medium">24 hours</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Price:</span>
              <span className="text-2xl font-bold">₹99</span>
            </div>
            
            <div className="pt-4">
              <Button 
                onClick={handlePayment} 
                disabled={isProcessing}
                className="w-full"
                size="lg"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4 mr-2" />
                    Pay ₹99
                  </>
                )}
              </Button>
            </div>

            <div className="text-xs text-muted-foreground text-center">
              Secure payment powered by Razorpay
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
