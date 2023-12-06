import React, { Component } from 'react';
import {
  View2D,
  getImageData,
  loadImageData,
  vtkInteractorStyleMPRCrosshairs,
  vtkSVGCrosshairsWidget,
  vtkInteractorStyleMPRWindowLevel,
} from '../src';
import vtkVolume from '@kitware/vtk.js/Rendering/Core/Volume';
import vtkVolumeMapper from '@kitware/vtk.js/Rendering/Core/VolumeMapper';
import cornerstoneWebImageLoader from './CornerstoneWebImageLoader';


function loadDataset(imageIds, displaySetInstanceUid) {
  const imageDataObject = getImageData(imageIds, displaySetInstanceUid);

  loadImageData(imageDataObject);
  return imageDataObject;
}

class VTKCrosshairsExample extends Component {
  state = {
    volumes: [],
    displayCrosshairs: true,
  };

  async componentDidMount() {
    this.apis = [];

    // 8bit png
    // let ctImageIds = ['https://localhost-static.detectedx.com/images/398b0a6d-9aec-44c4-b3d6-2c430811993c/0', 'https://localhost-static.detectedx.com/images/398b0a6d-9aec-44c4-b3d6-2c430811993c/1', 'https://localhost-static.detectedx.com/images/398b0a6d-9aec-44c4-b3d6-2c430811993c/2', 'https://localhost-static.detectedx.com/images/398b0a6d-9aec-44c4-b3d6-2c430811993c/3', 'https://localhost-static.detectedx.com/images/398b0a6d-9aec-44c4-b3d6-2c430811993c/4', 'https://localhost-static.detectedx.com/images/398b0a6d-9aec-44c4-b3d6-2c430811993c/5', 'https://localhost-static.detectedx.com/images/398b0a6d-9aec-44c4-b3d6-2c430811993c/6', 'https://localhost-static.detectedx.com/images/398b0a6d-9aec-44c4-b3d6-2c430811993c/7', 'https://localhost-static.detectedx.com/images/398b0a6d-9aec-44c4-b3d6-2c430811993c/8', 'https://localhost-static.detectedx.com/images/398b0a6d-9aec-44c4-b3d6-2c430811993c/9', 'https://localhost-static.detectedx.com/images/398b0a6d-9aec-44c4-b3d6-2c430811993c/10', 'https://localhost-static.detectedx.com/images/398b0a6d-9aec-44c4-b3d6-2c430811993c/11', 'https://localhost-static.detectedx.com/images/398b0a6d-9aec-44c4-b3d6-2c430811993c/12', 'https://localhost-static.detectedx.com/images/398b0a6d-9aec-44c4-b3d6-2c430811993c/13', 'https://localhost-static.detectedx.com/images/398b0a6d-9aec-44c4-b3d6-2c430811993c/14', 'https://localhost-static.detectedx.com/images/398b0a6d-9aec-44c4-b3d6-2c430811993c/15', 'https://localhost-static.detectedx.com/images/398b0a6d-9aec-44c4-b3d6-2c430811993c/16', 'https://localhost-static.detectedx.com/images/398b0a6d-9aec-44c4-b3d6-2c430811993c/17', 'https://localhost-static.detectedx.com/images/398b0a6d-9aec-44c4-b3d6-2c430811993c/18', 'https://localhost-static.detectedx.com/images/398b0a6d-9aec-44c4-b3d6-2c430811993c/19', 'https://localhost-static.detectedx.com/images/398b0a6d-9aec-44c4-b3d6-2c430811993c/20', 'https://localhost-static.detectedx.com/images/398b0a6d-9aec-44c4-b3d6-2c430811993c/21', 'https://localhost-static.detectedx.com/images/398b0a6d-9aec-44c4-b3d6-2c430811993c/22', 'https://localhost-static.detectedx.com/images/398b0a6d-9aec-44c4-b3d6-2c430811993c/23', 'https://localhost-static.detectedx.com/images/398b0a6d-9aec-44c4-b3d6-2c430811993c/24', 'https://localhost-static.detectedx.com/images/398b0a6d-9aec-44c4-b3d6-2c430811993c/25', 'https://localhost-static.detectedx.com/images/398b0a6d-9aec-44c4-b3d6-2c430811993c/26', 'https://localhost-static.detectedx.com/images/398b0a6d-9aec-44c4-b3d6-2c430811993c/27', 'https://localhost-static.detectedx.com/images/398b0a6d-9aec-44c4-b3d6-2c430811993c/28', 'https://localhost-static.detectedx.com/images/398b0a6d-9aec-44c4-b3d6-2c430811993c/29', 'https://localhost-static.detectedx.com/images/398b0a6d-9aec-44c4-b3d6-2c430811993c/30', 'https://localhost-static.detectedx.com/images/398b0a6d-9aec-44c4-b3d6-2c430811993c/31', 'https://localhost-static.detectedx.com/images/398b0a6d-9aec-44c4-b3d6-2c430811993c/32', 'https://localhost-static.detectedx.com/images/398b0a6d-9aec-44c4-b3d6-2c430811993c/33', 'https://localhost-static.detectedx.com/images/398b0a6d-9aec-44c4-b3d6-2c430811993c/34'];

    // 16bit greyscale png
    // let ctImageIds = ['https://localhost-static.detectedx.com/images/d3c33b3f-03b2-4db6-901d-881b1ae087d4/0', 'https://localhost-static.detectedx.com/images/d3c33b3f-03b2-4db6-901d-881b1ae087d4/1', 'https://localhost-static.detectedx.com/images/d3c33b3f-03b2-4db6-901d-881b1ae087d4/2', 'https://localhost-static.detectedx.com/images/d3c33b3f-03b2-4db6-901d-881b1ae087d4/3', 'https://localhost-static.detectedx.com/images/d3c33b3f-03b2-4db6-901d-881b1ae087d4/4', 'https://localhost-static.detectedx.com/images/d3c33b3f-03b2-4db6-901d-881b1ae087d4/5', 'https://localhost-static.detectedx.com/images/d3c33b3f-03b2-4db6-901d-881b1ae087d4/6', 'https://localhost-static.detectedx.com/images/d3c33b3f-03b2-4db6-901d-881b1ae087d4/7', 'https://localhost-static.detectedx.com/images/d3c33b3f-03b2-4db6-901d-881b1ae087d4/8', 'https://localhost-static.detectedx.com/images/d3c33b3f-03b2-4db6-901d-881b1ae087d4/9', 'https://localhost-static.detectedx.com/images/d3c33b3f-03b2-4db6-901d-881b1ae087d4/10', 'https://localhost-static.detectedx.com/images/d3c33b3f-03b2-4db6-901d-881b1ae087d4/11', 'https://localhost-static.detectedx.com/images/d3c33b3f-03b2-4db6-901d-881b1ae087d4/12', 'https://localhost-static.detectedx.com/images/d3c33b3f-03b2-4db6-901d-881b1ae087d4/13', 'https://localhost-static.detectedx.com/images/d3c33b3f-03b2-4db6-901d-881b1ae087d4/14', 'https://localhost-static.detectedx.com/images/d3c33b3f-03b2-4db6-901d-881b1ae087d4/15', 'https://localhost-static.detectedx.com/images/d3c33b3f-03b2-4db6-901d-881b1ae087d4/16', 'https://localhost-static.detectedx.com/images/d3c33b3f-03b2-4db6-901d-881b1ae087d4/17', 'https://localhost-static.detectedx.com/images/d3c33b3f-03b2-4db6-901d-881b1ae087d4/18', 'https://localhost-static.detectedx.com/images/d3c33b3f-03b2-4db6-901d-881b1ae087d4/19', 'https://localhost-static.detectedx.com/images/d3c33b3f-03b2-4db6-901d-881b1ae087d4/20', 'https://localhost-static.detectedx.com/images/d3c33b3f-03b2-4db6-901d-881b1ae087d4/21', 'https://localhost-static.detectedx.com/images/d3c33b3f-03b2-4db6-901d-881b1ae087d4/22', 'https://localhost-static.detectedx.com/images/d3c33b3f-03b2-4db6-901d-881b1ae087d4/23', 'https://localhost-static.detectedx.com/images/d3c33b3f-03b2-4db6-901d-881b1ae087d4/24', 'https://localhost-static.detectedx.com/images/d3c33b3f-03b2-4db6-901d-881b1ae087d4/25', 'https://localhost-static.detectedx.com/images/d3c33b3f-03b2-4db6-901d-881b1ae087d4/26', 'https://localhost-static.detectedx.com/images/d3c33b3f-03b2-4db6-901d-881b1ae087d4/27', 'https://localhost-static.detectedx.com/images/d3c33b3f-03b2-4db6-901d-881b1ae087d4/28', 'https://localhost-static.detectedx.com/images/d3c33b3f-03b2-4db6-901d-881b1ae087d4/29', 'https://localhost-static.detectedx.com/images/d3c33b3f-03b2-4db6-901d-881b1ae087d4/30', 'https://localhost-static.detectedx.com/images/d3c33b3f-03b2-4db6-901d-881b1ae087d4/31', 'https://localhost-static.detectedx.com/images/d3c33b3f-03b2-4db6-901d-881b1ae087d4/32', 'https://localhost-static.detectedx.com/images/d3c33b3f-03b2-4db6-901d-881b1ae087d4/33', 'https://localhost-static.detectedx.com/images/d3c33b3f-03b2-4db6-901d-881b1ae087d4/34']
    let ctImageIds = ['https://localhost-static.detectedx.com/images/46373b4c-f717-42c5-99a6-2049ea52a9c6/0', 'https://localhost-static.detectedx.com/images/46373b4c-f717-42c5-99a6-2049ea52a9c6/1', 'https://localhost-static.detectedx.com/images/46373b4c-f717-42c5-99a6-2049ea52a9c6/2', 'https://localhost-static.detectedx.com/images/46373b4c-f717-42c5-99a6-2049ea52a9c6/3', 'https://localhost-static.detectedx.com/images/46373b4c-f717-42c5-99a6-2049ea52a9c6/4', 'https://localhost-static.detectedx.com/images/46373b4c-f717-42c5-99a6-2049ea52a9c6/5', 'https://localhost-static.detectedx.com/images/46373b4c-f717-42c5-99a6-2049ea52a9c6/6', 'https://localhost-static.detectedx.com/images/46373b4c-f717-42c5-99a6-2049ea52a9c6/7', 'https://localhost-static.detectedx.com/images/46373b4c-f717-42c5-99a6-2049ea52a9c6/8', 'https://localhost-static.detectedx.com/images/46373b4c-f717-42c5-99a6-2049ea52a9c6/9', 'https://localhost-static.detectedx.com/images/46373b4c-f717-42c5-99a6-2049ea52a9c6/10', 'https://localhost-static.detectedx.com/images/46373b4c-f717-42c5-99a6-2049ea52a9c6/11', 'https://localhost-static.detectedx.com/images/46373b4c-f717-42c5-99a6-2049ea52a9c6/12', 'https://localhost-static.detectedx.com/images/46373b4c-f717-42c5-99a6-2049ea52a9c6/13', 'https://localhost-static.detectedx.com/images/46373b4c-f717-42c5-99a6-2049ea52a9c6/14', 'https://localhost-static.detectedx.com/images/46373b4c-f717-42c5-99a6-2049ea52a9c6/15', 'https://localhost-static.detectedx.com/images/46373b4c-f717-42c5-99a6-2049ea52a9c6/16', 'https://localhost-static.detectedx.com/images/46373b4c-f717-42c5-99a6-2049ea52a9c6/17', 'https://localhost-static.detectedx.com/images/46373b4c-f717-42c5-99a6-2049ea52a9c6/18', 'https://localhost-static.detectedx.com/images/46373b4c-f717-42c5-99a6-2049ea52a9c6/19', 'https://localhost-static.detectedx.com/images/46373b4c-f717-42c5-99a6-2049ea52a9c6/20']

    const that = this;
    Promise.all(ctImageIds.map((v) => cornerstoneWebImageLoader.dataSetCacheManager.loadMetaData(v))).then(() => {

      const onAllPixelDataInsertedCallback = () => {
        const ctImageData = ctImageDataObject.vtkImageData;

        const range = ctImageData
          .getPointData()
          .getScalars()
          .getRange();

        const mapper = vtkVolumeMapper.newInstance();
        const ctVol = vtkVolume.newInstance();
        const rgbTransferFunction = ctVol.getProperty().getRGBTransferFunction(0);

        mapper.setInputData(ctImageData);
        mapper.setMaximumSamplesPerRay(2000);
        console.log(range)
        rgbTransferFunction.setRange(range[0], range[1]);
        ctVol.setMapper(mapper);

        that.setState({
          volumes: [ctVol],
        });
      };

      const ctImageDataObject = loadDataset(ctImageIds, 'ctDisplaySet');
      ctImageDataObject.onAllPixelDataInserted(onAllPixelDataInsertedCallback);
    });

  }

