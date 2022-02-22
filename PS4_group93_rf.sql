-- CS 340: Intro To Databases -- 
-- Due Date: 02/24/22 --
-- Project Group 93 -- 
-- Russell Feathers and Jonathon Shea -- 

-- Part A: Table Creation --

-- Part A: Sample Data Insertion --
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

-- Part B: Data Manipulation Queries --

-- Apartment Owners --

SELECT * FROM AptOwners;
SELECT * FROM AptOwners WHERE ownerID = :ownerIDInp;
SELECT * FROM AptOwners WHERE firstName LIKE "%firstNameInp%"
SELECT * FROM AptOwners WHERE lastName LIKE "%lastNameInp%"
SELECT * FROM AptOwners WHERE ssn LIKE "%ssnInp%"

INSERT INTO AptOwners (firstName, lastName, ssn)
VALUES (:firstNameInp, :lastNameInp, :ssnInp);

-- Apartments --

SELECT * FROM Apts;
SELECT * FROM Apts WHERE aptNum = :aptNumInp;
SELECT * FROM Apts WHERE sqFeet >= :sqFeetInp;
SELECT * FROM Apts WHERE floorNum = :floorNumInp;

INSERT INTO Apts (aptNum, sqFeet, floorNum, ownerID)
VALUES (:aptNumInp, :sqFeetInp, :floorNumInp, :ownerIDInp);

-- Apartment Floors --

SELECT * FROM AptFloors;
SELECT * FROM AptFloors WHERE floorNum = :floorNumInp;
SELECT * FROM AptFloors WHERE fireExits >= :fireExitsInp;

INSERT INTO AptFloors (floorNum, fireExits)
VALUES (:floorNumInp, :fireExitsInp);

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

-- Rodents --

SELECT * FROM Rodents;
SELECT * FROM Rodents WHERE rodentID = :rodentIDInp;
SELECT * FROM Rodents WHERE rodentName LIKE "%rodentNameInp%";

INSERT INTO Rodents (rodentName)
VALUES (:rodentNameInp);

-- Rodents To Floors --

SELECT * FROM RodentsToFloors;
SELECT * FROM RodentsToFloors WHERE rodentID = :rodentIDInp;
SELECT * FROM RodentsToFloors WHERE floorNum = :floorNumInp;

INSERT INTO RodentsToFloors (rodentID, floorNum)
VALUES (:rodentNameInp, :floorNumInp);

