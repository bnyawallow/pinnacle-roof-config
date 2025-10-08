import { Card } from "@/components/ui/card";

interface SelectionStatusProps {
  selectedTileName: string;
  selectedTileDescription: string;
  selectedColorName: string;
  selectedColorHex: string;
}

const SelectionStatus = ({ selectedTileName, selectedTileDescription, selectedColorName, selectedColorHex }: SelectionStatusProps) => {
  return (
    <Card className="p-4 bg-card backdrop-blur-md border-border/50 shadow-lg">
      <h3 className="text-sm font-semibold text-muted-foreground mb-3">Current Selection</h3>
      <div className="space-y-3">
        <div>
          <div className="flex items-center justify-between gap-4 mb-1">
            <span className="text-xs text-muted-foreground">Tile:</span>
            <span className="text-sm font-semibold text-foreground">{selectedTileName}</span>
          </div>
          <p className="text-xs text-muted-foreground italic">{selectedTileDescription}</p>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-xs text-muted-foreground">Color:</span>
          <div className="flex items-center gap-2">
            <div 
              className="h-4 w-4 rounded border border-border/50"
              style={{ backgroundColor: selectedColorHex }}
            />
            <span className="text-sm font-semibold text-foreground">{selectedColorName}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SelectionStatus;
