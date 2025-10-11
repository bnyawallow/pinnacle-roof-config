import { useRef } from "react";
import { Card } from "@/components/ui/card";
import { Check, ChevronUp, ChevronDown } from "lucide-react";

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

  const scrollUp = () => scrollRef.current?.scrollBy({ top: -50, behavior: 'smooth' });
  const scrollDown = () => scrollRef.current?.scrollBy({ top: 50, behavior: 'smooth' });

  return (
    <Card className="p-4 bg-card/30 backdrop-blur-md h-full overflow-hidden relative">
      <button onClick={scrollUp} className="absolute top-2 left-1/2 -translate-x-1/2 z-10 p-1 bg-card/50 rounded-full hover:bg-card/70 transition-colors">
        <ChevronUp className="h-4 w-4" />
      </button>
      <style>{`.scrollable::-webkit-scrollbar { display: none; } .scrollable { scrollbar-width: none; -ms-overflow-style: none; }`}</style>
      <div ref={scrollRef} className="overflow-y-auto h-full pb-8 pt-8 scrollable">
        <h2 className="text-lg font-bold text-foreground mb-4">Roofing Option</h2>
        <div className="space-y-2">
        {tiles.map((tile) => (
          <button
            key={tile.id}
            onClick={() => { console.log(tile.id); onSelectTile(tile.id); }}
            className={`relative w-full p-3 rounded-lg border-2 transition-all flex flex-col items-center gap-2 ${
              selectedTile === tile.id
                ? "border-selected bg-selected/20"
                : "border-border/50 bg-card/20 hover:border-primary/50"
            }`}
          >
            <div className="w-16 h-16 bg-muted/50 rounded-md p-2 flex items-center justify-center">
              <img
                src={tile.icon}
                alt={tile.name}
                className="w-full h-full object-contain opacity-80"
              />
            </div>
            <h3 className="font-semibold text-foreground text-sm text-center">{tile.name}</h3>
            {selectedTile === tile.id && (
              <div className="absolute top-2 right-2 bg-selected rounded-full p-1">
                <Check className="h-3 w-3 text-selected-foreground" />
              </div>
            )}
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

export default TileSelector;
