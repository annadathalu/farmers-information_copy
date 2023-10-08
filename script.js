document.addEventListener("DOMContentLoaded", function () {
    const farmerNameDropdown = document.getElementById("farmerNameDropdown");
    const farmerDetails = document.getElementById("farmerDetails");
    const languageToggle = document.getElementById("languageToggle");

    // Function to fetch data based on selected language
    function fetchData(selectedLanguage) {
        let fileName = "";
        let columnNames = {};

        if (selectedLanguage === "eng") {
            fileName = "Data_v2_mapped.csv";
            // Define column names for English language
            columnNames = {
                farmerName: "Farmer Name",
                phone: "Phone",
                currentCrops: "Current Crops",
                variants: "Variants",
                farmSize: "Farm Size",
                produceQuantity: "Quantity of produce",
                farmLocation: "Farm Location",
                otherDetails: "Other Details",
            };
        } else if (selectedLanguage === "tel") {
            fileName = "Data_v3_mapped.xlsx";
            // Define column names for Telugu language
            columnNames = {
                farmerName: "Farmer Name",
                phone: "ఫోన్",
                currentCrops: "ప్రస్తుత పంటలు",
                variants: "వైవిధ్యాలు",
                farmSize: "వ్యవసాయ పరిమాణం",
                produceQuantity: "ఉత్పత్తి పరిమాణం",
                farmLocation: "వ్యవసాయ స్థానం",
                otherDetails: "ఇతర వివరాలు",
            };
        }

        fetch(fileName)
            .then((response) => {
                if (fileName.endsWith(".csv")) {
                    return response.text();
                } else if (fileName.endsWith(".xlsx")) {
                    return response.arrayBuffer();
                } else {
                    throw new Error("Unsupported file format");
                }
            })
            .then((data) => {
                let dataArray;
                if (fileName.endsWith(".csv")) {
                    dataArray = Papa.parse(data, { header: true }).data;
                } else if (fileName.endsWith(".xlsx")) {
                    const workbook = XLSX.read(data, { type: "array" });
                    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                    dataArray = XLSX.utils.sheet_to_json(worksheet);
                }

                // Populate the dropdown with Farmer Names from the data
                dataArray.forEach((item) => {
                    const option = document.createElement("option");
                    option.value = item[columnNames.farmerName];
                    option.textContent = item[columnNames.farmerName];
                    farmerNameDropdown.appendChild(option);
                });

                // Event listener for dropdown change
                farmerNameDropdown.addEventListener("change", function () {
                    const selectedFarmer = this.value;
                    const selectedData = dataArray.find(
                        (item) => item[columnNames.farmerName] === selectedFarmer
                    );
                    if (selectedData) {
                        farmerDetails.innerHTML = `<p><strong>${columnNames.phone}:</strong> ${selectedData[columnNames.phone]}</p>
                                                  <p><strong>${columnNames.currentCrops}:</strong> ${selectedData[columnNames.currentCrops]}</p>
                                                  <p><strong>${columnNames.variants}:</strong> ${selectedData[columnNames.variants]}</p>
                                                  <p><strong>${columnNames.farmSize}:</strong> ${selectedData[columnNames.farmSize]}</p>
                                                  <p><strong>${columnNames.produceQuantity}:</strong> ${selectedData[columnNames.produceQuantity]}</p>
                                                  <p><strong>${columnNames.farmLocation}:</strong> ${selectedData[columnNames.farmLocation]}</p>
                                                  <p><strong>${columnNames.otherDetails}:</strong> ${selectedData[columnNames.otherDetails]}</p>`;
                    } else {
                        farmerDetails.innerHTML = "";
                    }
                });
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }

    // Event listener for language toggle change
    languageToggle.addEventListener("change", function () {
        const selectedLanguage = this.value;
        farmerNameDropdown.innerHTML = ""; // Clear dropdown options
        farmerDetails.innerHTML = ""; // Clear farmer details
        fetchData(selectedLanguage);
    });

    // Initialize with default language (English)
    fetchData("tel");
});
