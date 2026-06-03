/**
 * Dynamically converts any image URL to ASCII art using an offscreen canvas.
 * This is incredibly sentimental because she can "view" your memories right in the terminal.
 */
const DENSITY = "Ñ@#W$9876543210?!abc;:+=-,._ "; // Dark to light characters

export async function convertImageToAscii(
  imageUrl: string,
  width: number = 60
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      
      if (!ctx) {
        reject(new Error("Canvas not supported"));
        return;
      }

      // Calculate height to maintain aspect ratio (font characters are usually roughly 2:1 height/width)
      const height = Math.floor((img.height / img.width) * width * 0.5);
      
      canvas.width = width;
      canvas.height = height;
      
      ctx.drawImage(img, 0, 0, width, height);
      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;
      
      let asciiArt = "";
      
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        // Calculate relative luminance
        const avg = (r + g + b) / 3;
        
        // Map luminance to character
        const charIndex = Math.floor((avg / 255) * (DENSITY.length - 1));
        const char = DENSITY[charIndex];
        
        // Add a space to make it look less squished
        asciiArt += char;
        
        // Newline at the end of the row
        if ((i / 4 + 1) % width === 0) {
          asciiArt += "\n";
        }
      }
      
      resolve(asciiArt);
    };
    
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = imageUrl;
  });
}