import { useState } from "react";
import Header from "@/components/Header";
import TileSelector, { TileType } from "@/components/TileSelector";
import ColorSelector, { TileColor } from "@/components/ColorSelector";
import SelectionStatus from "@/components/SelectionStatus";
import tilePreviewImage from "@/assets/tile-preview.jpg";
import corrugatedIcon from "@/assets/tiles/corrugated.png";
import standingSeamIcon from "@/assets/tiles/standing-seam.png";
import ribbedIcon from "@/assets/tiles/ribbed.png";
import tileLookIcon from "@/assets/tiles/tile-look.png";

const tileTypes: TileType[] = [
  {
    id: "corrugated",
    name: "Corrugated Profile",
    description: "Classic wavy pattern, excellent water drainage",
    icon: corrugatedIcon
  },
  {
    id: "standing-seam",
    name: "Standing Seam",
    description: "Modern vertical panels, sleek appearance",
    icon: standingSeamIcon
  },
  {
    id: "ribbed",
    name: "Ribbed Profile",
    description: "Bold linear design, strong and durable",
    icon: ribbedIcon
  },
  {
    id: "tile-look",
    name: "Tile Look",
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

  const currentTile = tileTypes.find(t => t.id === selectedTile) || tileTypes[0];
  const currentColor = tileColors.find(c => c.id === selectedColor) || tileColors[0];

  return (
    <div className="h-screen overflow-hidden relative">
      {/* Full screen background preview */}
      <div 
        className="fixed inset-0 z-0"
        style={{ 
          backgroundColor: currentColor.hex,
          backgroundImage: `url(${tilePreviewImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'multiply'
        }}
      >
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Header */}
      <div className="relative z-10">
        <Header />
      </div>
      
      {/* Floating panels */}
      <div className="relative z-10 min-h-[calc(100vh-80px)]">
        {/* Left panel - Tile Selector */}
        <div className="fixed left-0 top-[5vh] w-56 h-[90vh] overflow-hidden">
          <TileSelector
            tiles={tileTypes}
            selectedTile={selectedTile}
            onSelectTile={setSelectedTile}
          />
        </div>

        {/* Right panel - Color Selector */}
        <div className="fixed right-0 top-[5vh] w-48 h-[90vh] overflow-hidden">
          <ColorSelector
            colors={tileColors}
            selectedColor={selectedColor}
            onSelectColor={setSelectedColor}
          />
        </div>

        {/* Bottom center panel - Selection Status */}
        <div className="fixed bottom-0 left-0 w-full hidden">
          <SelectionStatus
            selectedTileName={currentTile.name}
            selectedTileDescription={currentTile.description}
            selectedColorName={currentColor.name}
            selectedColorHex={currentColor.hex}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
