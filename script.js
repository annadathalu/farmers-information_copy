document.addEventListener("DOMContentLoaded", function () {
    const farmerNameDropdown = document.getElementById("farmerNameDropdown");
    const farmerDetails = document.getElementById("farmerDetails");
    const languageToggle = document.getElementById("languageToggle");

    // Define column name mapping for "tel" language
    const telColumnMapping = {
        "Farmer Name": "నామము",
        "Phone": "ఫోన్",
        "Current Crops": "ప్రస్తుత పంటలు",
        "Variants": "వైవిధ్యాలు",
        "Farm Size": "వ్యవసాయ పరిమాణం",
        "Quantity of produce": "ఉత్పత్తి పరిమాణం",
        "Farm Location": "వ్యవసాయ స్థానం",
        "Other Details": "ఇతర వివరాలు"
    };

    // Function to fetch data based on selected language
    function fetchData(selectedLanguage) {
        let csvFileName = "";

        if (selectedLanguage === "eng") {
            csvFileName = "Data_v2_mapped.csv";
        } else if (selectedLanguage === "tel") {
            csvFileName = "Data_v3_mapped.csv";
        }

        fetch(csvFileName)
            .then((response) => response.text())
            .then((data) => {
                const dataArray = Papa.parse(data, { header: true }).data;

                // Populate the dropdown with Farmer Names from the CSV data
                dataArray.forEach((item) => {
                    const option = document.createElement("option");
                    option.value = item[telColumnMapping["Farmer Name"]];
                    option.textContent = item[telColumnMapping["Farmer Name"]];
                    farmerNameDropdown.appendChild(option);
                });

                // Event listener for dropdown change
                farmerNameDropdown.addEventListener("change", function () {
                    const selectedFarmer = this.value;
                    const selectedData = dataArray.find(
                        (item) => item[telColumnMapping["Farmer Name"]] === selectedFarmer
                    );
                    if (selectedData) {
                        farmerDetails.innerHTML = `<p><strong>Phone:</strong> ${selectedData[telColumnMapping["Phone"]]}</p>
                                                  <p><strong>Current Crops:</strong> ${selectedData[telColumnMapping["Current Crops"]]}</p>
                                                  <p><strong>Variants:</strong> ${selectedData[telColumnMapping["Variants"]]}</p>
                                                  <p><strong>Farm Size:</strong> ${selectedData[telColumnMapping["Farm Size"]]}</p>
                                                  <p><strong>Quantity of produce:</strong> ${selectedData[telColumnMapping["Quantity of produce"]]}</p>
                                                  <p><strong>Farm Location:</strong> ${selectedData[telColumnMapping["Farm Location"]]}</p>
                                                  <p><strong>Other Details:</strong> ${selectedData[telColumnMapping["Other Details"]]}</p>`;
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
    fetchData("eng");
});
