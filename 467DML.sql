INSERT INTO
    Customer (
        customerID,
        name,
        email,
        address,
        phone,
        city,
        zipcode,
        country
    )
VALUES
    (1, 'Harry Potter', 'Potter123@hotmail.com', '1526 Gryffindor', '530-456-7891', 'Doom City', '10365', 'Britania'),
	(2, 'Hermione Granger', 'Granger583@hotmail.com', '234 Gryffindor', '430-234-9839', 'Mountain City', '20473', 'Fishman Island'),
	(3, 'Ron Weasley', 'Weasley@hotmail.com', '913 Gryffindor', '430-256-2354', 'Gotham City', '32014', 'New York'),
	(4, 'Luna Lovegood', 'Lovegood8@hotmail.com', '1940 RavenClaw', '430-191-9981', 'Gods Plan City', '20402', 'Sky Island'),
	(5, 'Neville Longbottom', 'Longbottom6@hotmail.com', '328 Gryffindor', '230-349-1459', 'Sky City', '20987', 'England');

INSERT INTO
    Supplier (
        supplierID,
        supplierName
    )
VALUES
    (1, 'Discover'),
	(2, 'NIU'),
	(3, 'HomeDepot'),
	(4, 'Hogwarts'),
    (5, 'AutoZone');

INSERT INTO
    ItemSupplier (
        itemID,
        supplierID
    )
VALUES
    (1, 1),
    (2, 2),
    (3, 3),
    (4, 4),
    (5, 5),
    (6, 1),
    (7, 2),
    (8, 3),
    (9, 4),
    (10, 5),
    (11, 1),
    (12, 2),
    (13, 3),
    (14, 4),
    (15, 5),
    (16, 1),
    (17, 2),
    (18, 3),
    (19, 4),
    (20, 5),
    (21, 1),
    (22, 2),
    (23, 3),
    (24, 4),
    (25, 5),
    (26, 1),
    (27, 2),
    (28, 3),
    (30, 4),
    (31, 5),
    (33, 1),
    (40, 2),
    (41, 3),
    (42, 4),
    (43, 5),
    (44, 1),
    (45, 2),
    (46, 3),
    (47, 4),
    (48, 5),
    (49, 1),
    (50, 2),
    (51, 3),
    (52, 4),
    (53, 5),
    (54, 1),
    (55, 2),
    (56, 3),
    (57, 4),
    (58, 5),
    (59, 1),
    (60, 2),
    (61, 3),
    (62, 4),
    (63, 3),
    (64, 4),
    (65, 5),
    (66, 2),
    (67, 3),
    (68, 4),
    (69, 5),
    (70, 1),
    (71, 2),
    (72, 3),
    (73, 4),
    (74, 5),
    (75, 1),
    (76, 2),
    (77, 3),
    (78, 4),
    (79, 5),
    (80, 1),
    (81, 2),
    (82, 3),
    (83, 4),
    (84, 5),
    (85, 1),
    (86, 2),
    (87, 3),
    (88, 4),
    (89, 5),
    (90, 1),
    (91, 2),
    (92, 3),
    (93, 4),
    (94, 5),
    (95, 1),
    (96, 2),
    (97, 3),
    (98, 4),
    (99, 5),
    (100, 1),
    (101, 2),
    (102, 3),
    (103, 4),
    (104, 5),
    (105, 1),
    (106, 2),
    (107, 3),
    (108, 4),
    (109, 5),
    (110, 1),
    (111, 2),
    (112, 3),
    (113, 4),
    (114, 5),
    (115, 1),
    (116, 2),
    (117, 3),
    (118, 4),
    (119, 5),
    (120, 1),
    (121, 2),
    (122, 3),
    (123, 4),
    (124, 5),
    (125, 1),
    (126, 2),
    (127, 3),
    (128, 4),
    (129, 5),
    (130, 1),
    (131, 2),
    (132, 3),
    (133, 4),
    (134, 5),
    (135, 1),
    (136, 2),
    (137, 3),
    (138, 4),
    (139, 5),
    (140, 1),
    (141, 2),
    (142, 3),
    (143, 4),
    (144, 5),
    (145, 1),
    (146, 2),
    (147, 3),
    (148, 4),
    (149, 5);

INSERT INTO
    creditCard (
        CCnum,
        customerID,
        ccexpDate
    )
VALUES
    (40103290, 1, 0325),
    (40508912, 2, 0126),
    (50801234, 3, 0926),
    (74902040, 4, 0224);

INSERT INTO
    "Order" (
        orderID,
        customerID,
        shippingCharged,
        handlingCharged,
        status
    )
VALUES
    (1, 2, 5.5, 3.2, 'shipped'),
    (2, 4, 8.6, 3.2, 'authorized'),
    (3, 5, 9.25, 4.0, 'authorized');

INSERT INTO
    PackList (
        orderID,
        itemID,
        quantity,
        isPacked
    )
VALUES
    (1, 1, 1, TRUE),
    (1, 4, 1, TRUE),
    (1, 6, 1, TRUE),
    (2, 1, 3, TRUE),
    (2, 2, 1, TRUE),
    (3, 3, 1, FALSE),
    (3, 5, 1, FALSE);

INSERT INTO
    Shipping (
        orderID,
        shipDate
    )
VALUES
    (1, '2021-03-25 15:00:00'),
    (2, '2021-02-01 12:00:00'),
    (3, '2021-05-16 18:00:00');
