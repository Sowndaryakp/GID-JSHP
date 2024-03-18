<template>
  <div>
    <div class="flex">
   
      <button @click="showWelderForm"
        class="bg-blue-500 glassmorphic-button rounded-lg px-4 py-2 mt-2 mb-2 ml-3 text-white font-poppins flex flex-wrap">
        <img src="https://img.icons8.com/material-outlined/24/FFFFFF/add.png" alt="add" class="w-6 h-6 mr-2" />
        Add Welder
      </button>
      </div>
    <div class="container mx-auto" ref="reportContainerTable">
      <h1 class="text-2xl font-semibold my-4">Welder Data</h1>
      <table class="table-auto border-collapse w-full">
        <thead>
          <tr>
            <th v-for="(header, index) in tableHeaders" :key="index" class="px-4 py-2">{{ header }}</th>
            <th class="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in tableData" :key="index">
            <td class="border px-4 py-2">
              <span v-if="!data.isEditing">{{ data.welder_name }}</span>
              <input v-else v-model="data.welder_name" class="border border-gray-300 rounded-lg px-2 py-1 w-full text-center" disabled />
            </td>
            <td class="border px-4 py-2">
              <span v-if="!data.isEditing">{{ data.welder_number }}</span>
              <input v-else v-model="data.welder_number" class="border border-gray-300 rounded-lg px-2 py-1 w-full text-center" disabled />
            </td>
            <td class="border px-4 py-2">
              <span v-if="!data.isEditing">{{ data.date_of_joining }}</span>
              <input v-else v-model="data.date_of_joining" class="border border-gray-300 rounded-lg px-2 py-1 w-full text-center" />
            </td>
            <td class="border px-4 py-2">
              <span v-if="!data.isEditing">{{ data.welder_qualification }}</span>
              <input v-else v-model="data.welder_qualification" class="border border-gray-300 rounded-lg px-2 py-1 w-full text-center" />
            </td>
            <td class="border px-4 py-2">
              <span v-if="!data.isEditing">{{ data.qualified_thickness }}</span>
              <input v-else  v-model="data.qualified_thickness"  class="border border-gray-300 rounded-lg px-2 py-1 w-full text-center" />
            </td>
            <td class="border px-4 py-2 flex">
              <button v-if="!data.isEditing" @click="toggleEdit(index)" class="bg-blue-500 glassmorphic-button text-white px-2 py-1 rounded-lg mr-2">Edit</button>
              <button v-else @click="saveEditedWelder(index)" class="bg-green-500 glassmorphic-button text-white px-2 py-1 rounded-lg mr-2">Save</button>
              <button @click="deleteWelder(data)" class="bg-red-500 glassmorphic-button text-white font-bold py-2 px-4 rounded">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="isWelderForm" class="fixed inset-0 flex items-center justify-center z-50">
        <div class="w-96 p-4 bg-gray-100 border border-gray-300 rounded-lg shadow-md">
          <form @submit.prevent="submitWelderForm">
            <div class="mb-2">
              <label class="block text-gray-800">Welder Name:</label>
              <input v-model="welderName" type="text" id="welderName" required  class="border border-gray-300 rounded-lg px-2 py-1 w-full" placeholder="enter welder name" />
            </div>
            <div class="mb-2">
              <label class="block text-gray-800">Welder Number:</label>
              <input v-model="welderNumber" type="text" id="welderNumber" @input="validateWelderNumber" required class="border border-gray-300 rounded-lg px-2 py-1 w-full" placeholder="enter welder number"/>
              <div v-if="welderNumberError" class="text-red-600">{{ welderNumberError }}</div>
            </div>

            <!-- <div class="mb-2">
    <label class="block text-gray-800">I_no:</label>
    <input v-model="formData.I_no" required class="border border-gray-300 rounded-lg px-2 py-1 w-full" placeholder="enter welder number" />
  </div> -->


            <div class="mb-2">
              <label class="block text-gray-800">Date Of Joining:</label>
              <input v-model="dateOfJoining" type="date" id="dateOfJoining" required class="border border-gray-300 rounded-lg px-2 py-1 w-full" placeholder="enter date of joining"/>
            </div>
            <div class="mb-2">
              <label class="block text-gray-800">Welder Qualification:</label>
              <input v-model="welderQualification" type="text" id="welderQualification" required  class="border border-gray-300 rounded-lg px-2 py-1 w-full" placeholder="enter welder qualification"/>
            </div>
            <div class="mb-2">
              <label class="block text-gray-800">Qualified Thickness:</label>
              <input v-model="qualifiedThickness" type="text" id="qualifiedThickness"  @input="validateQualifiedThickness" required class="border border-gray-300 rounded-lg px-2 py-1 w-full" placeholder="enter qualified thickness"/>
              <div v-if="qualifiedThicknessError" class="text-red-600">{{ qualifiedThicknessError }}</div>
            </div>
            <!-- <div class="mb-2">
              <label class="block text-gray-800">I Number:</label>
              <input v-model="iNo" type="text" id="iNo" required  class="border border-gray-300 rounded-lg px-2 py-1 w-full" placeholder="enter I number " />
            </div>
            <div class="mb-2">
              <label class="block text-gray-800">Fc Number:</label>
              <input v-model="fcNo" type="text" id="fcNo" required  class="border border-gray-300 rounded-lg px-2 py-1 w-full" placeholder="enter Fc number" />
            </div>
            <div class="mb-2">
              <label class="block text-gray-800">Project:</label>
              <input v-model="project" type="text" id="project" required  class="border border-gray-300 rounded-lg px-2 py-1 w-full" placeholder="enter project" />
            </div> -->
            <div class="mt-2 flex justify-end">
              <button type="submit" class="bg-blue-500 text-white px-2 py-1 rounded-lg mr-2">Create</button>
              <button @click="cancelWelderForm" class="bg-gray-300 text-gray-700 px-2 py-1 rounded-lg">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <div v-if="alertMessage" class="fixed inset-0 flex items-center justify-center z-50 ">
    <div class="w-96 p-4 bg-gray-100 border text-center border-gray-300 rounded-lg shadow-md">
      <p class="text-center text-red-600">{{ alertMessage }}</p>
      <button @click="closeAlert" class="bg-blue-500 text-white px-2 py-1 rounded-lg mt-2 ">OK</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const isComponentMounted = ref(false);

