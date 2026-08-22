# Power BI Integration Guide

This folder contains everything needed to build a Power BI dashboard from the same MySQL data source used by this application.

## Prerequisites

- Power BI Desktop (free download from Microsoft)
- MySQL Database running with the `sales_bi_platform` database
- MySQL ODBC Driver or native connector

## Connection Steps

1. Open Power BI Desktop.
2. Click **Get Data** → **More...**
3. Select **MySQL Database** → Click **Connect**.
4. Enter:
   - Server: `localhost`
   - Database: `sales_bi_platform`
5. Authenticate using your local MySQL credentials.
6. Select the `sales_data` table.
7. Click **Load**.

## Data Model

The dataset uses a single `sales_data` table with the following columns:

| Column | Type | Description |
|--------|------|-------------|
| order_id | String | Unique order identifier |
| order_date | Date | Date of the order |
| customer_name | String | Name of the customer |
| segment | String | Customer segment (Consumer, Corporate, Home Office) |
| region | String | Sales region (Central, East, North, South, West) |
| state | String | State name |
| category | String | Product category (Furniture, Office Supplies, Technology) |
| sub_category | String | Product sub-category |
| product_name | String | Name of the product |
| quantity | Integer | Quantity sold |
| discount | Float | Discount applied (0 to 1) |
| sales | Float | Sales amount in INR |
| profit | Float | Profit amount in INR |
| year | Integer | Year extracted from order_date |
| month | Integer | Month extracted from order_date |
| quarter | String | Quarter (Q1, Q2, Q3, Q4) |
| profit_margin | Float | Profit margin percentage |

## Recommended Dashboard Pages

See `dashboard_design.md` for detailed page layouts.

## DAX Measures

See `dax_measures.md` for recommended DAX formulas.

## Power Query Steps

See `power_query_steps.md` for data transformation guidance.
