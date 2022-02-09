SELECT * FROM drby;


CREATE TABLE drby(
    id INT AUTO_INCREMENT,
    username VARCHAR(255),
    body VARCHAR(3000),
    datum VARCHAR(1000),
    PRIMARY KEY(id)
)


INSERT INTO drby(username, body, datum) VALUES("bob" , "Snědl jsem rohlík" , now());

ALTER TABLE drby
ADD COLUMN genre INT(10);