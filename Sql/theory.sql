-- order by is used to sort by salary in ascending order
SELECT * FROM Employees
ORDER BY Salary ;
-- order by is used to sort by salary in descending order
SELECT * FROM Employees order by Salary DESC ;

-- limit is used to restrict the number of rows returned
SELECT * FROM Employees order by Salary DESC LIMIT 5 ;

-- in is used to filter rows based on a list of values
SELECT * FROM Employees WHERE Department IN ('HR', 'Finance', 'IT') ;

SELECT * FROM Employees WHERE Department  not IN ('HR', 'Finance', 'IT') ;

select location, sum(salary) from salary_breakdown group by location

difference between where and having clause in sql is that where is used to filter rows before grouping whereas having is used to filter groups after grouping.

primary key is a column or a set of columns that uniquely identifies each row in a table. It must contain unique values and cannot contain NULL values. 

eg:
create table Employees (
    EmployeeID int PRIMARY KEY,
    FirstName varchar(50),
    LastName varchar(50)
);

foreign key is a column or a set of columns in one table that refers to the primary key in another table. It is used to establish and enforce a link between the data in the two tables.
eg:
create table Orders (
    OrderID int PRIMARY KEY,
    CustomerID int,
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
);  

cascade delete is a referential action related to foreign keys that automatically deletes rows in the child table when the corresponding row in the parent table is deleted.

eg:
create table Orders (
    OrderID int PRIMARY KEY,
    CustomerID int,
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID) ON DELETE CASCADE
);

types of joins in sql are:
1. INNER JOIN
2. LEFT JOIN (or LEFT OUTER JOIN)
3. RIGHT JOIN (or RIGHT OUTER JOIN)
4. FULL JOIN (or FULL OUTER JOIN)
5. CROSS JOIN
6. SELF JOIN
7. NATURAL JOIN
eg:
SELECT Employees.EmployeeName, Orders.OrderID
FROM Employees

-- inner join is used to return only the matching rows from both tables
INNER JOIN Orders ON Employees.EmployeeID = Orders.EmployeeID;
SELECT Employees.EmployeeName, Orders.OrderID
FROM Employees
--  left join is used to return all rows from the left table and the matching rows from the right table
LEFT JOIN Orders ON Employees.EmployeeID = Orders.EmployeeID;
SELECT Employees.EmployeeName, Orders.OrderID
FROM Employees
-- right join is used to return all rows from the right table and the matching rows from the left table
RIGHT JOIN Orders ON Employees.EmployeeID = Orders.EmployeeID;
SELECT Employees.EmployeeName, Orders.OrderID
FROM Employees
-- full join is used to return all rows when there is a match in either left or right table
FULL JOIN Orders ON Employees.EmployeeID = Orders.EmployeeID;
SELECT Employees.EmployeeName, Orders.OrderID
FROM Employees
-- cross join is used to return the Cartesian product of both tables
CROSS JOIN Orders;
SELECT A.EmployeeName, B.EmployeeName
FROM Employees A, Employees B
WHERE A.ManagerID = B.EmployeeID;   
SELECT * FROM Employees
NATURAL JOIN Departments;


-- subquery is a query nested inside another query
SELECT EmployeeName FROM Employees
WHERE EmployeeID IN (SELECT EmployeeID FROM Orders WHERE OrderAmount > 1000);   

--orphan record is a record in a child table that does not have a corresponding record in the parent table.
-- eg: if there is an Orders table with a foreign key referencing the Customers table, an orphan record in the Orders table would be an order that references a CustomerID that does not exist in the Customers table.