  storeApi = viewportIndex => {
    return api => {
      this.apis[viewportIndex] = api;

      const apis = this.apis;
      const renderWindow = api.genericRenderWindow.getRenderWindow();

      // Add svg widget
      api.addSVGWidget(
        vtkSVGCrosshairsWidget.newInstance(),
        'crosshairsWidget'
      );

      const istyle = vtkInteractorStyleMPRCrosshairs.newInstance();

      // add istyle
      api.setInteractorStyle({
        istyle,
        configuration: { apis, apiIndex: viewportIndex },
      });

      // set blend mode to MIP.
      const mapper = api.volumes[0].getMapper();
      if (mapper.setBlendModeToMaximumIntensity) {
        mapper.setBlendModeToMaximumIntensity();
      }

      api.setSlabThickness(0.1);

      renderWindow.render();

      // Its up to the layout manager of an app to know how many viewports are being created.
      if (apis[0] && apis[1] && apis[2]) {
        //const api = apis[0];

        const api = apis[0];

        api.svgWidgets.crosshairsWidget.resetCrosshairs(apis, 0);
      }
    };
  };

  handleSlabThicknessChange(evt) {
    const value = evt.target.value;
    const valueInMM = value / 10;
    const apis = this.apis;

    apis.forEach(api => {
      const renderWindow = api.genericRenderWindow.getRenderWindow();

      api.setSlabThickness(valueInMM);
      renderWindow.render();
    });
  }

