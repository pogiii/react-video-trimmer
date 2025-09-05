import { useRef, useState, createContext, useContext } from "react";
import './style.css';

// Context for sharing state between composed components
interface FileDragAreaContextValue {
  isDragging: boolean;
  setIsDragging: (dragging: boolean) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  handleClick: () => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragLeave: () => void;
  onFileChange?: (files: FileList) => void;
}

const FileDragAreaContext = createContext<FileDragAreaContextValue | null>(null);

const useFileDragArea = () => {
  const context = useContext(FileDragAreaContext);
  if (!context) {
    throw new Error('FileDragArea components must be used within FileDragArea.Root');
  }
  return context;
};

// Root component that provides context and handles the main drag area
interface FileDragAreaRootProps extends React.HTMLAttributes<HTMLDivElement> {
  onFileChange?: (files: FileList) => void;
  children: React.ReactNode;
}

const FileDragAreaRoot = ({ className, children, onFileChange, ...props }: FileDragAreaRootProps) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;

    if (files.length > 0 && onFileChange) {
      onFileChange(files);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const contextValue: FileDragAreaContextValue = {
    isDragging,
    setIsDragging,
    fileInputRef,
    handleClick,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    onFileChange,
  };

  return (
    <FileDragAreaContext.Provider value={contextValue}>
      <div
        className={`file-drag-area ${className ?? ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        data-dragging={isDragging}
        {...props}
      >
        {children}
      </div>
    </FileDragAreaContext.Provider>
  );
};

// Trigger component that handles clicks to open file dialog
interface FileDragAreaTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const FileDragAreaTrigger = ({ className, children, onClick, ...props }: FileDragAreaTriggerProps) => {
  const { handleClick } = useFileDragArea();

  return (
    <div
      className={`file-drag-area-trigger ${className ?? ''}`}
      onClick={(e) => {
        handleClick();
        onClick?.(e);
      }}
      role="button"
      tabIndex={0}
      {...props}
    >
      {children}
    </div>
  );
};

// Input component that renders the hidden file input
interface FileDragAreaInputProps extends Omit<React.HTMLProps<HTMLInputElement>, 'type' | 'onChange'> {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileDragAreaInput = ({ onChange, ...props }: FileDragAreaInputProps) => {
  const { fileInputRef, onFileChange } = useFileDragArea();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && onFileChange) {
      onFileChange(files);
    }
    onChange?.(e);
  };

  return (
    <input
      type="file"
      ref={fileInputRef}
      className="hidden"
      onChange={handleFileChange}
      {...props}
    />
  );
};

// Content component for displaying content inside the drag area
interface FileDragAreaContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const FileDragAreaContent = ({ className, children, ...props }: FileDragAreaContentProps) => {
  return (
    <div className={`file-drag-area-content ${className ?? ''}`} {...props}>
      {children}
    </div>
  );
};

// Message component for displaying drag state messages
interface FileDragAreaMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {
  dragMessage?: string;
  defaultMessage?: string;
}

const FileDragAreaMessage = ({ 
  className, 
  dragMessage = 'Release to upload', 
  defaultMessage = 'Drop a video here or click to choose',
  ...props 
}: FileDragAreaMessageProps) => {
  const { isDragging } = useFileDragArea();

  return (
    <p className={`file-drag-area-message ${className ?? ''}`} {...props}>
      {isDragging ? dragMessage : defaultMessage}
    </p>
  );
};

// Compose all components under FileDragArea namespace
// eslint-disable-next-line react-refresh/only-export-components
export const FileDragArea = {
  Root: FileDragAreaRoot,
  Trigger: FileDragAreaTrigger,
  Input: FileDragAreaInput,
  Content: FileDragAreaContent,
  Message: FileDragAreaMessage,
};

// Legacy component for backward compatibility
interface LegacyFileDragAreaProps extends Omit<React.HTMLProps<HTMLInputElement>, 'type'> {
  whenFileAvailable?: (files: FileList) => void;
}

export const LegacyFileDragArea = ({ className, children, whenFileAvailable, ...props }: LegacyFileDragAreaProps) => {
  return (
    <FileDragArea.Root className={className} onFileChange={whenFileAvailable}>
      <FileDragArea.Input {...props} />
      <FileDragArea.Trigger>
        <FileDragArea.Message />
        {children}
      </FileDragArea.Trigger>
    </FileDragArea.Root>
  );
};

export default FileDragArea;