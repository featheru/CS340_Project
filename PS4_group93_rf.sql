-- CS 340: Intro To Databases -- 
-- Due Date: 02/24/22 --
-- Project Group 93 -- 
-- Russell Feathers and Jonathon Shea -- 

-- Part A: Table Creation --

-- Drop all tables on running database definition queries again
DROP TABLE IF EXISTS PriceHistory;
DROP TABLE IF EXISTS RodentsToFloors;
DROP TABLE IF EXISTS Apts;
DROP TABLE IF EXISTS Rodents;
DROP TABLE IF EXISTS AptOwners;
DROP TABLE IF EXISTS AptFloors;

-- Table creation
CREATE TABLE Rodents(
    rodentID INT(11) NOT NULL AUTO_INCREMENT, -- Changed value from previous project steps
    rodentName VARCHAR (255) NOT NULL,
    PRIMARY KEY (rodentID)
);

CREATE TABLE AptOwners(
    ownerID INT(11) NOT NULL AUTO_INCREMENT,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    ssn VARCHAR(9),
    PRIMARY KEY (ownerID)
);

CREATE TABLE Apts(
    aptNum INT(11) UNIQUE NOT NULL,
    sqFeet INT(255), -- Changed value from previous project steps
    floorNum INT NOT NULL, -- FK added in later step
    ownerID INT, -- FK added in later step
    PRIMARY KEY (aptNum)
);

CREATE TABLE PriceHistory(
    invoiceNum INT NOT NULL AUTO_INCREMENT,
    sellerID INT, -- FK added in later step
    buyerID INT, -- FK added in later step
    aptNum INT NOT NULL, -- FK added in later step
    dateSale DATE NOT NULL,
    price DOUBLE(10,2) NOT NULL, -- Changed value from previous project steps
    PRIMARY KEY (invoiceNum),
    CONSTRAINT different_owners CHECK (PriceHistory.sellerID <> PriceHistory.buyerID) -- The two owners purchasing/selling the apartment must be distinct.

);


CREATE TABLE AptFloors(
    floorNum INT(255) UNIQUE NOT NULL,
    fireExits INT(255) NOT NULL,
    PRIMARY KEY (floorNum)
);

CREATE TABLE RodentsToFloors(
    rodentID INT NOT NULL, -- FK added in later step
    floorNum INT NOT NULL, -- FK added in later step
    PRIMARY KEY (rodentID, floorNum)
);

-- Add foreign keys to all tables
ALTER TABLE Apts ADD FOREIGN KEY (ownerID) REFERENCES AptOwners (ownerID);
ALTER TABLE PriceHistory ADD FOREIGN KEY (sellerID) REFERENCES AptOwners (ownerID);
ALTER TABLE PriceHistory ADD FOREIGN KEY (buyerID) REFERENCES AptOwners (ownerID);
ALTER TABLE PriceHistory ADD FOREIGN KEY (aptNum) REFERENCES Apts (aptNum);
ALTER TABLE RodentsToFloors ADD FOREIGN KEY (rodentID) REFERENCES Rodents (rodentID) ON DELETE CASCADE;
ALTER TABLE RodentsToFloors ADD FOREIGN KEY (floorNum) REFERENCES AptFloors (floorNum) ON DELETE CASCADE;

-- Part B: Sample Data Insertion --
-- NOTES: : used to show where code insertion is --

INSERT INTO AptOwners VALUES 
(Alex,Rodriguez,666666666), (Jennifer,Lopez,333333333), (Bill,DeBlasio,999999999), (Corner,Guy,111222333), (Corporate,FatCat,232323231);

INSERT INTO Apts VALUES 
(1,666,55), (2,1113,55), (3,2009,44), (4,756,33), (5,73,11);

INSERT INTO AptFloors VALUES 
(1,3), (2, 2), (3,9), (4,9), (11,1), (33,1), (44,1), (55,1);

INSERT INTO PriceHistory VALUES 
(Alex,Rodriguez,666666666), (Jennifer,Lopez,333333333), (Bill,DeBlasio,999999999), (Imma,Bug,111222333), (Corporate,FatCat,232323231);

INSERT INTO Rodents VALUES 
(PizzaRat), (MutantRat), (NinjaRat), (Imma), (Bug);

-- Based on assumption of ID values for Rodents --
INSERT INTO RodentsToFloors VALUES 
(1,33), (1,44), (1,55), (4,11), (5,55)

-- Part C: Data Manipulation Queries --

-- Apartment Owners --

