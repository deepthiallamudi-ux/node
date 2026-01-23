1.What schema design is and what a database schema represents

 database schema is a formal, structural blueprint defining how data is organized, stored, and related within a database, covering tables, fields, and constraints.
 Database Schema Represents
Structure & Organization: It acts as the skeleton for a database, outlining table names, column names, data types, and the relationships between them.
Rules and Constraints: It defines integrity constraints (e.g., primary keys, foreign keys, constraints on data format) to govern data accuracy.
Logical vs. Physical Views:
Logical Schema: Describes the data structure (tables, relationships) and constraints, often visualized in Entity-Relationship Diagrams (ERDs).
Physical Schema: Defines how data is physically stored in storage devices, including indexes and file structures.
Blueprint for Interaction: It allows developers and administrators to understand how to query, store, and manipulate data within a DBMS. 


2.Why schema design is required before writing backend code

Schema design is required before writing backend code because it serves as the blueprint for your application's data, ensuring data integrity, performance, and scalability, while minimizing costly changes later in development


3.How poor schema design impacts data consistency, maintenance, and scalability

Poor schema design significantly impacts data consistency, maintenance, and scalability by creating vulnerabilities in data integrity, increasing operational overhead, and hindering performance as data volumes grow. 


4.What validations are in schema design and why databases enforce validations (for example: NOT NULL, UNIQUE, DEFAULT, PRIMARY KEY)

Database validations in schema design are a set of rules and constraints applied to data columns to maintain data integrity, accuracy, and consistency. Databases enforce these validations to ensure the quality of the stored information, prevent errors, and maintain the reliability of the entire system. 
Types of Schema Validations

NOT NULL
Ensures a column cannot have a NULL value.	Prevents missing essential information 
UNIQUE	
Ensures all values in a column are distinct.Prevents duplicate entries of data that should be unique 
DEFAULT
Assigns a default value to a column if no value is specified during data insertion.	Simplifies data entry and ensures a reasonable value is always present, preventing the need for manual input of common values.
PRIMARY KEY	
A column (or set of columns) that uniquely identifies each row in a table. It implicitly enforces both NOT NULL and UNIQUE.	Provides a consistent and reliable way to reference and manage individual records, which is crucial for establishing relationships between different tables.
FOREIGN KEY	
Establishes a link between data in two tables by referencing the primary key of a parent table.	Enforces referential integrity, ensuring relationships between tables remain valid and preventing "orphan" records.
CHECK	
Enforces a condition that all values in a column must satisfy.	Ensures data meets specific business rules (e.g., ensuring a price is never negative or an age is above 18).

The difference between a database schema and a database table
Why a table should represent only one entity
Why redundant or derived data should be avoided in table design
The importance of choosing correct data types while designing tables