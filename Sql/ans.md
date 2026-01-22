 Definition of Database Relationships 

 What are Database Relationships?

database relationship is a logical association or connection between two or more tables in a relational database. These relationships define how data in different tables relate to each other, enabling efficient data organization, retrieval, and maintenance.

### Key Concepts:

- **Foreign Key (FK)**: A column or set of columns that references the primary key of another table
- **Primary Key (PK)**: A unique identifier for each record in a table
- **Referential Integrity**: A database concept that ensures relationships between tables remain consistent
- **Normalization**: The process of organizing data to reduce redundancy through proper relationships

### Why Use Relationships?

✓ **Data Integrity**: Ensures data consistency across tables  
✓ **Reduced Redundancy**: Eliminates duplicate data storage  
✓ **Efficient Queries**: Enables joining data from multiple tables  
✓ **Maintainability**: Makes database easier to update and manage  
✓ **Performance**: Optimizes database query execution  

## Types of Relationships 

### 1. One-to-One (1:1) Relationship

#### Definition
A one-to-one relationship exists when a single record in Table A is associated with exactly one record in Table B, and vice versa.

#### Characteristics:
- Each record in the first table has only one related record in the second table
- The foreign key typically contains unique values
- Less common in database design
- Used when related data should be kept separate for security or performance reasons

#### Use Cases:
- User and User Profile
- Employee and Passport Details
- Customer and Billing Address (exclusive)

### 2. One-to-Many (1:M) Relationship

#### Definition
A one-to-many relationship exists when a single record in Table A can be associated with multiple records in Table B, but each record in Table B is associated with only one record in Table A.

#### Characteristics:
- Most common type of relationship
- The "many" side contains the foreign key
- Foreign key values can repeat
- One parent can have multiple children

#### Use Cases:
- Customer can have multiple Orders
- Author can write multiple Books
- Category can have multiple Products

### 3. Many-to-Many (M:M) Relationship

#### Definition
A many-to-many relationship exists when multiple records in Table A can be associated with multiple records in Table B.

#### Characteristics:
- Cannot be directly implemented in relational databases
- Requires a junction/bridge table (also called join table or linking table)
- Junction table contains foreign keys from both tables
- Each combination of foreign keys is unique or primary key
- More complex but provides flexibility

#### Use Cases:
- Students can enroll in multiple Courses
- Products can have multiple Tags
- Users can follow multiple Influencers


## E-commerce Examples

### Example 1: One-to-One Relationship

**Scenario**: Each customer has exactly one membership account with exclusive benefits

Table: Customer
+----------+---------+-------+
| CustomerID | Name  | Email |
+----------+---------+-------+
| 1        | Alice   | alice@gmail.com |
| 2        | Bob     | bob@gmail.com |
| 3        | Charlie | charlie@gmail.com |
+----------+---------+-------+

Table: MembershipAccount
+----------+----------+--------+----------+
| AccountID | CustomerID | Tier | JoinDate |
+----------+----------+--------+----------+
| 101      | 1        | Gold   | 2024-01 |
| 102      | 2        | Silver | 2024-02 |
| 103      | 3        | Gold   | 2024-01 |
+----------+----------+--------+----------+

Relationship: Customer (1) ← → (1) MembershipAccount
Foreign Key: MembershipAccount.CustomerID → Customer.CustomerID
Note: AccountID is UNIQUE to ensure 1:1 relationship

**Why 1:1 here?**
- Each customer has only one active membership
- Each membership belongs to exactly one customer
- Sensitive membership data is separated from basic customer info

### Example 2: One-to-Many Relationship

**Scenario**: A customer places multiple orders, but each order belongs to only one customer

Table: Customer
+----------+---------+-------+
| CustomerID | Name  | Email |
+----------+---------+-------+
| 1        | Alice   | a@... |
| 2        | Bob     | b@... |
| 3        | Charlie | c@... |
+----------+---------+-------+

Table: Order
+-------+----------+----------+--------+
| OrderID | CustomerID | Amount | Date |
+-------+----------+----------+--------+
| 1001  | 1        | $50.00   | 2024-01-15 |
| 1002  | 1        | $75.00   | 2024-01-20 |
| 1003  | 2        | $30.00   | 2024-01-18 |
| 1004  | 1        | $100.00  | 2024-02-01 |
| 1005  | 3        | $45.00   | 2024-02-05 |
+-------+----------+----------+--------+

Relationship: Customer (1) ← → (M) Order
Foreign Key: Order.CustomerID → Customer.CustomerID
Cardinality: One customer has many orders

**Why 1:M here?**
- Alice (CustomerID: 1) has 3 orders (1001, 1002, 1004)
- Bob (CustomerID: 2) has 1 order (1003)
- Each order belongs to exactly one customer
- This is the most common relationship in e-commerce

### Example 3: Many-to-Many Relationship

**Scenario A**: Products can belong to multiple categories, and categories can contain multiple products

