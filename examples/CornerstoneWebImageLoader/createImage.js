import {external} from './externalModules.js';

const canvas = document.createElement('canvas');
let lastImageIdDrawn;

/**
 * creates a cornerstone Image object for the specified Image and imageId
 *
 * @param image - An Image
 * @param imageId - the imageId for this image
 * @param renderType - render type of image
 * @returns Cornerstone Image Object
 */
export default function (imageId, image, imageDataSpec) {

    function getPixelData() {
        const imageData = getImageData();
        return imageData.data;
    }

    function getImageData() {
        let context;

        if (lastImageIdDrawn === imageId) {
            context = canvas.getContext('2d');
        } else {
            canvas.height = image.naturalHeight;
            canvas.width = image.naturalWidth;
            context = canvas.getContext('2d');
            context.drawImage(image, 0, 0);
            lastImageIdDrawn = imageId;
        }

        return context.getImageData(0, 0, image.naturalWidth, image.naturalHeight);
    }

    function getCanvas() {
        if (lastImageIdDrawn === imageId) {
            return canvas;
        }

        canvas.height = image.naturalHeight;
        canvas.width = image.naturalWidth;
        const context = canvas.getContext('2d');

        context.drawImage(image, 0, 0);
        lastImageIdDrawn = imageId;

        return canvas;
    }

    const {cornerstone} = external;
    const imagePlaneModule = cornerstone.metaData.get('imagePlaneModule', imageId) || {};
    const voiLutModule = cornerstone.metaData.get('voiLutModule', imageId) || {};
    const modalityLutModule = cornerstone.metaData.get('modalityLutModule', imageId) || {};

    if (imageDataSpec.renderType === 'webImage') {
        // extract the attributes we need
        const rows = image.naturalHeight;
        const columns = image.naturalWidth;
        // Extract the various attributes we need
        return {
            imageId,
            minPixelValue: 0,
            maxPixelValue: 255,
            slope: 1,
            intercept: 0,
            windowCenter: 128,
            windowWidth: 255,
            render: external.cornerstone.renderWebImage,
            getPixelData,
            getCanvas,
            getImage: () => image,
            rows,
            columns,
            height: rows,
            width: columns,
            color: true,
            rgba: true,
            columnPixelSpacing: imagePlaneModule.columnPixelSpacing,
            rowPixelSpacing: imagePlaneModule.rowPixelSpacing,
            invert: false,
            sizeInBytes: rows * columns * 4
        };
    } else if(imageDataSpec.renderType === 'pixelData') {
        const imageInfo = {
            imageId,
            color: false,
            columnPixelSpacing: imagePlaneModule.columnPixelSpacing,
            columns: imagePlaneModule.columns,
            height: imagePlaneModule.rows,
            preScale: {scaled: true},
            intercept: modalityLutModule.rescaleIntercept
                ? modalityLutModule.rescaleIntercept
                : 0,
            slope: modalityLutModule.rescaleSlope
                ? modalityLutModule.rescaleSlope
                : 1,
            invert: imagePlaneModule.photometricInterpretation === 'MONOCHROME1',
            minPixelValue: imageDataSpec.min, //imagePlaneModule.smallestPixelValue,
            maxPixelValue: imageDataSpec.max, //imagePlaneModule.largestPixelValue,
            rowPixelSpacing: imagePlaneModule.rowPixelSpacing,
            rows: imagePlaneModule.rows,
            sizeInBytes: image.byteLength,
            width: imagePlaneModule.columns,
            windowCenter: voiLutModule.windowCenter
                ? voiLutModule.windowCenter[0]
                : undefined,
            windowWidth: voiLutModule.windowWidth
                ? voiLutModule.windowWidth[0]
                : undefined,
            voiLUTFunction: voiLutModule.voiLUTFunction
                ? voiLutModule.voiLUTFunction
                : undefined,
            floatPixelData: undefined,
            imageFrame: imagePlaneModule,
            rgba: false,
            getPixelData: () => image
        };
        return imageInfo;
    }
}
