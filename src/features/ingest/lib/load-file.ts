
export function loadFile(file:File) {
    try {
        const url = URL.createObjectURL(file);
        return url;
    } catch (error) {
        console.error(error);
        return null;
    }
}