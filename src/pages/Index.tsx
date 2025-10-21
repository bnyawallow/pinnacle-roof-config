import { useState } from "react";
import Header from "@/components/Header";
import TileSelector, { TileType } from "@/components/TileSelector";
import ColorSelector, { TileColor } from "@/components/ColorSelector";
import SelectionStatus from "@/components/SelectionStatus";
import LandscapePrompt from "@/components/LandscapePrompt";
import TipsPrompt from "@/components/TipsPrompt";
// import tilePreviewImage from "@/assets/tile-preview.jpg";
import classicIcon from "@/assets/tiles/classic.png";
import ecospanIcon from "@/assets/tiles/ecospan.png";
import britonIcon from "@/assets/tiles/briton.png";
import SplineViewer from "@/components/SplineViewer";
import { useIsMobile } from "@/hooks/use-mobile";

const tileTypes: TileType[] = [
  {
    id: "classic",
    name: "Classic Tile",
    description: "Classic wavy pattern, excellent water drainage",
    icon: classicIcon
  },
  {
    id: "ecospan",
    name: "EcoSpan Tile",
    description: "Bold linear design, strong and durable",
    icon: ecospanIcon
  },
  {
    id: "briton",
    name: "Briton Tile",
    description: "Traditional tile appearance with steel strength",
    icon: britonIcon
  }
];

const tileColors: TileColor[] = [
  { id: "charcoal", name: "Charcoal Gray", hex: "#312c33" },
  { id: "red", name: "Brick Red", hex: "#d05045" },
  { id: "brown", name: "Brown", hex: "#6b4c52" },
  { id: "forest-green", name: "Forest Green", hex: "#338376" }
];

const Index = () => {
  const [selectedTile, setSelectedTile] = useState<string>(tileTypes[0].id);
  const [selectedColor, setSelectedColor] = useState<string>(tileColors[0].id);
  const [isSplineLoaded, setIsSplineLoaded] = useState<boolean>(false);
  const [showTips, setShowTips] = useState<boolean>(true);
  const isMobile = useIsMobile();

  const currentTile = tileTypes.find(t => t.id === selectedTile) || tileTypes[0];
  const currentColor = tileColors.find(c => c.id === selectedColor) || tileColors[0];

  return (
    <div className="h-screen overflow-hidden relative">
      {/* Spline scene embed */}
      <div className="fixed inset-0 z-0">
        <SplineViewer selectedTile={selectedTile} selectedColor={selectedColor} onLoaded={() => setIsSplineLoaded(true)} />
      </div>

      {/* Header */}
      <div className="relative z-10">
        <Header />
      </div>
      
      {isSplineLoaded && (
        <>
          {/* Left panel - Tile Selector */}
          <div className={`fixed overflow-hidden ${
            isMobile
              ? "left-0 top-[10vh] h-[80vh] w-17"
              : "left-4 top-[10vh] h-[80vh] w-40"
          }`}>
            <TileSelector
              tiles={tileTypes}
              selectedTile={selectedTile}
              onSelectTile={setSelectedTile}
            />
          </div>

          {/* Right panel - Color Selector */}
          <div className={`fixed overflow-hidden ${
            isMobile
              ? "right-0 top-[10vh] h-[80vh] w-15"
              : "right-4 top-[10vh] h-[80vh] w-36"
          }`}>
            <ColorSelector
              colors={tileColors}
              selectedColor={selectedColor}
              onSelectColor={setSelectedColor}
            />
          </div>
        </>
      )}

        {/* Bottom center panel - Selection Status */}
        <div className="fixed bottom-0 left-0 w-full hidden">
          <SelectionStatus
            selectedTileName={currentTile.name}
            selectedTileDescription={currentTile.description}
            selectedColorName={currentColor.name}
            selectedColorHex={currentColor.hex}
          />
        </div>

        {/* Tips prompt - shows on first load */}
        <TipsPrompt isVisible={showTips} onDismiss={() => setShowTips(false)} />

        {/* Landscape prompt for mobile devices */}
        <LandscapePrompt />
    </div>
  );
};

export default Index;