Table: Product
+----------+----------+-------+
| ProductID | Name     | Price |
+----------+----------+-------+
| P101     | Laptop   | $999  |
| P102     | Mouse    | $25   |
| P103     | Monitor  | $299  |
+----------+----------+-------+

Table: Category
+----------+----------+
| CategoryID | Name   |
+----------+----------+
| C001     | Electronics |
| C002     | Computers   |
| C003     | Accessories |
+----------+----------+

Table: ProductCategory (Junction/Bridge Table)
+----------+----------+
| ProductID | CategoryID |
+----------+----------+
| P101     | C001     |
| P101     | C002     |
| P102     | C001     |
| P102     | C003     |
| P103     | C001     |
| P103     | C002     |
+----------+----------+

Relationship: Product (M) ← → (M) Category
Via: ProductCategory junction table
Foreign Keys:
  - ProductCategory.ProductID → Product.ProductID
  - ProductCategory.CategoryID → Category.CategoryID

**Why M:M here?**
- Laptop belongs to both "Electronics" and "Computers" categories
- Mouse belongs to both "Electronics" and "Accessories"
- Monitor belongs to both "Electronics" and "Computers"
- The "Electronics" category contains all three products
- Cannot be done with just foreign keys; needs junction table


### Example 3B: Many-to-Many Relationship

**Scenario B**: Orders can contain multiple products, and products can appear in multiple orders

Table: Order
+-------+----------+-------+
| OrderID | CustomerID | Total |
+-------+----------+-------+
| O1001 | 1        | $125  |
| O1002 | 2        | $75   |
+-------+----------+-------+

Table: Product
+-------+-------+-------+
| ProductID | Name  | Price |
+-------+-------+-------+
| Prod1 | Shirt | $20   |
| Prod2 | Pants | $40   |
| Prod3 | Shoes | $60   |
+-------+-------+-------+

Table: OrderItem (Junction Table)
+-------+-------+---------+
| OrderID | ProductID | Quantity |
+-------+-------+---------+
| O1001 | Prod1 | 2       |
| O1001 | Prod2 | 1       |
| O1002 | Prod2 | 1       |
| O1002 | Prod3 | 1       |
+-------+-------+---------+

Relationship: Order (M) ← → (M) Product
Via: OrderItem junction table

┌─────────────────────────┐          ┌──────────────────────┐
│      Customer           │          │  MembershipAccount   │
├─────────────────────────┤          ├──────────────────────┤
│ PK: CustomerID          │──────1:1─→│ PK: AccountID (UNIQUE)|
│     Name                │          │    FK: CustomerID    │
│     Email               │          │    Tier              │
└─────────────────────────┘          │    JoinDate          │
                                     └──────────────────────┘

One customer has exactly ONE membership account
One membership account belongs to exactly ONE customer

 One-to-Many Relationship

┌──────────────────────┐              ┌─────────────────────┐
│    Customer          │              │      Order          │
├──────────────────────┤              ├─────────────────────┤
│ PK: CustomerID       │─────1:M───→  │ PK: OrderID         │
│     Name             │              │ FK: CustomerID      │
│     Email            │              │     Amount          │
└──────────────────────┘              │     OrderDate       │
                                      └─────────────────────┘

One customer can have MANY orders
One order belongs to ONE customer

Example:
Customer#1 ──→ Order#1001
           ──→ Order#1002
           ──→ Order#1003


 Many-to-Many Relationship (Products & Categories)

┌──────────────────┐                  ┌──────────────────┐
│    Product       │                  │    Category      │
├──────────────────┤                  ├──────────────────┤
│ PK: ProductID    │                  │ PK: CategoryID   │
│     Name         │                  │     Name         │
│     Price        │                  └──────────────────┘
└──────────────────┘                           ▲
         ▲                                      │
         │                                      │
         └──────────────────┬──────────────────┘
                            │
                  ┌─────────────────┐
                  │ ProductCategory │
                  ├─────────────────┤
                  │ ProductID (FK)  │
                  │ CategoryID (FK) │
                  │ (Primary Key    │
                  │  = both cols)   │
                  └─────────────────┘

Many products can have MANY categories
Many categories can contain MANY products

Example:
Product: Laptop ──→ Electronics
                ──→ Computers
                
Category: Electronics ──→ Laptop
                      ──→ Mouse
                      ──→ Monitor

Many-to-Many Relationship (Orders & Products)

┌──────────────┐           ┌──────────────┐
│    Order     │           │   Product    │
├──────────────┤           ├──────────────┤
│ OrderID (PK) │           │ ProductID(PK)│
│ CustomerID   │           │ Name         │
│ Total        │           │ Price        │
└──────────────┘           └──────────────┘
         ▲                         ▲
         │                         │
         └────────────┬────────────┘
                      │
              ┌───────────────┐
              │  OrderItem    │
              ├───────────────┤
              │ OrderID(FK)   │
              │ ProductID(FK) │
              │ Quantity      │
              │ UnitPrice     │
              └───────────────┘