  toggleCrosshairs = () => {
    const { displayCrosshairs } = this.state;
    const apis = this.apis;

    const shouldDisplayCrosshairs = !displayCrosshairs;

    apis.forEach(api => {
      const { svgWidgetManager, svgWidgets } = api;
      svgWidgets.crosshairsWidget.setDisplay(shouldDisplayCrosshairs);

      svgWidgetManager.render();
    });

    this.setState({ displayCrosshairs: shouldDisplayCrosshairs });
  };

  saveRenderWindow = viewportIndex => {
    return api => {
      this.apis[viewportIndex] = api;

      const apis = this.apis;

      if (viewportIndex === 1) {
        const istyle = vtkInteractorStyleMPRWindowLevel.newInstance();

        const callbacks = {
          setOnLevelsChanged: voi => {
            const { windowWidth, windowCenter } = voi;
            const levels = this.state.levels || {};

            apis.forEach(api => {
              const renderWindow = api.genericRenderWindow.getRenderWindow();

              api.updateVOI(windowWidth, windowCenter);
              renderWindow.render();
            });
            console.log(windowCenter, windowWidth);
            levels.windowCenter = windowCenter;
            levels.windowWidth = windowWidth;

            this.setState({
              levels,
            });
          },
        };

        api.setInteractorStyle({ istyle, callbacks });
      }
    };
  };

