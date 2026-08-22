-- Additional useful queries for Sales BI Platform
-- Database: sales_bi_platform

-- Overall KPIs
SELECT 
    SUM(sales) AS total_sales,
    SUM(profit) AS total_profit,
    COUNT(DISTINCT order_id) AS total_orders,
    SUM(quantity) AS total_quantity,
    AVG(sales) AS average_order_value,
    (SUM(profit) / SUM(sales)) * 100 AS profit_margin
FROM sales_data;

-- Sales by State
SELECT 
    state,
    region,
    SUM(sales) AS total_sales,
    SUM(profit) AS total_profit
FROM sales_data
GROUP BY state, region
ORDER BY total_sales DESC;

-- Sub-Category Analysis
SELECT 
    sub_category,
    category,
    SUM(sales) AS total_sales,
    SUM(profit) AS total_profit,
    SUM(quantity) AS total_quantity
FROM sales_data
GROUP BY sub_category, category
ORDER BY total_sales DESC;

-- Customer Analysis
SELECT 
    customer_name,
    COUNT(DISTINCT order_id) AS total_orders,
    SUM(sales) AS total_sales,
    SUM(profit) AS total_profit,
    SUM(quantity) AS total_quantity
FROM sales_data
GROUP BY customer_name
ORDER BY total_sales DESC
LIMIT 20;

-- Monthly Profit Analysis
SELECT 
    YEAR(order_date) AS year,
    MONTH(order_date) AS month,
    SUM(profit) AS total_profit,
    AVG(profit) AS avg_profit
FROM sales_data
GROUP BY YEAR(order_date), MONTH(order_date)
ORDER BY year, month;

-- Quarter Analysis
SELECT 
    year,
    quarter,
    SUM(sales) AS total_sales,
    SUM(profit) AS total_profit,
    COUNT(DISTINCT order_id) AS total_orders
FROM sales_data
GROUP BY year, quarter
ORDER BY year, quarter;

-- Product Profitability Ranking
SELECT 
    product_name,
    category,
    SUM(sales) AS total_sales,
    SUM(profit) AS total_profit,
    (SUM(profit) / SUM(sales)) * 100 AS profit_margin_pct
FROM sales_data
GROUP BY product_name, category
ORDER BY total_profit DESC;

-- Sales vs Profit by Discount Level
SELECT 
    discount,
    SUM(sales) AS total_sales,
    SUM(profit) AS total_profit,
    (SUM(profit) / SUM(sales)) * 100 AS profit_margin
FROM sales_data
GROUP BY discount
ORDER BY discount;

-- Regional Category Matrix
SELECT 
    region,
    category,
    SUM(sales) AS total_sales,
    SUM(profit) AS total_profit
FROM sales_data
GROUP BY region, category
ORDER BY region, total_sales DESC;
