import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RotateCcw, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const LandscapePrompt = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!isMobile || isDismissed) return;

    const checkOrientation = () => {
      const isLandscape = window.innerWidth > window.innerHeight;
      setIsVisible(isMobile && !isLandscape);
    };

    // Check initial orientation
    checkOrientation();

    // Listen for orientation changes
    window.addEventListener("orientationchange", checkOrientation);
    window.addEventListener("resize", checkOrientation);

    return () => {
      window.removeEventListener("orientationchange", checkOrientation);
      window.removeEventListener("resize", checkOrientation);
    };
  }, [isMobile, isDismissed]);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };

  if (!isVisible || !isMobile) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <Card className="w-full max-w-sm p-6 bg-white/95 backdrop-blur-md border-2 border-[#2a3f6e]/20 shadow-2xl">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#fe6b35]/10 rounded-xl">
              <RotateCcw className="h-6 w-6 text-[#fe6b35]" />
            </div>
            <div>
              <h3 className="font-bold text-[#2a3f6e] text-lg">Landscape View</h3>
              <p className="text-[#2a3f6e]/70 text-sm">For better experience</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDismiss}
            className="h-9 w-9 p-0 text-[#2a3f6e]/60 hover:text-[#2a3f6e] hover:bg-[#2a3f6e]/10 rounded-full"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <p className="text-[#2a3f6e]/80 text-sm mb-6 leading-relaxed">
          Rotate your device to landscape mode to see the full roofing visualizer with all options clearly displayed.
        </p>

        <Button
          onClick={handleDismiss}
          className="w-full bg-[#2a3f6e] hover:bg-[#2a3f6e]/90 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
        >
          Continue in Portrait
        </Button>
      </Card>
    </div>
  );
};

export default LandscapePrompt;