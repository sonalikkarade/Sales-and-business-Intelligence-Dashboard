# Setup Guide

## Prerequisites

Install the following before starting:

- Python 3.11 or higher
- MySQL 8 or higher
- Node.js 18 or higher
- npm or yarn

## Step 1: Prepare MySQL

1. Start MySQL server.
2. Note your MySQL credentials (username and password).

## Step 2: Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
copy .env.example .env
# Edit .env with your MySQL username and password

# Test database connection
python run.py test-db

# Inspect the dataset
python run.py inspect-data

# Initialize database and import data
python run.py seed-data

# Start the backend server
uvicorn app.main:app --reload --port 8005
```

The backend will be available at `http://localhost:8005`.

## Step 3: Frontend Setup

Open a new terminal:

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:5173`.

## Step 4: Verify

1. Open http://localhost:8005/docs to verify the API is running.
2. Open http://localhost:5173 to verify the frontend is running.
3. The dashboard should load with KPIs and charts.

## Database Initialization Commands

```bash
# Inspect the dataset without modifying anything
python run.py inspect-data

# Test database connectivity
python run.py test-db

# Create database and tables, then import data
python run.py seed-data
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| DB_HOST | MySQL host | localhost |
| DB_PORT | MySQL port | 3306 |
| DB_USER | MySQL username | root |
| DB_PASSWORD | MySQL password | (empty) |
| DB_NAME | Database name | sales_bi_platform |
| BACKEND_HOST | Backend host | 0.0.0.0 |
| BACKEND_PORT | Backend port | 8005 |
| FRONTEND_URL | Frontend URL | http://localhost:5173 |
| CSV_PATH | Path to CSV dataset | ../sales_business_intelligence_dataset.csv |
