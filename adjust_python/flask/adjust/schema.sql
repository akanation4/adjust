drop table if exists user;
drop table if exists room;
drop table if exists calendar;
drop table if exists credential;

create table user (
    sub varchar(25) primary key,
    room_id int(4) zerofill
);

create table room (
    room_id int(4) zerofill primary key,
    can_join bit(1) default 1
);

create table calendar (
    sub varchar(25) primary key,
    start datetime,
    end datetime
);

create table credential (
    sub varchar(25) primary key,
    credential json
);
