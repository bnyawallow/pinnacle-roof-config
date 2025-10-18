import { useRef } from "react";
import { Card } from "@/components/ui/card";
import { Check, ChevronUp, ChevronDown } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export interface TileColor {
  id: string;
  name: string;
  hex: string;
}

interface ColorSelectorProps {
  colors: TileColor[];
  selectedColor: string;
  onSelectColor: (id: string) => void;
}

const ColorSelector = ({ colors, selectedColor, onSelectColor }: ColorSelectorProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const scrollUp = () => scrollRef.current?.scrollBy({ top: -50, behavior: 'smooth' });
  const scrollDown = () => scrollRef.current?.scrollBy({ top: 50, behavior: 'smooth' });

  return (
    <Card className={`bg-card/30 backdrop-blur-md h-full overflow-hidden relative ${isMobile ? 'p-2' : 'p-4'}`}>
      <button onClick={scrollUp} className="absolute top-2 left-1/2 -translate-x-1/2 z-10 p-1 bg-card/50 rounded-full hover:bg-card/70 transition-colors">
        <ChevronUp className="h-4 w-4" />
      </button>
      <style>{`.scrollable::-webkit-scrollbar { display: none; } .scrollable { scrollbar-width: none; -ms-overflow-style: none; }`}</style>
      <div ref={scrollRef} className={`overflow-y-auto pb-8 ${isMobile ? 'pt-8' : 'pt-10'} scrollable h-full`}>
        <div className="space-y-2">
        {colors.map((color) => (
          <button
            key={color.id}
            onClick={() => { onSelectColor(color.id); }}
            className={`relative w-full rounded-lg transition-all hover:bg-card/20 ${
              isMobile ? "flex flex-col items-center p-2 gap-1" : "flex items-center gap-3 p-2"
            }`}
          >
            <div
              className={`rounded-md border-2 transition-all flex-shrink-0 ${
                selectedColor === color.id
                  ? "border-selected scale-95"
                  : "border-border/50 hover:border-primary/50"
              } ${isMobile ? "w-8 h-8" : "w-10 h-10"}`}
              style={{ backgroundColor: color.hex }}
            >
              {selectedColor === color.id && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-selected rounded-full p-1">
                    <Check className={`text-selected-foreground ${isMobile ? "h-3 w-3" : "h-4 w-4"}`} />
                  </div>
                </div>
              )}
            </div>
            <p className={`text-foreground font-medium text-center ${isMobile ? 'text-xs leading-tight' : 'text-sm'}`}>{color.name}</p>
          </button>
        ))}
        </div>
      </div>
      <button onClick={scrollDown} className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 p-1 bg-card/50 rounded-full hover:bg-card/70 transition-colors">
        <ChevronDown className="h-4 w-4" />
      </button>
    </Card>
  );
};

export default ColorSelector;

