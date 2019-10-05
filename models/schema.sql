create database bucket_besties_db;

use bucket_besties_db;

create table users(
id int auto_increment,
firstName varchar(100) not null,
lastName varchar(100) not null,
userName varchar(100) not null,
email varchar(50) not null,
lat decimal(5,3) not null,
lon decimal(5,3) not null,
surveyQ1 int not null,
surveyQ2 int not null,
surveyQ3 int not null,
surveyQ4 int not null,
surveyQ5 int not null,
primary key(id)
);

create table activities(
id int auto_increment,
activityDescription varchar(100) not null,
category varchar(50) not null,
primary key(id)
);

create table bridge(
userID int not null,
activityID int not null,
completeByDate date,
completed boolean default false,
foreign key (userID) references users(id),
foreign key (activityID) references activities(id)
);

