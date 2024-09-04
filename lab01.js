//Q1 create sample data items for the data types 
let sensorReadings = [27.5,48.6]
let cropPhoto = "https://thumbs.dreamstime.com/b/corn-field-drone-perspective-aerial-view-cultivated-green-landscape-140491930.jpg"
let farmerNote = "The corn is growing well, with stalks reaching about six feet tall."
let gdsCoordinates = [37.7749,-122.4194]
let timestamp = new Date();


/* Q2 Store the following agricultural data types in IndexedDB: sensor readings, crop photos, farmer notes, GPS coordinates, and timestamps.
Please upload a screen of the browser IndexedDB data.*/
const dbName = "AgricultureDB"

function openDatabase(callback) {
    const request = indexedDB.open(dbName, 1);

    request.onupgradeneeded = function(event) {
        const db = event.target.result;
        db.createObjectStore("WeatherData", { keyPath: "id", autoIncrement: true });
        console.log("Database upgraded or created.");
    };

    request.onsuccess = function(event) {
        console.log("Database opened successfully.");
        callback(null, event.target.result); // Pass the database to the callback
    };

    request.onerror = function(event) {
        console.error("Error opening database:", event.target.error);
        callback(event.target.error); // Pass the error to the callback
    };
}

function createData(db, data, callback) {
    const transaction = db.transaction(["WeatherData"], "readwrite");
    const store = transaction.objectStore("WeatherData");
    const request = store.add(data);

    request.onsuccess = function(event) {
        console.log("Data added successfully.");
        callback(null, event.target.result); // Pass the ID of the added record to the callback
    };

    request.onerror = function(event) {
        console.error("Error adding data:", event.target.error);
        callback(event.target.error); // Pass the error to the callback
    };
}

openDatabase(function(error, db) {
    if (error) {
        console.error("Failed to open database:", error);
        return;
    }

    // Create various types of data
    createData(db, {
        sensorReadings : [27.5,48.6],
        cropPhoto:"https://thumbs.dreamstime.com/b/corn-field-drone-perspective-aerial-view-cultivated-green-landscape-140491930.jpg",
        farmerNote:"The corn is growing well, with stalks reaching about six feet tall.",
        gdsCoordinates : [37.7749,-122.4194],
        timestamp: new Date().toISOString()
    }, function(error, id) {
        if (error) {
            console.error("Failed to create data:", error);
            return;
        }

        console.log("Data created with ID:", id);

    });
});

/*Q3Retrieve the stored data from FarmData and log it to the browser console to confirm that the data has been saved correctly.
 Ensure that all data types (array, image, string, number, and date) 
 are accurately logged and formatted in the console. Upload a screenshot of the browser console showing the successfully retrieved data. */
 // Read data
function readData(db, id, callback) {
    const transaction = db.transaction(["WeatherData"], "readonly");
    const store = transaction.objectStore("WeatherData");
    const request = store.get(id);

    request.onsuccess = function(event) {
        console.log("Data retrieved successfully.");
        callback(null, event.target.result); // Pass the retrieved data to the callback
    };

    request.onerror = function(event) {
        console.error("Error retrieving data:", event.target.error);
        callback(event.target.error); // Pass the error to the callback
    };
}

openDatabase(function(error, db) {
    if (error) {
        console.error("Failed to open database:", error);
        return;
    }

    // Create various types of data
    createData(db, {
        sensorReadings : [27.5,48.6],
        cropPhoto:"https://thumbs.dreamstime.com/b/corn-field-drone-perspective-aerial-view-cultivated-green-landscape-140491930.jpg",
        farmerNote:"The corn is growing well, with stalks reaching about six feet tall.",
        gdsCoordinates : [37.7749,-122.4194],
        timestamp: new Date().toISOString()
    }, function(error, id) {
        if (error) {
            console.error("Failed to create data:", error);
            return;
        }

        console.log("Data created with ID:", id);

        // Retrieve the data
        readData(db, id, function(error, data) {
            if (error) {
                console.error("Failed to retrieve data:", error);
            } else {
                console.log("Retrieved data:", data);
                
                // Display the image in the console (for debugging)
                if (data.image) {
                    const img = new Image();
                    img.src = data.image;
                    document.body.appendChild(img); // Add image to the body for visualization
                    console.log("Image data:", data.image);
                }
            }
        });
    });
});

