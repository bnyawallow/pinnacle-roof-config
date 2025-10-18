import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RotateCcw, X, Smartphone, ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

// Screen Orientation API types
interface ScreenOrientation {
  lock?(orientation: string): Promise<void>;
}

interface ExtendedScreen extends Screen {
  orientation?: ScreenOrientation;
}

const LandscapePrompt = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isLocking, setIsLocking] = useState(false);
  const [supportsOrientationLock, setSupportsOrientationLock] = useState<boolean | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!isMobile || isDismissed) return;

    const checkOrientation = () => {
      const isLandscape = window.innerWidth > window.innerHeight;
      setIsVisible(isMobile && !isLandscape);
    };

    // Check if orientation lock is supported
    const checkOrientationSupport = () => {
      const extendedScreen = screen as ExtendedScreen;
      setSupportsOrientationLock(extendedScreen.orientation && typeof extendedScreen.orientation.lock === 'function');
    };

    // Check initial orientation and orientation support
    checkOrientation();
    checkOrientationSupport();

    // Listen for orientation changes
    window.addEventListener("orientationchange", checkOrientation);
    window.addEventListener("resize", checkOrientation);

    return () => {
      window.removeEventListener("orientationchange", checkOrientation);
      window.removeEventListener("resize", checkOrientation);
    };
  }, [isMobile, isDismissed]);

  const lockOrientation = async () => {
    setIsLocking(true);

    try {
      // Check if Screen Orientation API is supported
      const extendedScreen = screen as ExtendedScreen;
      if (extendedScreen.orientation && typeof extendedScreen.orientation.lock === 'function') {
        await extendedScreen.orientation.lock('landscape');
        setIsDismissed(true);
        setIsVisible(false);
      } else {
        // Set as unsupported and show fallback UI
        setSupportsOrientationLock(false);
      }
    } catch (error) {
      console.error('Failed to lock orientation:', error);
      // Set as unsupported and show fallback UI
      setSupportsOrientationLock(false);
    } finally {
      setIsLocking(false);
    }
  };

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
          {supportsOrientationLock === false
            ? "Your device doesn't support automatic orientation locking. Please manually rotate your device to landscape mode for the best experience."
            : "Rotate your device to landscape mode to see the full roofing visualizer with all options clearly displayed."
          }
        </p>

        {supportsOrientationLock === false ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-[#2a3f6e]/5 rounded-lg border border-[#2a3f6e]/20">
              <Smartphone className="h-5 w-5 text-[#2a3f6e] flex-shrink-0" />
              <div className="text-sm text-[#2a3f6e]">
                <p className="font-medium">Manual Rotation Required</p>
                <p className="text-[#2a3f6e]/70">Rotate your device to landscape mode for the best experience</p>
              </div>
              <ArrowRight className="h-4 w-4 text-[#fe6b35] flex-shrink-0" />
            </div>
            <Button
              onClick={handleDismiss}
              className="w-full bg-[#2a3f6e] hover:bg-[#2a3f6e]/90 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Continue in Portrait
            </Button>
          </div>
        ) : (
          <Button
            onClick={lockOrientation}
            disabled={isLocking}
            className="w-full bg-[#fe6b35] hover:bg-[#fe6b35]/90 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLocking ? 'Locking Orientation...' : 'Continue in Landscape'}
          </Button>
        )}
      </Card>
    </div>
  );
};

export default LandscapePrompt;