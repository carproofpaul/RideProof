To install this module: 
    npm i carproof-data-apis --save

Available API calls:

Get VIN from license plate number (getVinFromLicensePlateNumber):
    params:
        1. Authentication token
        2. License plate number 
        3. Province (Abbreviation)
        4. Callback on success, returns the VIN and complete json object
        5. Callback on failure, returns error

 Get Vehicle History Report from VIN (getVehicleHistoryReportFromVin):
     params:
        1. Authentication token
        2. Vehicle Identification number
        3. Callback on success, returns a json object
        4. Callback on failure, returns error

 Get Recall History from VIN (getRecallsFromVin):
     params:
        1. Authentication token
        2. Vehicle Identification number
        3. Callback on success, returns a json object
        4. Callback on failure, returns error

 Get Valuation from VIN (getValuationFromVin):
     params:
        1. Authentication token
        2. Vehicle Identification number
        3. Callback on success, returns a json object
        4. Callback on failure, returns error