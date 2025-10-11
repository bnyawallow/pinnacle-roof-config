import { useRef, useEffect, useState } from 'react';
import Spline from '@splinetool/react-spline';
import { Application } from '@splinetool/runtime';

interface SplineViewerProps {
  selectedTile: string;
  selectedColor: string;
  onLoaded?: () => void;
}

const SplineViewer = ({ selectedTile, selectedColor, onLoaded }: SplineViewerProps) => {
  const applicationRef = useRef<Application | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showHint, setShowHint] = useState(true);

  const onLoad = (splineApp: Application) => {
    applicationRef.current = splineApp;
    // Optionally set initial values
    splineApp.setVariable('selectedTile', selectedTile);
    splineApp.setVariable('selectedColor', selectedColor);
    setIsLoaded(true);
    if (onLoaded) onLoaded();
  };

  useEffect(() => {
    if (applicationRef.current) {
      applicationRef.current.setVariable('selectedTile', selectedTile);
    }
  }, [selectedTile]);

  useEffect(() => {
    if (applicationRef.current) {
      applicationRef.current.setVariable('selectedColor', selectedColor);
    }
  }, [selectedColor]);

  return (
    <div className="relative w-full h-full">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-xl">
          Loading Pinnacle Configurator...
        </div>
      )}
      <div className="cursor-pointer w-full h-full">
        <Spline
          scene="https://prod.spline.design/I9J7jyHuL4Bn8JtG/scene.splinecode"
          onLoad={onLoad}
        />
      </div>
      {isLoaded && showHint && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-80 p-4 rounded-lg text-sm max-w-md">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold">How to Interact</h3>
            <button
              onClick={() => setShowHint(false)}
              className="text-white hover:text-gray-300 text-lg leading-none"
            >
              ×
            </button>
          </div>
          <ul className="space-y-1">
            <li className="flex items-center">
              <span className="mr-2">🔄</span>
              Drag the house to view from different angles
            </li>
            <li className="flex items-center">
              <span className="mr-2">🏠</span>
              Select tile types from the left panel
            </li>
            <li className="flex items-center">
              <span className="mr-2">🎨</span>
              Choose colors from the right panel
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SplineViewer;