---ER diagram in SQL means that the database schema is designed based on an Entity-Relationship (ER) model. An ER diagram visually represents the entities (tables), their attributes (columns), and the relationships between them. In SQL, this translates to creating tables with appropriate columns, data types, primary keys, foreign keys, and constraints to enforce the relationships defined in the ER diagram.

normalization in sql is the process of organizing the columns (attributes) and tables (relations) of a database to reduce data redundancy and improve data integrity. The main goals of normalization are to eliminate redundant data, ensure data dependencies make sense, and simplify the database structure.
The common normal forms are:
1. First Normal Form (1NF): Ensures that the table has no repeating groups or arrays. Each column must contain atomic values, and each record must be unique.
2. Second Normal Form (2NF): Achieved when the table is in 1NF and all non-key attributes are fully functionally dependent on the primary key. This means that there should be no partial dependency of any column on the primary key.
3. Third Normal Form (3NF): Achieved when the table is in 2NF and all the attributes are functionally dependent only on the primary key. This means that there should be no transitive dependency for non-prime attributes.

schema in sql refers to the structure or organization of a database, including the tables, columns, data types, relationships, and constraints that define how data is stored and accessed within the database. A schema serves as a blueprint for the database, outlining how data is organized and how different entities relate to one another.  
Tupples in sql are rows in a table that represent a single record or data item. Each tuple consists of multiple attributes (columns) that hold specific values for that record. For example, in a table named "Employees," each row (tuple) would contain information about an individual employee, such as their ID, name, and department.

attributes


-- /creating schema for user management system
create schema user_mnagnt;
-- /creating  reusable domains for user attributes    
create domain user_mnagnt.valid_name as text;
create domain user_mnagnt.valid_age as int;
create domain user_mnagnt.valid_mobile as text;

-- /creating user table with constraints
create table user_mnagnt.users(
  id bigserial primary key,
  name user_mnagnt.valid_name not null,
   age user_mnagnt.valid_age not null,
    mobile user_mnagnt.valid_mobile not null,
    email text,
    password text
)
-- /creating trigger function to validate user data before insert

create or replace function user_mnagnt.users_insert_trigger()
return trigger as $$
begin
if New.name is null or length(new.name)=0 then
raise exception 'name cant be empty!';
end if;  

