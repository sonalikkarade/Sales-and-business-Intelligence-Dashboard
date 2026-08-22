# DAX Measures

Use these DAX measures in your Power BI report. The table name is assumed to be `SalesData`.

## Basic KPIs

```dax
Total Sales = SUM(SalesData[Sales])
Total Profit = SUM(SalesData[Profit])
Total Quantity = SUM(SalesData[Quantity])
Total Orders = DISTINCTCOUNT(SalesData[Order ID])
Profit Margin = DIVIDE([Total Profit], [Total Sales], 0)
Average Order Value = DIVIDE([Total Sales], [Total Orders], 0)
Average Discount = AVERAGE(SalesData[Discount])
```

## Year-over-Year Growth

```dax
Sales PY = CALCULATE([Total Sales], SAMEPERIODLASTYEAR(SalesData[Order Date]))
Profit PY = CALCULATE([Total Profit], SAMEPERIODLASTYEAR(SalesData[Order Date]))
Sales YoY Growth = DIVIDE([Total Sales] - [Sales PY], [Sales PY], 0)
Profit YoY Growth = DIVIDE([Total Profit] - [Profit PY], [Profit PY], 0)
```

## Regional Metrics

```dax
Total Sales by Region = SUMX(VALUES(SalesData[Region]), [Total Sales])
Sales Share = DIVIDE([Total Sales], CALCULATE([Total Sales], ALL(SalesData)))
```

## Category Metrics

```dax
Sales by Category = SUMX(VALUES(SalesData[Category]), [Total Sales])
Profit by Category = SUMX(VALUES(SalesData[Category]), [Total Profit])
Category Profit Margin = DIVIDE([Profit by Category], [Sales by Category], 0)
```

## Product Metrics

```dax
Top Product = 
CALCULATE(
  [Total Sales],
  TOPN(1, VALUES(SalesData[Product Name]), [Total Sales], DESC)
)
Bottom Product = 
CALCULATE(
  [Total Sales],
  TOPN(1, VALUES(SalesData[Product Name]), [Total Sales], ASC)
)
```

## Segment Metrics

```dax
Total Sales by Segment = SUMX(VALUES(SalesData[Segment]), [Total Sales])
Segment Profit = SUMX(VALUES(SalesData[Segment]), [Total Profit])
```

## Time Intelligence

```dax
Monthly Sales = 
CALCULATE(
  [Total Sales],
  ALL(SalesData),
  VALUES(SalesData[Month])
)
Yearly Sales = 
CALCULATE(
  [Total Sales],
  ALL(SalesData),
  VALUES(SalesData[Year])
)
```

## Conditional Formatting Measures

```dax
Profit Status = 
IF([Total Profit] > 0, "Profitable", "Loss Making")
```
