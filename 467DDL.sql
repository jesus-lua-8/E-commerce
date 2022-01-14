DROP TABLE IF EXISTS creditCard;
DROP TABLE IF EXISTS PackList;
DROP TABLE IF EXISTS Shipping;
DROP TABLE IF EXISTS Stock;
DROP TABLE IF EXISTS "Order";
DROP TABLE IF EXISTS Customer;
DROP TABLE IF EXISTS ItemSupplier;
DROP TABLE IF EXISTS Item;
DROP TABLE IF EXISTS Supplier;
DROP TYPE IF EXISTS order_status;

CREATE TYPE order_status AS ENUM ('authorized', 'shipped');

CREATE TABLE Customer (
	customerID	INT	PRIMARY KEY,
	name		TEXT NOT NULL,
	email		TEXT NOT NULL,
	address		TEXT NOT NULL,
	phone		TEXT NOT NULL,
	city		TEXT NOT NULL,
	zipcode		TEXT NOT NULL,
	country		TEXT NOT NULL
);

CREATE TABLE Supplier (
	supplierID INT PRIMARY KEY,
	supplierName TEXT NOT NULL
);

CREATE TABLE Item (
	itemID 		INT PRIMARY KEY,
	itemName 	TEXT NOT NULL,
	itemPrice	REAL NOT NULL,
	itemWeight	REAL NOT NULL,
	itemPic		TEXT NOT NULL
);

CREATE TABLE ItemSupplier (
	itemID INT,
	supplierID INT,
	PRIMARY KEY (itemID, supplierID)
);

CREATE TABLE Stock (
	itemID		INT PRIMARY KEY REFERENCES Item(itemID) ON DELETE CASCADE,
	amount		INT NOT NULL
);

CREATE TABLE creditCard (
	customerID	INT		REFERENCES Customer(customerID) ON DELETE CASCADE,
	CCnum		INT 	NOT NULL,
	ccexpDate	INT		NOT NULL,
	PRIMARY KEY (customerID, CCnum)
);

CREATE TABLE "Order" (
	orderID		INT	PRIMARY KEY,
	customerID	INT		NOT NULL	REFERENCES Customer(customerID) ON DELETE CASCADE,
	shippingCharged REAL NOT NULL,
	handlingCharged REAL NOT NULL,
	status		order_status NOT NULL DEFAULT 'authorized',
	received_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE PackList (
	orderID		INT REFERENCES "Order"(orderID) ON DELETE CASCADE,
	itemID		INT REFERENCES Item(itemID) ON DELETE CASCADE,
	quantity	INT NOT NULL,
	isPacked BOOLEAN NOT NULL DEFAULT FALSE,
	PRIMARY KEY (orderID, itemID)
);

CREATE TABLE Shipping (
	orderID		INT	PRIMARY KEY	REFERENCES "Order"(orderID) ON DELETE CASCADE,
	shipDate	TIMESTAMP WITHOUT TIME ZONE
);
