import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, RotateCcw, Home, Palette } from "lucide-react";

interface TipsPromptProps {
  isVisible: boolean;
  onDismiss: () => void;
}

const TipsPrompt = ({ isVisible, onDismiss }: TipsPromptProps) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <Card className="w-full max-w-md p-6 bg-card/95 backdrop-blur-md border-2">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-full">
              <Home className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Welcome to Pinnacle Roof Configurator</h3>
              <p className="text-sm text-muted-foreground">Get started in 3 easy steps</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onDismiss}
            className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="p-1.5 bg-blue-500/10 rounded-full flex-shrink-0 mt-0.5">
              <RotateCcw className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Rotate & Explore</p>
              <p className="text-xs text-muted-foreground">Drag the house to view from different angles</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-1.5 bg-green-500/10 rounded-full flex-shrink-0 mt-0.5">
              <Home className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Choose Roof Type</p>
              <p className="text-xs text-muted-foreground">Select from tile options on the left panel</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-1.5 bg-purple-500/10 rounded-full flex-shrink-0 mt-0.5">
              <Palette className="h-4 w-4 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Pick Color</p>
              <p className="text-xs text-muted-foreground">Choose your preferred color from the right panel</p>
            </div>
          </div>
        </div>

        <Button
          onClick={onDismiss}
          className="w-full"
          size="lg"
        >
          Start Configuring
        </Button>
      </Card>
    </div>
  );
};

export default TipsPrompt;