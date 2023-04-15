/**
 *
 * @param {Object} imageData - The vtkImageData
 * @param {*} sliceIndex - The index of the slice you are inserting.
 * @param {*} image The cornerstone image to pull pixel data data from.
 * @param {*} modality The modality of the image.
 * @param {*} modalitySpecificScalingParameters Specific scaling paramaters for this modality. E.g. Patient weight.
 */
export default function insertSlice(
  imageData,
  sliceIndex,
  image,
  modality,
  modalitySpecificScalingParameters
) {
  const scalars = imageData.getPointData().getScalars();
  const scalarData = scalars.getData();

  const scalingFunction = _getScalingFunction(
    modality,
    image,
    modalitySpecificScalingParameters
  );

  const pixels = image.getPixelData();
  const sliceLength = pixels.length;

  let pixelIndex = 0;
  let max = scalingFunction(pixels[pixelIndex]);
  let min = max;

  // for (let pixelIndex = 0; pixelIndex < pixels.length; pixelIndex++) {
  //   const destIdx = pixelIndex + sliceIndex * sliceLength;
  //   const pixel = pixels[pixelIndex];
  //   const pixelValue = scalingFunction(pixel);
  //
  //   if (pixelValue > max) {
  //     max = pixelValue;
  //   } else if (pixelValue < min) {
  //     min = pixelValue;
  //   }
  //
  //   scalarData[destIdx] = pixelValue;
  // }

  // remove alpha channel from rgba
  let destIdx = sliceIndex * (sliceLength / 4) * 3;
  for (let pixelIndex = 0; pixelIndex < pixels.length; pixelIndex++) {
    scalarData[destIdx] = pixels[pixelIndex]; // red
    scalarData[destIdx + 1] = pixels[pixelIndex + 1]; // green
    scalarData[destIdx + 2] = pixels[pixelIndex + 2]; // blue
    destIdx += 3;
    pixelIndex += 3;
  }
  return { min, max };
}

function _getScalingFunction(
  modality,
  image,
  modalitySpecificScalingParameters
) {
  const { slope, intercept } = image;

  if (modality === 'PT') {
    const { patientWeight, correctedDose } = modalitySpecificScalingParameters;
    return pixel => {
      const modalityPixelValue = pixel * slope + intercept;

      return (1000 * modalityPixelValue * patientWeight) / correctedDose;
    };
  } else {
    return pixel => {
      return pixel * slope + intercept;
    };
  }
}
