<template>
    <q-page class="row items-stretch root">
      <div class="col relative-position">
        <slot></slot>
        <DxfViewer ref="viewer" :dxfUrl="dxfUrl" :fonts="fonts" @dxf-clicked="handleDxfClicked"
                   @dxf-loaded="_OnLoaded" @dxf-cleared="_OnCleared" @dxf-message="_OnMessage" />
      </div>
      <div class="col-auto layersCol">
        <LayersList :layers="layers" @toggleLayer="_OnToggleLayer" @toggleAll="_OnToggleAll" />
      </div>
      <div class="col-auto">
    <DataTable :uploadedFileContent="uploadedFileContent"  @handle-clicked="handleHandleClick" />
  </div>
    </q-page>
  </template>
  
  <script>
  import DxfViewer from "@/components/DxfViewer";
  import { DxfViewer as _DxfViewer } from "dxf-viewer";
  import Vue from "vue";
  import mainFont from "@/assets/fonts/Roboto-LightItalic.ttf";
  import aux1Font from "@/assets/fonts/NotoSansDisplay-SemiCondensedLightItalic.ttf";
  import aux2Font from "@/assets/fonts/HanaMinA.ttf";
  import aux3Font from "@/assets/fonts/NanumGothic-Regular.ttf";
  import LayersList from "@/components/LayersList";
  import DataTable from "@/components/DataTable";
  import axios from 'axios';
  
  export default {
    name: "ViewerPage",
    components: { LayersList, DxfViewer, DataTable },
  
    props: {
      dxfUrl: {
        type: String,
      },
    },
  
    data() {
      return {
        layers: null,
        fonts: [],
        uploadedFileContent: '', // Add a variable to hold uploaded file content
      };
    },
  
    methods: {
      _OnLoaded() {
        const layers = this.$refs.viewer.GetViewer().GetLayers();
        layers.forEach((lyr) => Vue.set(lyr, "isVisible", true));
        this.layers = layers;
        const fileInput = document.querySelector('input[type="file"]'); // Assuming you have only one file input

  if (fileInput && fileInput.files.length > 0) {
    // Get the uploaded file data
    this.uploadedFile = fileInput.files[0];
  } else {
    console.error('No file uploaded or file input not found.');
  }
  this.uploadAndParseFile();
      },
  
      _OnCleared() {
        this.layers = null;
        this.uploadedFileContent = ''; // Clear uploaded file content when cleared
      },
  
      _OnToggleLayer(layer, newState) {
        layer.isVisible = newState;
        this.$refs.viewer.GetViewer().ShowLayer(layer.name, newState);
      },
  
      _OnToggleAll(newState) {
        if (this.layers) {
          for (const layer of this.layers) {
            if (layer.isVisible !== newState) {
              this._OnToggleLayer(layer, newState);
            }
          }
        }
      },
  
      _OnMessage(e) {
        let type = "info";
        switch (e.detail.level) {
          case _DxfViewer.MessageLevel.WARN:
            type = "warning";
            break;
          case _DxfViewer.MessageLevel.ERROR:
            type = "negative";
            break;
        }
        this.$q.notify({ type, message: e.detail.message });
      },


          // Add a new function to handle file upload and send it to the backend
    async uploadAndParseFile() {
      const fileInput = document.querySelector('input[type="file"]');
      if (!fileInput || fileInput.files.length === 0) {
        console.error('No file uploaded or file input not found.');
        return;
      }

      const formData = new FormData();
      formData.append('file', fileInput.files[0]);

      try {
        // Send the file to the backend using Axios
        const response = await axios.post('http://172.18.100.240:9999/parse_dxf/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        // Log the JSON data received from the backend
        console.log('JSON Data from Backend:', response.data);

        // Assuming you want to do something with the received data, you can update the state or perform other actions here
        // For example, update the uploadedFileContent in your data
        this.uploadedFileContent = response.data;

      } catch (error) {
        console.error('Error uploading and parsing file:', error);
      }
    },
    handleHandleClick(handle) {
      // Use handle information to highlight the corresponding handle in the DxfViewer
      console.log('Handle clicked in ViewerPage:', handle);
      this.$refs.viewer.GetViewer().HighlightHandle(handle);
    },
    },
  
    created() {
      this.fonts = [mainFont, aux1Font, aux2Font, aux3Font];
    },
  };
  </script>
  
  <style scoped lang="less">
  .root {
    .layersCol {
      border-left: #DBDBDB solid 1px;
    }
  }
  </style>
  