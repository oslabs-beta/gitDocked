CREATE TABLE users (
    authToken VARCHAR(255) PRIMARY KEY NOT NULL
);

CREATE TABLE containers (
    containerName VARCHAR(255),
    containerID VARCHAR(255) PRIMARY KEY NOT NULL,
    timestamp TIMESTAMP DEFAULT NOW(),
    numDataPoints INTEGER,
    avgCPUPerc DECIMAL, 
    minCPUPerc DECIMAL,
    maxCPUPerc DECIMAL,
    avgMemUsage DECIMAL,
    minMemUsage DECIMAL,
    maxMemUsage DECIMAL,
    avgMemPerc DECIMAL,
    minMemPerc DECIMAL,
    maxMemPerc DECIMAL,
    avgNetIO DECIMAL,
    minNetIO DECIMAL,
    maxNetIO DECIMAL,
    avgBlockIO DECIMAL,
    minBlockIO DECIMAL,
    maxBlockIO DECIMAL
);