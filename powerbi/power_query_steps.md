# Power Query Transformation Steps

Follow these steps to clean and prepare the data in Power Query Editor after importing from MySQL.

## Step 1: Import Data

1. Open Power BI Desktop.
2. Get Data → MySQL Database.
3. Enter server `localhost` and database `sales_bi_platform`.
4. Select `sales_data` table.
5. Click **Transform Data** to open Power Query Editor.

## Step 2: Validate Data Types

1. Click the data type icon next to each column header:
   - `order_id`: Text
   - `order_date`: Date
   - `customer_name`: Text
   - `segment`: Text
   - `region`: Text
   - `state`: Text
   - `category`: Text
   - `sub_category`: Text
   - `product_name`: Text
   - `quantity`: Whole Number
   - `discount`: Decimal Number
   - `sales`: Decimal Number
   - `profit`: Decimal Number
   - `year`: Whole Number
   - `month`: Whole Number
   - `quarter`: Text
   - `profit_margin`: Decimal Number

## Step 3: Remove Unnecessary Columns

Keep only the columns needed for your reports. Suggested minimum:
- order_id, order_date, customer_name, segment, region, state, category, sub_category, product_name, quantity, discount, sales, profit, year, month, quarter

## Step 4: Handle Nulls

1. Select columns `sales` and `profit`.
2. Transform → Replace Values.
3. Replace `null` with `0`.
4. Or use: `Table.ReplaceValue(Source, null, 0, Replacer.ReplaceValue, {"sales", "profit"})`

## Step 5: Create Calculated Columns (Optional)

If you want to replicate Python-derived fields in Power Query:

**Quarter:**
```m
= Date.Quarter([order_date])
```

**Year:**
```m
= Date.Year([order_date])
```

**Month:**
```m
= Date.Month([order_date])
```

**Profit Margin:**
```m
= if [sales] > 0 then [profit] / [sales] else 0
```

## Step 6: Remove Duplicates

1. Select all columns.
2. Home → Remove Rows → Remove Duplicates.

## Step 7: Load Data

1. Click **Close & Apply**.
2. Data loads into the Power BI data model.

## Troubleshooting

- If MySQL connector fails, install MySQL ODBC driver.
- Ensure MySQL server is running and accessible.
- Verify credentials in MySQL Workbench before connecting Power BI.
