import createImage from './createImage.js';
import {loadImage} from './loadImage.js';
import dataSetCacheManager from './dataSetCacheManager.js';
import {external} from './externalModules.js';

const cornerstoneWebImageLoader = {
    createImage,
    loadImage,
    dataSetCacheManager,
    external
};

export {
    createImage,
    loadImage,
    dataSetCacheManager,
    external
};

export default cornerstoneWebImageLoader;
