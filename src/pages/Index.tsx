import { useState } from "react";
import Header from "@/components/Header";
import TileSelector, { TileType } from "@/components/TileSelector";
import ColorSelector, { TileColor } from "@/components/ColorSelector";
import SelectionStatus from "@/components/SelectionStatus";
import FullScreenPrompt from "@/components/FullScreenPrompt";
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
  { id: "charcoal", name: "Charcoal Grey", hex: "#3d3a35" },
  { id: "red", name: "Tile Red", hex: "#be3a35" },
  { id: "brown", name: "Chocolate", hex: "#584446" },
  { id: "forest-green", name: "Dark Green", hex: "#1d3c34" }
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
              ? "left-0 top-1/2 -translate-y-1/2 h-[80vh] w-17"
              : "left-4 top-1/2 -translate-y-1/2 h-[80vh] w-40"
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
              ? "right-0 top-1/2 -translate-y-1/2 h-[80vh] w-15"
              : "right-4 top-1/2 -translate-y-1/2 h-[80vh] w-36"
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

        {/* Shop Now button - bottom center */}
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-20">
          <a
            href="https://pinnacleroofing.co.ke/our-roofing-solutions/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#fe6b35] hover:bg-[#fe6b35]/90 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105"
          >
            Shop Now
          </a>
        </div>

        {/* Tips prompt - shows on first load */}
        <TipsPrompt isVisible={showTips} onDismiss={() => setShowTips(false)} />

        {/* Full screen prompt */}
        <FullScreenPrompt />
    </div>
  );
};

export default Index;
