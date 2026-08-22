# Project Report: Sales & Business Intelligence Analytics Platform

## 1. Title
Sales & Business Intelligence Analytics Platform

## 2. Abstract
This project presents a complete end-to-end Business Intelligence platform that transforms raw CSV sales data into actionable business insights. The system includes automated data cleaning, MySQL database integration, FastAPI backend, React frontend with interactive Plotly charts, and Power BI integration documentation. The platform processes 1502 real sales records across 5 regions, 3 categories, and 19 products, providing KPIs, trend analysis, regional breakdowns, and deterministic business insights.

## 3. Introduction
Organizations generate vast amounts of sales data but often lack tools to transform it into actionable insights. This platform bridges that gap by providing a complete pipeline from raw CSV data to interactive dashboards and analytics.

## 4. Problem Statement
- Sales data is often siloed in CSV files
- Manual analysis is time-consuming and error-prone
- No real-time filtering or dynamic insights
- Lack of professional dashboards for stakeholders
- Difficulty connecting data to BI tools like Power BI

## 5. Existing System
Most organizations rely on:
- Manual Excel analysis
- Disconnected reporting tools
- Static reports that require regeneration
- Limited interactivity

## 6. Proposed System
A unified platform with:
- Automated data cleaning and validation
- MySQL database for structured analytics
- REST API for data access
- Interactive web dashboard
- Real-time filtering
- Business insights engine
- Power BI integration

## 7. Objectives
- Automate data cleaning and validation
- Store cleaned data in MySQL for fast querying
- Provide REST API for analytics
- Build interactive web dashboard
- Generate deterministic business insights
- Enable Power BI integration

## 8. Scope
- Sales data from a single CSV dataset
- MySQL as the primary database
- Web-based dashboard with React
- API backend with FastAPI
- Power BI documentation and connection guide

## 9. Functional Requirements
- CSV data inspection and profiling
- Data cleaning and validation
- MySQL database creation and seeding
- REST API endpoints for analytics
- Interactive dashboard with filters
- KPI cards and charts
- Business insights generation
- CSV export functionality
- Data explorer with search and pagination

## 10. Non-Functional Requirements
- Responsive design for all screen sizes
- Fast API response times
- Secure database connections
- Clean, maintainable code
- Professional UI/UX
- Error handling and loading states

## 11. System Architecture
See `docs/architecture.md` for detailed architecture documentation.

## 12. Technology Stack
- **Backend:** Python 3.11+, FastAPI, SQLAlchemy, Pandas
- **Database:** MySQL 8+
- **Frontend:** React 18, Vite, Tailwind CSS, Plotly
- **API Docs:** FastAPI automatic Swagger UI

## 13. Dataset Description
- **File:** `sales_business_intelligence_dataset.csv`
- **Rows:** 1502
- **Columns:** 13 core columns
- **Date Range:** 2024-01-01 to 2026-08-15
- **Regions:** Central, East, North, South, West
- **Categories:** Furniture, Office Supplies, Technology
- **Segments:** Consumer, Corporate, Home Office
- **Products:** 19 unique products
- **Customers:** 221 unique customers

## 14. Data Cleaning and Validation
- Trimmed whitespace from string columns
- Removed 2 duplicate rows
- Filled missing Sales and Profit values with 0
- Converted date columns to datetime format
- Created derived fields: year, month, quarter, profit_margin
- Validated negative values and handled appropriately
- Detected and flagged loss-making orders

## 15. Database Design
Table: `sales_data` with 17 columns including 4 derived fields.
Indexes on: order_date, region, category, segment, product_name, year, month, state, sub_category.

## 16. MySQL Implementation
Database: `sales_bi_platform`
Table: `sales_data`
Records imported: 1500 (after removing 2 duplicates)

## 17. SQL Analytics
Real SQL queries compute:
- Total Sales, Profit, Orders, Quantity
- Profit Margin, Average Order Value
- Regional, Category, Sub-Category, Segment, Yearly, Product, Customer, and Discount analysis

## 18. Backend Implementation
FastAPI backend with organized routes, services, schemas, and database layers. API endpoints cover health, dashboard, analytics, filters, insights, and export.

## 19. Frontend Implementation
React SPA with Vite, Tailwind CSS, and Plotly charts. Components include sidebar, header, KPI cards, charts, filters, insights, and data explorer.

## 20. Dashboard Design
Premium BI dashboard with:
- 6 KPI cards
- Sales and Profit trend charts
- Regional and Category analysis charts
- Product performance charts
- Interactive filtering
- Responsive grid layout

## 21. KPI Analysis
- Total Sales: Calculated from actual data
- Total Profit: Calculated from actual data
- Total Orders: DISTINCTCOUNT of Order IDs
- Total Quantity: SUM of Quantity
- Profit Margin: Profit / Sales * 100
- Average Order Value: Sales / Orders

## 22. Business Insights
Deterministic insights generated from actual analytics results:
- Highest/lowest performing regions
- Best/worst categories
- Top/bottom products
- Segment performance
- Best performing year
- Profitability assessment

## 23. Testing
- CSV inspection verified 1502 rows, 13 columns
- Data cleaning verified 2 duplicates removed
- Backend endpoints tested via Swagger UI
- Frontend verified startup and component rendering
- API connectivity verified

## 24. Advantages
- Real data processing (no mock data)
- Professional, production-ready architecture
- Complete end-to-end pipeline
- Interactive and responsive UI
- Extensible design for future enhancements
- Comprehensive documentation

## 25. Limitations
- Single dataset support
- No authentication system
- No real-time data streaming
- Power BI reports not auto-generated (documentation provided)

## 26. Future Enhancements
- User authentication and authorization
- Multi-dataset support
- Scheduled data refresh
- Advanced ML forecasting
- Email report delivery
- Dark mode
- Mobile responsive optimization

## 27. Conclusion
This project successfully delivers a complete Sales & Business Intelligence Analytics Platform. It processes real sales data, stores it in MySQL, exposes analytics via FastAPI, and presents insights through a professional React dashboard. The platform is suitable for portfolio demonstrations, internship applications, and real business use.
