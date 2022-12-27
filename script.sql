CREATE
DATABASE `web-2022-lab7` CHARACTER SET utf8 COLLATE utf8_general_ci;
USE
web-2022-lab7;
-- python manage.py makemigrations
-- python manage.py migrate

INSERT INTO estate_market_seller (DateSignUp, FirstName, LastName, Telephone)
VALUES ('2022-11-23 09:06:23.000000', 'Viktor Mihály', 'Orbán', '+38777885533'),
       ('2022-11-23 09:08:08.000000', 'Michael', 'de Santa', '+13285550108');

INSERT INTO estate_market_type (Name, NumBedrooms)
VALUES ('Двухкомнатная', 2),
       ('Однокомнатная', 1);

INSERT INTO estate_market_flat (Area, Address, Floor, Balcony, YearBuilt, BuildTech, TypeID)
VALUES (36.3, 'Подольск, пр-т Ленина 150а', 1, 0, 1964, 'Кирпич', 1),
       (33, 'Подольск, ул. Веллинга 7', 11, 1, 2008, 'Панель', 2);

INSERT INTO estate_market_ad (Status, CreationDate, FlatID, SellerID, Description, Title, Price, CustomerID, SaleDate,
                              Photo)
VALUES ('Active', '2022-11-23 09:11:50.000000', 1, 1, 'Продается уютная двушка в центре Подольска',
        '2к. квартира 1/9 эт.', 7000000, NULL, NULL, '1.jpg'),
       ('Active', '2022-11-01 09:13:42.000000', 2, 2, 'Продается уютная однушка с красивым видом на центр Подольска',
        '1к. квартира 11/17 эт.', 6900000, NULL, NULL, '2.jpg');