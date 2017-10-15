# Create schema/database
CREATE SCHEMA IF NOT EXISTS `echome_db`;

# Create 'messages' table
CREATE TABLE `echome_db`.`messages` (
  `messageId` INT NOT NULL AUTO_INCREMENT,
  `userId` INT NOT NULL,
  `timestamp` DATETIME NOT NULL,
  `read` TINYINT NULL,
  `body` VARCHAR(300) NOT NULL,
  PRIMARY KEY (`messageId`),
  UNIQUE INDEX `messageId_UNIQUE` (`messageId` ASC));

  