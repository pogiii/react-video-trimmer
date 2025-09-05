/**
 * Supported video file extensions for the video trimmer
 */
export const SUPPORTED_VIDEO_EXTENSIONS = [
  '.mp4',
  '.mov',
  '.avi',
  '.mkv',
  '.webm',
  '.m4v',
  '.3gp',
  '.flv',
  '.wmv',
  '.ogv',
  '.mts',
  '.m2ts',
  '.ts',
  '.vob',
  '.asf',
  '.rm',
  '.rmvb',
  '.divx',
  '.xvid',
] as const;

/**
 * Supported video MIME types
 */
export const SUPPORTED_VIDEO_MIME_TYPES = [
  'video/mp4',
  'video/quicktime',
  'video/x-msvideo',
  'video/x-matroska',
  'video/webm',
  'video/x-m4v',
  'video/3gpp',
  'video/x-flv',
  'video/x-ms-wmv',
  'video/ogg',
  'video/mp2t',
  'video/dvd',
  'video/x-ms-asf',
  'video/vnd.rn-realvideo',
  'video/x-divx',
  'video/x-msvideo',
] as const;

/**
 * Validation result interface
 */
export interface FileValidationResult {
  isValid: boolean;
  error?: boolean;
}

/**
 * Validates if a file is a supported video format
 * @param file - The file to validate
 * @returns Validation result with isValid flag and optional error message
 */
export function validateVideoFile(
  file: File,
  supportedExtensions: readonly string[],
  supportedMimeTypes: readonly string[]
): FileValidationResult {
  // Check if file exists
  if (!file) {
    return {
      isValid: false,
      error: true,
    };
  }

  // Check file size

  // Check if file is empty
  if (file.size === 0) {
    return {
      isValid: false,
      error: true,
    };
  }

  // Get file extension
  const fileName = file.name.toLowerCase();
  const fileExtension = fileName.substring(fileName.lastIndexOf('.'));

  // Check file extension
  const hasValidExtension = supportedExtensions.includes(
    fileExtension as (typeof supportedExtensions)[number]
  );

  // Check MIME type
  const hasValidMimeType = supportedMimeTypes.includes(
    file.type as (typeof supportedMimeTypes)[number]
  );

  // File is valid if it has either a valid extension or MIME type
  if (!hasValidExtension && !hasValidMimeType) {
    return {
      isValid: false,
      error: true,
    };
  }

  return {
    isValid: true,
  };
}

/**
 * Validates multiple files and returns the first invalid file result
 * @param files - FileList or array of files to validate
 * @returns Validation result for the first invalid file, or success if all are valid
 */
export function validateVideoFiles(
  files: FileList | File[],
  supportedExtensions: readonly string[] = SUPPORTED_VIDEO_EXTENSIONS,
  supportedMimeTypes: readonly string[] = SUPPORTED_VIDEO_MIME_TYPES
): FileValidationResult {
  const fileArray = Array.from(files);

  if (fileArray.length === 0) {
    return {
      isValid: false,
      error: true,
    };
  }

  // Check each file
  for (const file of fileArray) {
    const result = validateVideoFile(
      file,
      supportedExtensions,
      supportedMimeTypes
    );
    if (!result.isValid) {
      return result;
    }
  }

  return {
    isValid: true,
  };
}
