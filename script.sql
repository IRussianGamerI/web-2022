CREATE
DATABASE `web-2022-lab7` CHARACTER SET utf8 COLLATE utf8_general_ci;
USE
web-2022-lab7;
-- python manage.py makemigrations
-- python manage.py migrate

INSERT INTO estate_market_seller (DateSignUp, FirstName, LastName, Telephone)
VALUES ('2022-11-23 09:06:23.000000', 'Viktor Mihály', 'Orbán', '+38777885533'),
       ('2022-11-23 09:08:08.000000', 'Michael', 'de Santa', '+13285550108');

INSERT INTO estate_market_status (Name)
VALUES ('Добавлена в избранное'),
       ('Запрошены контактные данные'),
       ('Получены контактные данные'),
       ('Удалена'),
       ('Завершена');

INSERT INTO estate_market_ad (Price, Title, Description, SellerID, Address, Area, Floor, RoomNum, Balcony)
VALUES (7000000, '2к. квартира 1/9 эт.', 'Продается уютная двушка в центре Подольска', 1, 'Подольск, пр-т Ленина 150а',
        36.3, 1, 2, 0),
       (6900000, '1к. квартира 11/17 эт.', 'Продается уютная однушка с красивым видом на центр Подольска', 2,
        'Подольск, ул. Веллинга 7', 33, 11, 1, 1);