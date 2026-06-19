-- Seed rooms if they don't exist
INSERT INTO room (id, num_beds, allow_smoking, daily_rate, cleaning_fee)
SELECT 'room_1', 2, false, 140.0, 20.0
WHERE NOT EXISTS (SELECT 1 FROM room WHERE id = 'room_1');

INSERT INTO room (id, num_beds, allow_smoking, daily_rate, cleaning_fee)
SELECT 'room_2', 4, true, 280.0, 40.0
WHERE NOT EXISTS (SELECT 1 FROM room WHERE id = 'room_2');

INSERT INTO room (id, num_beds, allow_smoking, daily_rate, cleaning_fee)
SELECT 'room_3', 6, false, 420.0, 60.0
WHERE NOT EXISTS (SELECT 1 FROM room WHERE id = 'room_3');

INSERT INTO room (id, num_beds, allow_smoking, daily_rate, cleaning_fee)
SELECT 'room_4', 8, true, 560.0, 80.0
WHERE NOT EXISTS (SELECT 1 FROM room WHERE id = 'room_4');

INSERT INTO room (id, num_beds, allow_smoking, daily_rate, cleaning_fee)
SELECT 'room_5', 10, false, 700.0, 100.0
WHERE NOT EXISTS (SELECT 1 FROM room WHERE id = 'room_5');

INSERT INTO room (id, num_beds, allow_smoking, daily_rate, cleaning_fee)
SELECT 'room_6', 12, true, 840.0, 120.0
WHERE NOT EXISTS (SELECT 1 FROM room WHERE id = 'room_6');

INSERT INTO room (id, num_beds, allow_smoking, daily_rate, cleaning_fee)
SELECT 'room_7', 14, false, 980.0, 140.0
WHERE NOT EXISTS (SELECT 1 FROM room WHERE id = 'room_7');

INSERT INTO room (id, num_beds, allow_smoking, daily_rate, cleaning_fee)
SELECT 'room_8', 16, true, 1120.0, 160.0
WHERE NOT EXISTS (SELECT 1 FROM room WHERE id = 'room_8');

INSERT INTO room (id, num_beds, allow_smoking, daily_rate, cleaning_fee)
SELECT 'room_9', 18, false, 1260.0, 180.0
WHERE NOT EXISTS (SELECT 1 FROM room WHERE id = 'room_9');
