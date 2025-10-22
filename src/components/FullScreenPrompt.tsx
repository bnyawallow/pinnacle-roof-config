import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Maximize, X, Monitor } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

// Screen Orientation API types
interface ScreenOrientation {
  lock?(orientation: string): Promise<void>;
  unlock?(): void;
}

interface ExtendedScreen extends Screen {
  orientation?: ScreenOrientation;
}

const FullScreenPrompt = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isEnteringFullScreen, setIsEnteringFullScreen] = useState(false);
  const [supportsOrientationLock, setSupportsOrientationLock] = useState<boolean | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isDismissed) return;

    // Check if orientation lock is supported
    const checkOrientationSupport = () => {
      const extendedScreen = screen as ExtendedScreen;
      setSupportsOrientationLock(extendedScreen.orientation && typeof extendedScreen.orientation.lock === 'function');
    };

    checkOrientationSupport();

    // Check if already in full screen
    const checkFullScreen = () => {
      if (document.fullscreenElement) {
        setIsVisible(false);
      }
    };

    checkFullScreen();

    // Listen for full screen changes
    document.addEventListener("fullscreenchange", checkFullScreen);

    return () => {
      document.removeEventListener("fullscreenchange", checkFullScreen);
    };
  }, [isDismissed]);

  const enterFullScreen = async () => {
    setIsEnteringFullScreen(true);

    try {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();

        // Attempt to lock orientation to landscape if supported
        if (isMobile && supportsOrientationLock) {
          const extendedScreen = screen as ExtendedScreen;
          if (extendedScreen.orientation) {
            await extendedScreen.orientation.lock('landscape');
          }
        }

        setIsVisible(false);
        setIsDismissed(true);
      }
    } catch (error) {
      console.error('Failed to enter full screen:', error);
    } finally {
      setIsEnteringFullScreen(false);
    }
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };

  if (!isVisible || isDismissed) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <Card className="w-full max-w-sm p-6 bg-white/95 backdrop-blur-md border-2 border-[#2a3f6e]/20 shadow-2xl">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#fe6b35]/10 rounded-xl">
              <Maximize className="h-6 w-6 text-[#fe6b35]" />
            </div>
            <div>
              <h3 className="font-bold text-[#2a3f6e] text-lg">Full Screen Mode</h3>
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
          Enter full screen mode for the best viewing experience of the roofing visualizer.
        </p>

        <div className="space-y-4">
          <Button
            onClick={enterFullScreen}
            disabled={isEnteringFullScreen}
            className="w-full bg-[#fe6b35] hover:bg-[#fe6b35]/90 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isEnteringFullScreen ? 'Entering Full Screen...' : 'Enter Full Screen'}
          </Button>
          <Button
            onClick={handleDismiss}
            variant="outline"
            className="w-full border-[#2a3f6e]/20 text-[#2a3f6e] hover:bg-[#2a3f6e]/10 font-semibold py-3 rounded-xl"
          >
            Continue Normally
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default FullScreenPrompt;