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