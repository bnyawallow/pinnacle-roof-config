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
      console.log(selectedTile);
      applicationRef.current.setVariable('selectedTile', selectedTile);
    }
  }, [selectedTile]);

  useEffect(() => {
    if (applicationRef.current) {
      console.log(selectedColor);
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
    </div>
  );
};

export default SplineViewer;