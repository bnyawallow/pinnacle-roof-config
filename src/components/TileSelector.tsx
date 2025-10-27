import { useRef } from "react";
import { Card } from "@/components/ui/card";
import { Check, ChevronUp, ChevronDown } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export interface TileType {
  id: string;
  name: string;
  description: string;
  icon: string;
}


interface TileSelectorProps {
  tiles: TileType[];
  selectedTile: string;
  onSelectTile: (id: string) => void;
}

const TileSelector = ({ tiles, selectedTile, onSelectTile }: TileSelectorProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const scrollUp = () => scrollRef.current?.scrollBy({ top: -50, behavior: 'smooth' });
  const scrollDown = () => scrollRef.current?.scrollBy({ top: 50, behavior: 'smooth' });

  const hasScrolling = tiles.length > 4;

  return (
    <Card className={`bg-white/10 backdrop-blur-md overflow-hidden relative p-3 md:p-3 border border-white/20 ${hasScrolling ? 'h-full' : ''}`}>
      {hasScrolling && (
        <button onClick={scrollUp} className="absolute top-2 left-1/2 -translate-x-1/2 z-10 p-1.5 bg-[#2a3f6e]/80 rounded-full hover:bg-[#2a3f6e] transition-all duration-200">
          <ChevronUp className="h-4 w-4 text-white" />
        </button>
      )}
      {hasScrolling && (
        <style>{`.scrollable::-webkit-scrollbar { display: none; } .scrollable { scrollbar-width: none; -ms-overflow-style: none; }`}</style>
      )}
      <div ref={hasScrolling ? scrollRef : null} className={`space-y-3 px-1 ${hasScrolling ? 'overflow-y-auto pb-10 pt-10 scrollable h-full' : ''}`}>
        {tiles.map((tile) => (
          <button
            key={tile.id}
            onClick={() => { onSelectTile(tile.id); }}
            className={`relative w-full rounded-xl border-2 transition-all duration-200 flex flex-col items-center justify-center p-3 gap-2 ${
              selectedTile === tile.id
                ? "border-[#fe6b35] bg-[#fe6b35]/20 shadow-lg shadow-[#fe6b35]/20"
                : "border-[#2a3f6e]/30 bg-white/5 hover:border-[#fe6b35]/50 hover:bg-[#fe6b35]/10"
            }`}
          >
            <div className="w-14 h-14 bg-[#2a3f6e]/10 rounded-lg p-2 flex items-center justify-center border border-[#2a3f6e]/20">
              <img
                src={tile.icon}
                alt={tile.name}
                className="w-full h-full object-contain opacity-90"
              />
            </div>
            {!isMobile && (
              <h3 className="font-semibold text-[#2a3f6e] text-sm text-center leading-tight">{tile.name}</h3>
            )}
            {selectedTile === tile.id && (
              <div className="absolute top-2 right-2 bg-[#fe6b35] rounded-full p-1.5">
                <Check className="h-4 w-4 text-white" />
              </div>
            )}
          </button>
        ))}
      </div>
      {hasScrolling && (
        <button onClick={scrollDown} className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 p-1.5 bg-[#2a3f6e]/80 rounded-full hover:bg-[#2a3f6e] transition-all duration-200">
          <ChevronDown className="h-4 w-4 text-white" />
        </button>
      )}
    </Card>
  );
};

export default TileSelector;
