# Data Dictionary

This document describes the columns in the `sales_data` table.

## Core Columns

| Column | Data Type | Nullable | Description |
|--------|-----------|----------|-------------|
| id | Integer | No | Auto-increment primary key |
| order_id | String(50) | No | Unique order identifier (e.g., ORD-10001) |
| order_date | Date | No | Date the order was placed (YYYY-MM-DD) |
| customer_name | String(255) | No | Name of the customer |
| segment | String(100) | No | Customer segment: Consumer, Corporate, Home Office |
| region | String(100) | No | Geographic region: Central, East, North, South, West |
| state | String(100) | No | State within India |
| category | String(100) | No | Product category: Furniture, Office Supplies, Technology |
| sub_category | String(100) | No | Product sub-category |
| product_name | String(255) | No | Full product name |
| quantity | Integer | No | Number of units sold (1-10) |
| discount | Float | No | Discount rate (0.0 to 0.2, representing 0% to 20%) |
| sales | Float | Yes | Total sales amount in INR |
| profit | Float | Yes | Profit amount in INR (negative values indicate losses) |

## Derived Columns

| Column | Data Type | Description |
|--------|-----------|-------------|
| year | Integer | Year extracted from order_date |
| month | Integer | Month number extracted from order_date |
| quarter | String | Quarter label: Q1, Q2, Q3, Q4 |
| profit_margin | Float | Profit margin percentage = (profit / sales) * 100 |

## Business Rules

- Sales and Profit may contain nulls for rows with missing data; these are filled with 0 during cleaning.
- Negative profit values represent loss-making orders.
- Discount values range from 0.0 to 0.2 (0% to 20%).
- Quantity is always a positive integer between 1 and 10.

## Indexes

The table includes indexes on: order_date, region, category, segment, product_name, year, month, state, sub_category.