SELECT * FROM AptOwners;
SELECT * FROM AptOwners WHERE ownerID = :ownerIDInp;
SELECT * FROM AptOwners WHERE firstName LIKE "%firstNameInp%"
SELECT * FROM AptOwners WHERE lastName LIKE "%lastNameInp%"
SELECT * FROM AptOwners WHERE ssn LIKE "%ssnInp%"

INSERT INTO AptOwners (firstName, lastName, ssn)
VALUES (:firstNameInp, :lastNameInp, :ssnInp);

UPDATE AptOwners SET firstName = :firstNameInp, lastName = :lastNameInp, ssn = :ssnInp WHERE ownerID = :ownerIDInp;
DELETE FROM AptOwners WHERE ownerID =:ownerIDInp;


-- Apartments --

SELECT * FROM Apts;
SELECT * FROM Apts WHERE aptNum = :aptNumInp;
SELECT * FROM Apts WHERE sqFeet >= :sqFeetInp;
SELECT * FROM Apts WHERE floorNum = :floorNumInp;

INSERT INTO Apts (aptNum, sqFeet, floorNum, ownerID)
VALUES (:aptNumInp, :sqFeetInp, :floorNumInp, :ownerIDInp);

UPDATE Apts SET sqFeet = :sqFeetInp, floorNum = :floorNumInp WHERE aptNum = :aptNumInp;
DELETE FROM Apts WHERE aptNum = :aptNumInp;


-- Apartment Floors --

SELECT * FROM AptFloors;
SELECT * FROM AptFloors WHERE floorNum = :floorNumInp;
SELECT * FROM AptFloors WHERE fireExits >= :fireExitsInp;

INSERT INTO AptFloors (floorNum, fireExits)
VALUES (:floorNumInp, :fireExitsInp);

UPDATE AptFloors SET fireExits = :fireExitsInp WHERE floorNum = :floorNumInp;
DELETE FROM AptFloors WHERE floorNum = :floorNumInp;

-- Price History --

SELECT * FROM PriceHistory;
SELECT * FROM PriceHistory WHERE invoiceNum = :invoiceNumInp;
SELECT * FROM PriceHistory WHERE sellerID = :sellerIDInp;
SELECT * FROM PriceHistory WHERE buyerID = :buyerIDInp;
SELECT * FROM PriceHistory WHERE aptNum = :aptNumInp;
SELECT * FROM PriceHistory WHERE aptNum = :aptNumInp;
SELECT * FROM PriceHistory WHERE dateSale >= :dateSaleInp1 AND dateSale <= :dateSaleInp2 ;
SELECT * FROM PriceHistory WHERE price >= :priceInp1 AND price <= :priceInp2 ;


INSERT INTO PriceHistory (invoiceNum, sellerID, buyerID, aptNum, dateSale, price)
VALUES (:invoiceNumInp, :sellerIDInp, :buyerIDInp, :aptNumInp, :dateSaleInp, :priceInp);

UPDATE PriceHistory SET
    sellerID = :sellerIDInp,
    buyerID = :buyerIDInp,
    aptNum = :aptNumInp,
    dateSale = :dateSaleInp,
    price = :priceInp
    WHERE invoiceNum = :invoiceNumInp;
DELETE FROM AptFloors WHERE floorNum = :floorNumInp;

-- Rodents --

SELECT * FROM Rodents;
SELECT * FROM Rodents WHERE rodentID = :rodentIDInp;
SELECT * FROM Rodents WHERE rodentName LIKE "%rodentNameInp%";

INSERT INTO Rodents (rodentName)
VALUES (:rodentNameInp);

UPDATE Rodents SET rodentName = :rodentNameInp WHERE rodentID = :rodentIDInp;
DELETE FROM Rodents WHERE rodentId = :rodentIDInp;


-- Rodents To Floors --

SELECT * FROM RodentsToFloors;
SELECT * FROM RodentsToFloors WHERE rodentID = :rodentIDInp;
SELECT * FROM RodentsToFloors WHERE floorNum = :floorNumInp;

INSERT INTO RodentsToFloors (rodentID, floorNum)
VALUES (:rodentNameInp, :floorNumInp);

UPDATE RodentsToFloors SET rodentID = :rodentIDInp, floorNum = :floorNumInp WHERE rodentID = :rodentIDInp AND floorNum = :floorNumInp;
DELETE FROM RodentsToFloors WHERE rodentID = :rodentIDInp AND floorNum = :floorNumInp;

