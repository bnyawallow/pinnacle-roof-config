import { useState } from "react";
import Header from "@/components/Header";
import TileSelector, { TileType } from "@/components/TileSelector";
import ColorSelector, { TileColor } from "@/components/ColorSelector";
import SelectionStatus from "@/components/SelectionStatus";
import LandscapePrompt from "@/components/LandscapePrompt";
import TipsPrompt from "@/components/TipsPrompt";
import tilePreviewImage from "@/assets/tile-preview.jpg";
import corrugatedIcon from "@/assets/tiles/corrugated.png";
import standingSeamIcon from "@/assets/tiles/standing-seam.png";
import ribbedIcon from "@/assets/tiles/ribbed.png";
import tileLookIcon from "@/assets/tiles/tile-look.png";
import SplineViewer from "@/components/SplineViewer";

const tileTypes: TileType[] = [
  {
    id: "classic",
    name: "Classic Tile",
    description: "Classic wavy pattern, excellent water drainage",
    icon: corrugatedIcon
  },
  {
    id: "stone-coated",
    name: "Stone Coated Shingles",
    description: "Modern vertical panels, sleek appearance",
    icon: standingSeamIcon
  },
  {
    id: "ecospan",
    name: "EcoSpan Tile",
    description: "Bold linear design, strong and durable",
    icon: ribbedIcon
  },
  {
    id: "briton",
    name: "Briton Tile",
    description: "Traditional tile appearance with steel strength",
    icon: tileLookIcon
  },
  {
    id: "corrugated",
    name: "Corrugated Sheets",
    description: "Traditional tile appearance with steel strength",
    icon: tileLookIcon
  }
];

const tileColors: TileColor[] = [
  { id: "charcoal", name: "Charcoal", hex: "#2C3539" },
  { id: "slate-gray", name: "Slate Gray", hex: "#6B7A88" },
  { id: "arctic-white", name: "Arctic White", hex: "#E8EDF2" },
  { id: "terra-cotta", name: "Terra Cotta", hex: "#C1654D" },
  { id: "forest-green", name: "Forest Green", hex: "#3D5C47" },
  { id: "burgundy", name: "Burgundy", hex: "#6B2E3E" },
  { id: "ocean-blue", name: "Ocean Blue", hex: "#3D5F7A" },
  { id: "sandstone", name: "Sandstone", hex: "#C4A88A" }
];

const Index = () => {
  const [selectedTile, setSelectedTile] = useState<string>(tileTypes[0].id);
  const [selectedColor, setSelectedColor] = useState<string>(tileColors[0].id);
  const [isSplineLoaded, setIsSplineLoaded] = useState<boolean>(false);
  const [showTips, setShowTips] = useState<boolean>(true);

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
          <div className="fixed left-4 top-[12vh] h-[83vh] w-40 overflow-hidden">
            <TileSelector
              tiles={tileTypes}
              selectedTile={selectedTile}
              onSelectTile={setSelectedTile}
            />
          </div>

          {/* Right panel - Color Selector */}
          <div className="fixed right-4 top-[12vh] h-[83vh] w-36 overflow-hidden">
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
