import './style.css';
import { Card } from '../../../../components/ui/card';
import { FileDragArea } from '../../../../components/ui/file-drag-area';
import { validateVideoFiles } from '../../lib/file-validation';
import { useState, useCallback } from 'react';

/// Check

type FileLoaderProps = {
  whenFileAvailable?: (files: FileList) => void;
};

export function FileLoader({ whenFileAvailable }: FileLoaderProps) {
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = useCallback((files: FileList) => {
    const validationResult = validateVideoFiles(files);
    if (!validationResult.isValid) {
      setError(validationResult.error ? 'Invalid file' : null);
      return;
    } else {
      setError(null);
    }
    whenFileAvailable?.(files);
  }, [whenFileAvailable]);

  return (
    <div className='file-loader-root flex justify-center items-center'>
      <Card className='flex flex-col gap-1 justify-center items-center'>
        <div className='flex flex-col gap-1'>
          <h1 className='heading-primary text-2xl'>
            Welcome to React Video Trimmer
          </h1>
          <div className='flex flex-col gap-1'>
            <FileDragArea.Root onFileChange={handleFileChange}>
              <FileDragArea.Input accept='video/*' />
              <FileDragArea.Trigger>
                <FileDragArea.Content>
                  <FileDragArea.Message />
                  {error && (
                    <div className='file-loader-error flex justify-center items-center text-sm'>
                      <span>{error}</span>
                    </div>
                  )}
                </FileDragArea.Content>
              </FileDragArea.Trigger>
            </FileDragArea.Root>
          </div>
        </div>
      </Card>
    </div>
  );
}
