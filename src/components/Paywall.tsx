import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Lock, CreditCard, Download, Code, Zap, Shield, Star, Check } from 'lucide-react';
import { PaymentModal } from './PaymentModal';
import { useAuth } from '@/hooks/useAuth';

interface PaywallProps {
  onUnlock?: () => void;
}

export function Paywall({ onUnlock }: PaywallProps) {
  const { user } = useAuth();
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const features = [
    {
      icon: <Download className="w-4 h-4" />,
      title: "Download Complete Code",
      description: "HTML, CSS, and JavaScript files"
    },
    {
      icon: <Code className="w-4 h-4" />,
      title: "Clean, Production-Ready Code",
      description: "Well-structured and optimized"
    },
    {
      icon: <Zap className="w-4 h-4" />,
      title: "No Watermarks",
      description: "Your website, completely yours"
    },
    {
      icon: <Shield className="w-4 h-4" />,
      title: "Commercial License",
      description: "Use for any project"
    }
  ];

  const handleUnlock = () => {
    if (!user) {
      alert('Please sign in to access the code');
      return;
    }
    setShowPaymentModal(true);
  };

  return (
    <>
      <div className="flex items-center justify-center h-full bg-gradient-to-br from-gray-50 to-gray-100 p-8">
        <Card className="w-full max-w-lg shadow-xl border-0">
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Lock className="w-8 h-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Unlock Your Website Code</CardTitle>
            <p className="text-muted-foreground mt-2">
              Pay once and get lifetime access to download your website code
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Pricing */}
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <span className="text-3xl font-bold">₹99</span>
                <Badge variant="secondary" className="text-xs">
                  One-time
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                No recurring charges • Lifetime access
              </p>
            </div>

            <Separator />

            {/* Features */}
            <div className="space-y-3">
              <h3 className="font-semibold text-center">What you get:</h3>
              <div className="grid gap-2">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3 p-2 rounded-lg bg-gray-50">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <div className="flex items-center space-x-2">
                      {feature.icon}
                      <div>
                        <h4 className="font-medium text-sm">{feature.title}</h4>
                        <p className="text-xs text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* CTA */}
            <div className="space-y-3">
              <Button 
                onClick={handleUnlock}
                className="w-full h-12 text-lg font-semibold"
                size="lg"
              >
                <CreditCard className="w-5 h-5 mr-2" />
                Pay ₹99 to Unlock Code
              </Button>
              
              {!user && (
                <p className="text-sm text-center text-muted-foreground">
                  Please sign in to make a payment
                </p>
              )}
              
              <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Shield className="w-3 h-3" />
                  <span>Secure</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3" />
                  <span>30-day guarantee</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {showPaymentModal && (
        <PaymentModal onClose={() => setShowPaymentModal(false)} />
      )}
    </>
  );
}
