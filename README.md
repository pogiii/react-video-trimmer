# React Video Trimmer

A modern, browser-based video trimming application built with React and TypeScript. This tool allows users to upload video files, preview them with interactive controls, and set precise trim boundaries using an intuitive timeline interface.

## What This Project Does

React Video Trimmer is a client-side video editing tool that helps users:

- **Upload and validate video files** through a drag-and-drop interface
- **Play and control video playback** with standard media controls (play/pause, volume, fullscreen)
- **Visualize video content** with automatically generated filmstrip thumbnails
- **Set precise trim boundaries** using interactive timeline controls
- **Navigate through video** with a scrub-able timeline pointer

The application runs entirely in the browser without requiring any server-side processing, making it fast and privacy-friendly since videos never leave the user's device.

## Key Features

### 🎬 Video Player

- Clean, functional video player component
- Standard playback controls (play/pause, volume control, mute toggle)
- Fullscreen support
- Responsive design that works on desktop and mobile

### 📁 File Management

- Drag-and-drop file upload interface
- Comprehensive video format support (MP4, MOV, AVI, MKV, WebM, and many more)
- Client-side file validation with helpful error messages
- Support for various video codecs and containers

### 🎞️ Interactive Timeline

- **Filmstrip Preview**: Automatically generates thumbnail previews across the video timeline
- **Scrub Controls**: Click and drag to navigate to any point in the video
- **Trim Boundaries**: Set start and end points for video trimming with visual feedback
- **Time Display**: Shows current time and total duration in a readable format

### ⚡ Performance Optimized

- Efficient filmstrip generation using HTML5 Canvas
- Debounced user interactions to prevent performance issues
- Memoized components to minimize unnecessary re-renders
- Responsive thumbnail sizing that adapts to timeline width

## Technical Architecture

### Component Structure

The application follows a feature-based architecture with clear separation of concerns:

```
src/
├── features/
│   ├── ingest/          # File upload and validation
│   ├── player/          # Video player and state management
│   ├── timeline/        # Timeline, filmstrip, and trim controls
│   └── controls/        # UI control components
├── components/
│   ├── layouts/         # Application layout components
│   └── ui/              # Reusable UI components
└── utils/               # Utility functions
```

### State Management

- **React Context + useReducer**: Centralized video player state management
- **Type-safe actions**: All player interactions are handled through typed Redux-style actions
- **Persistent settings**: Volume and mute preferences are maintained across video loads

### Styling Approach

- **Plain CSS**: No preprocessors or CSS-in-JS, just clean, maintainable CSS
- **CSS Custom Properties**: Uses CSS variables for consistent theming
- **Responsive Design**: Mobile-first approach with flexible layouts

## Supported Video Formats

The application supports a wide range of video formats:

**Common Formats**: MP4, MOV, AVI, MKV, WebM, M4V
**Additional Formats**: 3GP, FLV, WMV, OGV, MTS, M2TS, TS, VOB, ASF, RM, RMVB, DivX, XviD

Format validation happens on both file extension and MIME type for maximum compatibility.

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd react-video-trimmer

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Building for Production

```bash
# Build the application
pnpm build

# Preview the production build
pnpm preview
```

## How to Use

1. **Upload a Video**: Drag and drop a video file onto the upload area, or click to browse and select a file
2. **Preview Your Video**: Once loaded, the video player will appear with standard playback controls
3. **Explore the Timeline**: Scroll through the automatically generated filmstrip to see your video content
4. **Set Trim Points**: Use the orange trim handles to set the start and end points for your desired clip
5. **Navigate Precisely**: Click anywhere on the timeline or drag the playhead to jump to specific moments

## Development Details

### Key Technologies

- **React 19**: Latest React with modern hooks and concurrent features
- **TypeScript**: Full type safety throughout the application
- **Vite**: Fast build tool with hot module replacement
- **Lucide React**: Clean, consistent icon library
- **HTML5 Canvas**: For efficient filmstrip thumbnail generation

### Code Quality

- **ESLint**: Configured with React-specific rules and TypeScript support
- **Prettier**: Consistent code formatting
- **Strict TypeScript**: Full type checking with strict mode enabled

### Browser Compatibility

The application uses modern web APIs including:

- HTML5 Video API for video playback
- File API for drag-and-drop uploads
- Canvas API for thumbnail generation
- Fullscreen API for immersive viewing

## Project Structure Highlights

### Player System

The video player is built as a controlled component with a centralized state management system. It separates the video element from the controls, allowing for flexible UI arrangements while maintaining consistent behavior.

### Timeline Generation

The filmstrip feature uses an intelligent algorithm that:

- Calculates optimal thumbnail dimensions based on video aspect ratio
- Generates evenly spaced frames across the video duration
- Creates efficient sprite sheets for smooth scrolling
- Adapts thumbnail count to available timeline width

### File Validation

Robust client-side validation ensures users get immediate feedback about file compatibility, supporting both extension-based and MIME-type-based detection.

## Contributing

The codebase follows modern React patterns and is well-documented with TypeScript interfaces. The modular architecture makes it easy to add new features or modify existing ones without affecting other parts of the application.
