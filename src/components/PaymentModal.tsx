import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Check, CreditCard, Download, Code, Zap, Shield, Star } from 'lucide-react';
import { PaymentService } from '@/services/paymentService';
import { useAuth } from '@/hooks/useAuth';

interface PaymentModalProps {
  onClose?: () => void;
}

export function PaymentModal({ onClose }: PaymentModalProps) {
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    if (!user) {
      alert('Please sign in to make a payment');
      return;
    }

    setIsProcessing(true);
    try {
      await PaymentService.initiatePayment(user.id);
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const features = [
    {
      icon: <Download className="w-5 h-5" />,
      title: "Download Complete Code",
      description: "Get HTML, CSS, and JavaScript files"
    },
    {
      icon: <Code className="w-5 h-5" />,
      title: "Clean, Production-Ready Code",
      description: "Well-structured, optimized code"
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "No Watermarks",
      description: "Your website, completely yours"
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Commercial License",
      description: "Use for personal or commercial projects"
    },
    {
      icon: <Star className="w-5 h-5" />,
      title: "Lifetime Access",
      description: "One-time payment, lifetime access"
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <CreditCard className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl">Unlock Your Website Code</CardTitle>
          <p className="text-muted-foreground mt-2">
            Get complete access to download and use your website code
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Pricing */}
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <span className="text-4xl font-bold">₹99</span>
              <Badge variant="secondary" className="text-sm">
                One-time payment
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              No recurring charges • Lifetime access
            </p>
          </div>

          <Separator />

          {/* Features */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">What you get:</h3>
            <div className="grid gap-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      {feature.icon}
                      <h4 className="font-medium">{feature.title}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Payment Button */}
          <div className="space-y-4">
            <Button 
              onClick={handlePayment}
              disabled={isProcessing || !user}
              className="w-full h-12 text-lg"
              size="lg"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="w-5 h-5 mr-2" />
                  Pay ₹99 to Unlock Code
                </>
              )}
            </Button>
            
            {!user && (
              <p className="text-sm text-center text-muted-foreground">
                Please sign in to make a payment
              </p>
            )}
            
            <p className="text-xs text-center text-muted-foreground">
              Secure payment powered by RazorPay • 30-day money-back guarantee
            </p>
          </div>

          {/* Close Button */}
          {onClose && (
            <div className="text-center">
              <Button variant="ghost" onClick={onClose}>
                Maybe Later
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
