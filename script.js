document.addEventListener("DOMContentLoaded", function () {
    const farmerNameDropdown = document.getElementById("farmerNameDropdown");
    const farmerDetails = document.getElementById("farmerDetails");
    const languageToggle = document.getElementById("languageToggle");

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
                    option.value = item["Farmer Name"];
                    option.textContent = item["Farmer Name"];
                    farmerNameDropdown.appendChild(option);
                });

                // Event listener for dropdown change
                farmerNameDropdown.addEventListener("change", function () {
                    const selectedFarmer = this.value;
                    const selectedData = dataArray.find(
                        (item) => item["Farmer Name"] === selectedFarmer
                    );
                    if (selectedData) {
                        farmerDetails.innerHTML = `<p><strong>Phone:</strong> ${selectedData["Phone"]}</p>
                                                  <p><strong>Current Crops:</strong> ${selectedData["Current Crops"]}</p>
                                                  <p><strong>Variants:</strong> ${selectedData["Variants"]}</p>
                                                  <p><strong>Farm Size:</strong> ${selectedData["Farm Size"]}</p>
                                                  <p><strong>Quantity of produce:</strong> ${selectedData["Quantity of produce"]}</p>
                                                  <p><strong>Farm Location:</strong> ${selectedData["Farm Location"]}</p>
                                                  <p><strong>Other Details:</strong> ${selectedData["Other Details"]}</p>`;
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
