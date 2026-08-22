-- Sales & Business Intelligence Platform Database Setup
-- Database: sales_bi_platform
-- Table: sales_data

CREATE DATABASE IF NOT EXISTS sales_bi_platform;
USE sales_bi_platform;

CREATE TABLE IF NOT EXISTS sales_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id VARCHAR(50) NOT NULL,
    order_date DATE NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    segment VARCHAR(100) NOT NULL,
    region VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NULL,
    sub_category VARCHAR(100) NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    discount FLOAT NOT NULL DEFAULT 0.0,
    sales FLOAT,
    profit FLOAT,
    year INT,
    month INT,
    quarter VARCHAR(10),
    profit_margin FLOAT,
    created_at DATE DEFAULT (CURDATE()),
    
    INDEX idx_order_date (order_date),
    INDEX idx_region (region),
    INDEX idx_category (category),
    INDEX idx_segment (segment),
    INDEX idx_product_name (product_name),
    INDEX idx_year (year),
    INDEX idx_month (month),
    INDEX idx_state (state),
    INDEX idx_sub_category (sub_category)
);

-- Useful Analytics Queries

-- Total Sales and Profit by Region
SELECT 
    region,
    SUM(sales) AS total_sales,
    SUM(profit) AS total_profit,
    COUNT(DISTINCT order_id) AS total_orders,
    SUM(quantity) AS total_quantity
FROM sales_data
GROUP BY region
ORDER BY total_sales DESC;

-- Monthly Sales Trend
SELECT 
    YEAR(order_date) AS year,
    MONTH(order_date) AS month,
    SUM(sales) AS monthly_sales,
    SUM(profit) AS monthly_profit
FROM sales_data
GROUP BY YEAR(order_date), MONTH(order_date)
ORDER BY year, month;

-- Top 10 Products by Sales
SELECT 
    product_name,
    SUM(sales) AS total_sales,
    SUM(profit) AS total_profit,
    COUNT(DISTINCT order_id) AS total_orders
FROM sales_data
GROUP BY product_name
ORDER BY total_sales DESC
LIMIT 10;

-- Category Performance
SELECT 
    category,
    SUM(sales) AS total_sales,
    SUM(profit) AS total_profit,
    SUM(quantity) AS total_quantity,
    (SUM(profit) / SUM(sales)) * 100 AS profit_margin
FROM sales_data
GROUP BY category
ORDER BY total_sales DESC;

-- Segment Analysis
SELECT 
    segment,
    SUM(sales) AS total_sales,
    SUM(profit) AS total_profit,
    COUNT(DISTINCT order_id) AS total_orders
FROM sales_data
GROUP BY segment
ORDER BY total_sales DESC;

-- Yearly Performance
SELECT 
    year,
    SUM(sales) AS total_sales,
    SUM(profit) AS total_profit,
    COUNT(DISTINCT order_id) AS total_orders
FROM sales_data
GROUP BY year
ORDER BY year;

-- Loss-Making Products
SELECT 
    product_name,
    SUM(sales) AS total_sales,
    SUM(profit) AS total_profit
FROM sales_data
GROUP BY product_name
HAVING SUM(profit) < 0
ORDER BY total_profit ASC;

-- Discount Impact Analysis
SELECT 
    discount,
    SUM(sales) AS total_sales,
    SUM(profit) AS total_profit,
    COUNT(DISTINCT order_id) AS total_orders
FROM sales_data
GROUP BY discount
ORDER BY discount DESC;
