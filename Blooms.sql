create schema cucs;
use cucs;

create table blossoms (
    s_regno int, 
    s_name char(20),
     s_class char(3), 
     s_event char(20), 
     s_team char(10));

-- create table stuinfo(
-- 	s_regno varchar(5) primary key,
--     stu_name varchar(50) not null,
--     age varchar(3) not null,
--     gender varchar(10) not null,
--     course varchar(50) not null,
--     address varchar(150) not null,
--     grade varchar(3) not null); 
    
insert into blossoms values
	(2147234, 'Sudheer', 'mca', 'male', 'dancing', 'teamB');
    
select * from blossoms;