create database if not exists bs_sisadesc;
use sisadesc;
create table user(
    id int(11) not null auto_increment,
    firstname varchar() not null,
    lastnamepaternal varchar(20) not null,
    lastnamematernal varchar(20) not null,
    curp varchar(20) not null,
    rfc varchar(20) not null,
    direction varchar(20) not null,
)