  render() {
    if (!this.state.volumes || !this.state.volumes.length) {
      return <h4>Loading...</h4>;
    }

    return (
      <>
        <div className="row">
          <div className="col-xs-4">
            <p>
              This example demonstrates how to use the Crosshairs manipulator.
            </p>
            <label htmlFor="set-slab-thickness">SlabThickness: </label>
            <input
              id="set-slab-thickness"
              type="range"
              name="points"
              min="1"
              max="5000"
              onChange={this.handleSlabThicknessChange.bind(this)}
            />
          </div>
          <div className="col-xs-4">
            <p>Click bellow to toggle crosshairs on/off.</p>
            <button onClick={this.toggleCrosshairs}>
              {this.state.displayCrosshairs
                ? 'Hide Crosshairs'
                : 'Show Crosshairs'}
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4">
            <View2D
              volumes={this.state.volumes}
              onCreated={this.saveRenderWindow(0)}
              orientation={{ sliceNormal: [0, 1, 0], viewUp: [0, 0, 1] }}
            />
          </div>
          <div className="col-sm-4">
            <View2D
              volumes={this.state.volumes}
              onCreated={this.saveRenderWindow(2)}
              orientation={{ sliceNormal: [1, 0, 0], viewUp: [0, 0, 1] }}
            />
          </div>
          <div className="col-sm-4">
            <View2D
              volumes={this.state.volumes}
              onCreated={this.saveRenderWindow(1)}
              orientation={{ sliceNormal: [0, 0, 1], viewUp: [0, -1, 0] }}
            />
          </div>
        </div>
      </>
    );
  }
}

export default VTKCrosshairsExample;