const tableHeaders = ["Welder Name", "Welder Number", "Date of Joining", "Welder Qualification", "Qualified Thickness"];
const tableData = ref([]);

const isWelderForm = ref(false);
const welderName = ref('');
const welderNumber = ref('');
const dateOfJoining = ref('');
const welderQualification = ref('');
const qualifiedThickness = ref('');

const welderNumberError = ref('');

const validateWelderNumber = () => {
  const welderNumberPattern = /^\d+$/; // Regex pattern for digits only

  if (!welderNumberPattern.test(welderNumber.value)) {
    welderNumberError.value = 'Welder number must contain only digits';
  } else {
    welderNumberError.value = '';
  }
};

const qualifiedThicknessError = ref('');

const validateQualifiedThickness = () => {
  const thicknessPattern = /^\d+(\.\d+)?$/; // Regex pattern for digits (with optional decimal part)

  if (!thicknessPattern.test(qualifiedThickness.value)) {
    qualifiedThicknessError.value = 'Qualified thickness must be a valid number';
  } else {
    qualifiedThicknessError.value = '';
  }
};

const alertMessage = ref('');
const showAlert = (message) => {
  alertMessage.value = message;
};

const closeAlert = () => {
  alertMessage.value = '';
};

const showWelderForm = () => {
  isWelderForm.value = true;
}
const cancelWelderForm = () => {
  isWelderForm.value = false;
  resetWelderFormFields();
};
const resetWelderFormFields = () => {
  welderName.value = '';
  welderNumber.value = '';
  dateOfJoining.value = '';
  welderQualification.value = '';
  qualifiedThickness.value = '';
};
const submitWelderForm = async () => {
  try {
    const welderNumberValue = Number(welderNumber.value);
    const qualifiedThicknessValue = Number(qualifiedThickness.value);

    // Check if the converted values are valid numbers
    if (isNaN(welderNumberValue) || isNaN(qualifiedThicknessValue)) {
      showAlert("Welder Number and Qualified Thickness must be valid numbers.");
      return;
    }
    // Prepare the data to be sent to the backend
    const formData = {
      welder_name: welderName.value,
      welder_number: welderNumber.value,
      // date_of_joining: moment.unix(dateOfJoining.value).format('YYYY-MM-DD HH:mm'), 
      date_of_joining: dateOfJoining.value,
      welder_qualification: welderQualification.value,
      qualified_thickness: qualifiedThickness.value,
    };

    // Make the HTTP POST request to your FastAPI backend
    const response = await axios.post('http://172.18.100.240:6969/welder/', formData);

    // Handle the response as needed
    console.log('Welder created successfully:', response.data);
    alertMessage.value = `Welder ${welderName.value} created successfully`;
    // Reset form fields and hide the form
    resetWelderFormFields();
    isWelderForm.value = false;
    fetchData();
  } catch (error) {
    if (error.response && error.response.status === 400) {
      // If the server responds with a 400 Bad Request status code,
      // extract and display the error message from the response body
      const errorMessage = error.response.data.detail;
      alertMessage.value = `${errorMessage}`;
    } else if (error.response && error.response.status === 422) {
      // If the server responds with a 422 Unprocessable Entity status code,
      // extract and display the error message from the response body
      const errorMessage = error.response.data.detail;

      // Check if the error message indicates that the element already exists
      if (errorMessage.includes("Error creating welder")) {
        alertMessage.value = errorMessage;
      } else {
        // Handle other validation errors
        alertMessage.value = ` ${errorMessage}`;
      }
    } else {
      // Handle other errors
      alertMessage.value =  error.message;
    }
  }
};
onMounted(() => {
  if (!isComponentMounted.value) {
    fetchData();
    isComponentMounted.value = true;
  }
});
const fetchData = async () => {
  try {
    const response = await fetch("http://172.18.100.240:6969/welder/", {
      redirect: 'follow',
    });
    // console.log("API Response:", response);
    const result = await response.json();
    // console.log("Parsed Data:", result);
    tableData.value = result.map(data => ({ ...data, isEditing: false }));
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};



onMounted(() => {
  fetchData();
});

const toggleEdit = (index) => {
  tableData.value[index].isEditing = !tableData.value[index].isEditing;
};

const saveEditedWelder = async (index) => {
  const editedWelder = tableData.value[index];

  const postData = {
    welder_name: editedWelder.welder_name || 'N/AA',
    welder_number: editedWelder.welder_number || 'N/AA',
    date_of_joining: editedWelder.date_of_joining || 'N/AA',
    welder_qualification: editedWelder.welder_qualification || 'N/AA',
    qualified_thickness: editedWelder.qualified_thickness || 'N/AA',
  };

  try {
    const url = `http://172.18.100.240:6969/welder/${editedWelder.welder_name}?welder_number=${editedWelder.welder_number}`;
    alertMessage.value = `Welder "${editedWelder.welder_name}" Edited successfully`;
    await axios.put(url, postData);

    tableData.value[index].isEditing = false;
    fetchData(); // Add this line to refresh the table data immediately
  } catch (error) {
    console.error('Error updating the welder data:', error);
  }
};

const deleteWelder = async (welder) => {
  try {
    const url = `http://172.18.100.240:6969/welder/${welder.welder_name}?welder_number=${welder.welder_number}`;
    alertMessage.value = `Welder "${welder.welder_name}" Deleted successfully`;
    // alertMessage.innerHTML = `<span style="font-weight: bold; color: blue;">Welder "${welder.welder_name}" Deleted successfully</span>`;
    await axios.delete(url);
    //refresh 

    // tableData.value = tableData.value.filter(data => data.id !== welder.id);
    fetchData();
  } catch (error) {
    console.error('Error deleting the welder:', error);
    //
  }
};
</script>

<style scoped>
/* Add your scoped styles here */
</style>
