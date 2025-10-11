import { useRef, useEffect } from 'react';
import Spline from '@splinetool/react-spline';
import { Application } from '@splinetool/runtime';

interface SplineViewerProps {
  selectedTile: string;
  selectedColor: string;
}

const SplineViewer = ({ selectedTile, selectedColor }: SplineViewerProps) => {
  const applicationRef = useRef<Application | null>(null);

  const onLoad = (splineApp: Application) => {
    applicationRef.current = splineApp;
    // Optionally set initial values
    splineApp.setVariable('selectedTile', selectedTile);
    splineApp.setVariable('selectedColor', selectedColor);
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
    <Spline
      scene="https://prod.spline.design/I9J7jyHuL4Bn8JtG/scene.splinecode"
      onLoad={onLoad}
    />
  );
};

export default SplineViewer;