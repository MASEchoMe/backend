# Create schema/database
CREATE SCHEMA IF NOT EXISTS `echome_db`;

# Create 'users' table
CREATE TABLE `echome_db`.`users` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `token` VARCHAR(255) NULL,
  `group_id` VARCHAR(255) NULL,
  `create_date` DATETIME NULL,
  `is_active` TINYINT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC));

# Create 'messages' table
CREATE TABLE `echome_db`.`messages` (
  `message_id` INT NOT NULL AUTO_INCREMENT,
  `group_id` VARCHAR(255) NULL,
  `sender_name` VARCHAR(50),
  `recipient_name` VARCHAR(50),
  `message` MEDIUMTEXT NULL,
  `is_read` TINYINT NULL,
  `create_date` DATETIME NULL,
  `expiration_date` DATETIME NULL,
  `is_reminder` TINYINT NULL,
  `next_remind_date` DATETIME NULL,
  `reminder_frequency_id` INT NULL,
  PRIMARY KEY (`message_id`),
  UNIQUE INDEX `message_id_UNIQUE` (`message_id` ASC),
  INDEX `reminder_frequency_id_idx` (`reminder_frequency_id` ASC),
  CONSTRAINT `reminder_frequency_id`
    FOREIGN KEY (`reminder_frequency_id`)
    REFERENCES `echome_db`.`reminder_frequency` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

# Creat 'reminder_frequency' table
CREATE TABLE `echome_db`.`reminder_frequency` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `frequency` INT NULL,
  `is_active` TINYINT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));