Many orders can have MANY products
Many products can be in MANY orders

Example:
Order#1001 ──→ Shirt (Qty: 2)
           ──→ Pants (Qty: 1)

Product: Shirt ──→ appears in Order#1001
              ──→ appears in Order#1003

### SQL Implementation: One-to-Many
CREATE TABLE Customer (
    CustomerID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(100) NOT NULL,
    Email VARCHAR(100),
    Phone VARCHAR(15)
);

CREATE TABLE Order (
    OrderID INT PRIMARY KEY AUTO_INCREMENT,
    CustomerID INT NOT NULL,
    OrderDate DATE NOT NULL,
    Amount DECIMAL(10, 2),
    FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- Insert Sample Data
INSERT INTO Customer VALUES (1, 'Alice', 'alice@email.com', '555-1234');
INSERT INTO Customer VALUES (2, 'Bob', 'bob@email.com', '555-5678');

INSERT INTO Order VALUES (101, 1, '2024-01-15', 50.00);
INSERT INTO Order VALUES (102, 1, '2024-01-20', 75.00);
INSERT INTO Order VALUES (103, 2, '2024-01-18', 30.00);

-- Query to get all orders by a customer
SELECT o.OrderID, o.OrderDate, o.Amount
FROM Order o
WHERE o.CustomerID = 1;

### SQL Implementation: Many-to-Many


CREATE TABLE Product (
    ProductID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(100) NOT NULL,
    Price DECIMAL(10, 2)
);

CREATE TABLE Category (
    CategoryID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(50) NOT NULL
);

CREATE TABLE ProductCategory (
    ProductID INT NOT NULL,
    CategoryID INT NOT NULL,
    PRIMARY KEY (ProductID, CategoryID),
    FOREIGN KEY (ProductID) REFERENCES Product(ProductID)
        ON DELETE CASCADE,
    FOREIGN KEY (CategoryID) REFERENCES Category(CategoryID)
        ON DELETE CASCADE
);

INSERT INTO Product VALUES (1, 'Laptop', 999.99);
INSERT INTO Product VALUES (2, 'Mouse', 25.99);
INSERT INTO Product VALUES (3, 'Monitor', 299.99);

INSERT INTO Category VALUES (1, 'Electronics');
INSERT INTO Category VALUES (2, 'Computers');
INSERT INTO Category VALUES (3, 'Accessories');

INSERT INTO ProductCategory VALUES (1, 1); -- Laptop → Electronics
INSERT INTO ProductCategory VALUES (1, 2); -- Laptop → Computers
INSERT INTO ProductCategory VALUES (2, 1); -- Mouse → Electronics
INSERT INTO ProductCategory VALUES (2, 3); -- Mouse → Accessories
INSERT INTO ProductCategory VALUES (3, 1); -- Monitor → Electronics
INSERT INTO ProductCategory VALUES (3, 2); -- Monitor → Computers


SELECT c.Name
FROM Category c
JOIN ProductCategory pc ON c.CategoryID = pc.CategoryID
WHERE pc.ProductID = 1;

SELECT p.Name, p.Price
FROM Product p
JOIN ProductCategory pc ON p.ProductID = pc.ProductID
WHERE pc.CategoryID = 1;

### Node.js/Express Implementation Example

class Customer {
    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.orders = []; // One-to-Many: Customer has many Orders
    }

    addOrder(order) {
        this.orders.push(order);
    }

    getOrders() {
        return this.orders;
    }
}

class Order {
    constructor(id, customerId, amount, date) {
        this.id = id;
        this.customerId = customerId;
        this.amount = amount;
        this.date = date;
        this.items = []; // Many-to-Many: Order has many OrderItems/Products
    }

    addItem(product, quantity) {
        this.items.push({ product, quantity });
    }

    getItems() {
        return this.items;
    }
}

const customer = new Customer(1, 'Alice', 'alice@email.com');
const order1 = new Order(101, 1, 125.00, '2024-01-15');
const order2 = new Order(102, 1, 85.00, '2024-01-20');

customer.addOrder(order1);
customer.addOrder(order2);

console.log(customer.getOrders()); 

## Summary Table

| Relationship | Ratio | Description | Example | Junction Table |
|---|---|---|---|---|
| **One-to-One** | 1:1 | Each record in Table A relates to exactly one record in Table B | Customer ↔ Passport | Not needed |
| **One-to-Many** | 1:M | One record in Table A can relate to many records in Table B | Customer → Orders | Not needed |
| **Many-to-Many** | M:M | Many records in Table A can relate to many records in Table B | Products ↔ Categories | Required |


✓ Always use primary keys to uniquely identify records  
✓ Use foreign keys to maintain referential integrity  
✓ Implement CASCADE rules for related data consistency  
✓ Use junction tables for many-to-many relationships  
✓ Normalize your database design to reduce redundancy  
✓ Index foreign keys for faster query performance  
✓ Document your relationships clearly in your design  
✓ Validate data before inserting to maintain integrity  

