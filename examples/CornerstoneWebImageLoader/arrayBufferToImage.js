/**
 * Convert array buffer to image. Returns a promise that resolves to an Image object for the bytes in arrayBuffer
 *
 * @param arrayBuffer - arrayBuffer with bytes for a web image (e.g. JPEG, PNG, etc)
 * @returns {Promise} Promise that resolves to an Image object
 */
export default function (arrayBuffer, originalWidth, originalHeight) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        const arrayBufferView = new Uint8Array(arrayBuffer);
        const blob = new Blob([arrayBufferView]);
        const urlCreator = window.URL || window.webkitURL;
        const imageUrl = urlCreator.createObjectURL(blob);

        image.src = imageUrl;
        image.onload = () => {
            if (originalWidth !== undefined && originalHeight !== undefined && (originalWidth !== image.width || originalHeight !== image.height)) {
                const elem = document.createElement('canvas');
                elem.width = originalWidth;
                elem.height = originalHeight;
                const ctx = elem.getContext('2d');
                ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, originalWidth, originalHeight);
                const resizeImage = new Image();
                const resizeBlobUrl = elem.toDataURL();
                resizeImage.src = resizeBlobUrl;
                resizeImage.onload = () => {
                    resolve(resizeImage);
                };
                urlCreator.revokeObjectURL(resizeBlobUrl);
            } else {
                resolve(image);
            }
            urlCreator.revokeObjectURL(imageUrl);
        };

        image.onerror = (error) => {
            urlCreator.revokeObjectURL(imageUrl);
            reject(error);
        };
    });
}
