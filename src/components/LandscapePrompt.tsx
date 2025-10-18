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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <Card className="w-full max-w-sm p-6 bg-card/95 backdrop-blur-md border-2">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-full">
              <RotateCcw className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Landscape View</h3>
              <p className="text-sm text-muted-foreground">For better experience</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDismiss}
            className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <p className="text-sm text-muted-foreground mb-4">
          Rotate your device to landscape mode to see the full roofing visualizer with all options clearly displayed.
        </p>

        <Button
          onClick={handleDismiss}
          className="w-full"
        >
          Continue in Portrait
        </Button>
      </Card>
    </div>
  );
};

export default LandscapePrompt;