import { useState, useCallback } from 'react';
import { api } from '../services/api';

export function useMonumentScanner() {
  const [scannerState, setScannerState] = useState({
    image: null,
    isScanning: false,
    result: null,
    detectedFeatures: [],
    confidence: null,
    fileName: '',
    error: null
  });

  const scan = useCallback(async (imageFile, fileName = '', directMonumentId = null) => {
    setScannerState((prev) => ({
      ...prev,
      image: typeof imageFile === 'string' ? imageFile : URL.createObjectURL(imageFile),
      fileName,
      isScanning: true,
      result: null,
      confidence: null,
      detectedFeatures: [],
      error: null
    }));

    try {
      const data = await api.identifyMonument(imageFile, fileName, directMonumentId);
      setScannerState((prev) => ({
        ...prev,
        isScanning: false,
        result: data.monument,
        confidence: data.confidence,
        detectedFeatures: data.visualFeatures || []
      }));
      return data;
    } catch (err) {
      setScannerState((prev) => ({
        ...prev,
        isScanning: false,
        error: err.message || 'Vision identification failed'
      }));
      throw err;
    }
  }, []);

  const reset = useCallback(() => {
    setScannerState({
      image: null,
      isScanning: false,
      result: null,
      detectedFeatures: [],
      confidence: null,
      fileName: '',
      error: null
    });
  }, []);

  return {
    ...scannerState,
    scan,
    reset
  };
}

export default useMonumentScanner;