//Q4 #1 unit test  for Database Creation
function testDatabaseCreation() {
    const dbName = "AgricultureDB";
    let db;

    openDatabase(function(error, result) {
        if (error) {
            console.error("Failed to open database:", error);
            return;
        }
        db = result;
        console.log("Database created successfully.");
    });

}

testDatabaseCreation();

//Q4 #2 unit test  for Data Addition
function testDataAddition() {
    const dbName = "AgricultureDB";
    let db;

    openDatabase(function(error, result) {
        if (error) {
            console.error("Failed to open database:", error);
            return;
        }
        db = result;

        const data = {
            sensorReadings: [27.5, 48.6],
            cropPhoto: "https://thumbs.dreamstime.com/b/corn-field-drone-perspective-aerial-view-cultivated-green-landscape-140491930.jpg",
            farmerNote: "The corn is growing well, with stalks reaching about six feet tall.",
            gdsCoordinates: [37.7749, -122.4194],
            timestamp: new Date().toISOString()
        };

        createData(db, data, function(error, id) {
            if (error) {
                console.error("Failed to create data:", error);
                return;
            }

            console.log("Data added with ID:", id);
        });
    });
}

testDataAddition();

//Q4 #3 unit test for Data Retrieval
function testDataRetrieval() {
    const dbName = "AgricultureDB";
    let db;

    openDatabase(function(error, result) {
        if (error) {
            console.error("Failed to open database:", error);
            return;
        }
        db = result;

        const data = {
            sensorReadings: [27.5, 48.6],
            cropPhoto: "https://thumbs.dreamstime.com/b/corn-field-drone-perspective-aerial-view-cultivated-green-landscape-140491930.jpg",
            farmerNote: "The corn is growing well, with stalks reaching about six feet tall.",
            gdsCoordinates: [37.7749, -122.4194],
            timestamp: new Date().toISOString()
        };

        createData(db, data, function(error, id) {
            if (error) {
                console.error("Failed to create data:", error);
                return;
            }

            console.log("Data created with ID:", id);

            readData(db, id, function(error, retrievedData) {
                if (error) {
                    console.error("Failed to retrieve data:", error);
                    return;
                }

                
            });
        });
    });
}

testDataRetrieval();
//Q4 #4 unit test for Sensor Readings
function testSensorReadings() {
    const dbName = "AgricultureDB";
    let db;

    openDatabase(function(error, result) {
        if (error) {
            console.error("Failed to open database:", error);
            return;
        }
        db = result;

        const data = {
            sensorReadings: [27.5, 48.6],
            cropPhoto: "https://thumbs.dreamstime.com/b/corn-field-drone-perspective-aerial-view-cultivated-green-landscape-140491930.jpg",
            farmerNote: "The corn is growing well, with stalks reaching about six feet tall.",
            gdsCoordinates: [37.7749, -122.4194],
            timestamp: new Date().toISOString()
        };

        createData(db, data, function(error, id) {
            if (error) {
                console.error("Failed to create data:", error);
                return;
            }

            console.log("Data created with ID:", id);

            readData(db, id, function(error, retrievedData) {
                if (error) {
                    console.error("Failed to retrieve data:", error);
                    return;
                }
            });
        });
    });
}

testSensorReadings();
//Q4 #5 unit test for Verify Timestamp
function testTimestamp() {
    const dbName = "AgricultureDB";
    let db;

    openDatabase(function(error, result) {
        if (error) {
            console.error("Failed to open database:", error);
            return;
        }
        db = result;

        const data = {
            sensorReadings: [27.5, 48.6],
            cropPhoto: "https://thumbs.dreamstime.com/b/corn-field-drone-perspective-aerial-view-cultivated-green-landscape-140491930.jpg",
            farmerNote: "The corn is growing well, with stalks reaching about six feet tall.",
            gdsCoordinates: [37.7749, -122.4194],
            timestamp: new Date().toISOString()
        };

        createData(db, data, function(error, id) {
            if (error) {
                console.error("Failed to create data:", error);
                return;
            }

            console.log("Data created with ID:", id);

            readData(db, id, function(error, retrievedData) {
                if (error) {
                    console.error("Failed to retrieve data:", error);
                    return;
                }

            });
        });
    });
}

testTimestamp();