import csv

# Initialize an empty list to store the formatted data
formatted_data = []

# Open and read the CSV file
with open('Data_v2_csv.csv', mode='r', newline='', encoding='utf-8') as csv_file:
    csv_reader = csv.DictReader(csv_file)
    
    # Iterate through each row in the CSV file
    for row in csv_reader:
        # Create a dictionary for each row with the desired keys
        formatted_row = {
            "Farmer Name": row["Farmer Name"],
            "Phone": row["Phone"],
            "Current Crops": row["Current Crops"],
            "Variants": row["Variants"],
            "Farm Size": row["Farm Size"],
            "Quantity of produce": row["Quantity of produce"],
            "Farm Location": row["Farm Location"]
        }
        
        # Append the formatted row to the list
        formatted_data.append(formatted_row)

# Convert formatted_data to a string
formatted_data_str = str(formatted_data)

# Save the formatted data to 'output.txt' as a string
with open('output.txt', mode='w', encoding='utf-8') as output_file:
    output_file.write(formatted_data_str)
print(formatted_data_str)
print("Data has been saved to 'output.txt'")
