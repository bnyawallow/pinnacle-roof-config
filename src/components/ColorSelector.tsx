import { useRef } from "react";
import { Card } from "@/components/ui/card";
import { Check, ChevronUp, ChevronDown } from "lucide-react";

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

  const scrollUp = () => scrollRef.current?.scrollBy({ top: -50, behavior: 'smooth' });
  const scrollDown = () => scrollRef.current?.scrollBy({ top: 50, behavior: 'smooth' });

  return (
    <Card className="bg-white/10 backdrop-blur-md h-full overflow-hidden relative p-3 border border-white/20">
      <button onClick={scrollUp} className="absolute top-2 left-1/2 -translate-x-1/2 z-10 p-1.5 bg-[#2a3f6e]/80 rounded-full hover:bg-[#2a3f6e] transition-all duration-200">
        <ChevronUp className="h-4 w-4 text-white" />
      </button>
      <style>{`.scrollable::-webkit-scrollbar { display: none; } .scrollable { scrollbar-width: none; -ms-overflow-style: none; }`}</style>
      <div ref={scrollRef} className="overflow-y-auto pb-10 pt-10 scrollable h-full">
        <div className="space-y-3">
        {colors.map((color) => (
          <button
            key={color.id}
            onClick={() => { onSelectColor(color.id); }}
            className="relative w-full flex flex-col items-center p-3 gap-2 rounded-xl transition-all duration-200 hover:bg-[#fe6b35]/5"
          >
            <div
              className={`w-10 h-10 rounded-lg border-2 transition-all duration-200 flex-shrink-0 ${
                selectedColor === color.id
                  ? "border-[#fe6b35] scale-95 shadow-lg shadow-[#fe6b35]/30"
                  : "border-[#2a3f6e]/30 hover:border-[#fe6b35]/50"
              }`}
              style={{ backgroundColor: color.hex }}
            >
              {selectedColor === color.id && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-[#fe6b35] rounded-full p-1.5">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                </div>
              )}
            </div>
            <p className="text-[#2a3f6e] font-medium text-sm text-center leading-tight">{color.name}</p>
          </button>
        ))}
        </div>
      </div>
      <button onClick={scrollDown} className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 p-1.5 bg-[#2a3f6e]/80 rounded-full hover:bg-[#2a3f6e] transition-all duration-200">
        <ChevronDown className="h-4 w-4 text-white" />
      </button>
    </Card>
  );
};

export default ColorSelector;

