document.addEventListener("DOMContentLoaded", function () {
    const farmerNameDropdown = document.getElementById("farmerNameDropdown");
    const farmerDetails = document.getElementById("farmerDetails");
    const languageToggle = document.getElementById("languageToggle");

    // Function to fetch data based on selected language
    function fetchData(selectedLanguage) {
        // Define a function to fetch data from a file
        function fetchDataFromFile(fileName) {
            return fetch(fileName)
                .then((response) => {
                    if (fileName.endsWith(".csv")) {
                        return response.text();
                    } else if (fileName.endsWith(".xlsx")) {
                        return response.arrayBuffer();
                    } else {
                        throw new Error("Unsupported file format");
                    }
                });
        }

        let englishDataPromise = fetchDataFromFile("Data_v2_mapped.csv");
        let teluguDataPromise = fetchDataFromFile("Data_v3_mapped.xlsx");

        Promise.all([englishDataPromise, teluguDataPromise])
            .then(([englishData, teluguData]) => {
                let dataArray;
                if (selectedLanguage === "eng") {
                    dataArray = Papa.parse(englishData, { header: true }).data;
                } else if (selectedLanguage === "tel") {
                    const workbook = XLSX.read(teluguData, { type: "array" });
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

    // Initialize with default language (Telugu)
    fetchData("tel");
});
