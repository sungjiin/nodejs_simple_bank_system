CREATE database BANK;

USE BANK;


CREATE TABLE User (
  `name` varchar(20) not NULL,
  `id` varchar(20) not NULL,
  `password` varchar(20) not NULL,
  PRIMARY KEY(`id`)
);

CREATE TABLE Account (
  `accN` int(10) not NULL AUTO_INCREMENT,
  `balance` int(10) not NULL,
   `id` varchar(20) not NULL,
   PRIMARY KEY(`accN`),
   FOREIGN KEY(`id`) REFERENCES User(`id`)
);

CREATE TABLE F_trans (
  `transN` int(10) not NULL AUTO_INCREMENT,
  `userid` varchar(20) not NULL,
  `useaccN` int(10) not NULL,
  `outaccN` int(10),
   `money` int(10) not NULL,
   `trans` varchar(10) not NULL,
   `inaccN` int(10),
   `date` DATETIME DEFAULT CURRENT_TIMESTAMP,
   PRIMARY KEY(`transN`),
   FOREIGN KEY(`outaccN`) REFERENCES Account(`accN`),
   FOREIGN KEY(`inaccN`) REFERENCES Account(`accN`)
);
