import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, RotateCcw, Home, Palette, MousePointer2 } from "lucide-react";

interface TipsPromptProps {
  isVisible: boolean;
  onDismiss: () => void;
}

const TipsPrompt = ({ isVisible, onDismiss }: TipsPromptProps) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <Card className="w-full max-w-md p-8 bg-white/95 backdrop-blur-md border-2 border-[#2a3f6e]/20 shadow-2xl">
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#2a3f6e]/10 rounded-2xl">
              <Home className="h-7 w-7 text-[#2a3f6e]" />
            </div>
            <div>
              <h3 className="font-bold text-[#2a3f6e] text-xl">Welcome to Pinnacle Roof Configurator</h3>
              <p className="text-[#2a3f6e]/70 text-base">Get started in 4 easy steps</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onDismiss}
            className="h-10 w-10 p-0 text-[#2a3f6e]/60 hover:text-[#2a3f6e] hover:bg-[#2a3f6e]/10 rounded-full"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="space-y-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-[#fe6b35]/10 rounded-xl flex-shrink-0 mt-1">
              <RotateCcw className="h-5 w-5 text-[#fe6b35]" />
            </div>
            <div>
              <p className="text-[#2a3f6e] font-semibold text-base">Rotate & Explore</p>
              <p className="text-[#2a3f6e]/70 text-sm">Drag the house to view from different angles</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-2 bg-[#2a3f6e]/10 rounded-xl flex-shrink-0 mt-1">
              <Home className="h-5 w-5 text-[#2a3f6e]" />
            </div>
            <div>
              <p className="text-[#2a3f6e] font-semibold text-base">Choose Roof Type</p>
              <p className="text-[#2a3f6e]/70 text-sm">Select from tile options on the left panel</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-2 bg-[#fe6b35]/10 rounded-xl flex-shrink-0 mt-1">
              <Palette className="h-5 w-5 text-[#fe6b35]" />
            </div>
            <div>
              <p className="text-[#2a3f6e] font-semibold text-base">Pick Color</p>
              <p className="text-[#2a3f6e]/70 text-sm">Choose your preferred color from the right panel</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-2 bg-[#2a3f6e]/10 rounded-xl flex-shrink-0 mt-1">
              <MousePointer2 className="h-5 w-5 text-[#2a3f6e]" />
            </div>
            <div>
              <p className="text-[#2a3f6e] font-semibold text-base">Zoom In/Out</p>
              <p className="text-[#2a3f6e]/70 text-sm">Use middle mouse scroll to zoom in and out</p>
            </div>
          </div>
        </div>

        <Button
          onClick={onDismiss}
          className="w-full bg-[#fe6b35] hover:bg-[#fe6b35]/90 text-white font-semibold py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
        >
          Start Configuring
        </Button>
      </Card>
    </div>
  );
};

export default TipsPrompt;