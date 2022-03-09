INSERT INTO users (name, email, password) VALUES ('Steve', 'wetfoodslaps@gmeow.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.') , ('Luna', 'stevesux@gmeow.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'), ('Beans', 'sloooow@tort.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');



INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active) 
VALUES (1, 'BIG Place', 'descript', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 420.69, 12, 5, 6, 'Canada', '420 Sick St', 'Fredericton', 'New Brunswick', 'E3B 1M4', TRUE), (2, 'BIGGER Place', 'descript', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 100000, 4, 67, 22, 'Canada', '789 Charlotte Street', 'Fredericton', 'New Brunswick', 'E3B 6WB', FALSE),
(1, 'CROW BARN', 'descript', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 788888, 1, 1, 1, 'Canada', '99 Tree Street', 'Fredericton', 'New Brunswick', 'E3B 7P9', TRUE);


INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES ('2018-09-11', '2018-09-26', 1, 1),
('2019-01-04', '2019-02-01', 2, 2),
('2021-10-01', '2021-10-14', 3, 3);


INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message) 
VALUES (1, 2, 3, 10, 'SUPER DOPE'), (2, 2, 2, 10, 'SUPER AIGHT'),(3, 3, 3, 1, 'SUPER SAD');