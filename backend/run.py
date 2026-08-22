import sys
import argparse
from app.database.seed_data import DatabaseSeeder

def main():
    parser = argparse.ArgumentParser(description='Sales BI Platform Database Tool')
    parser.add_argument('command', choices=['init-db', 'inspect-data', 'test-db', 'seed-data'])
    args = parser.parse_args()
    
    seeder = DatabaseSeeder()
    
    if args.command == 'init-db':
        print("Initializing database...")
        result = seeder.initialize_database()
        print(f"Database: {result['message']}")
        
    elif args.command == 'inspect-data':
        print("Inspecting dataset...")
        profile = seeder.inspect_dataset()
        print(f"File: {profile.get('file_name')}")
        print(f"Rows: {profile.get('row_count')}")
        print(f"Columns: {profile.get('column_count')}")
        print(f"Column names: {profile.get('column_names')}")
        print(f"Missing values: {profile.get('missing_values')}")
        print(f"Duplicate rows: {profile.get('duplicate_rows')}")
        print(f"Date range: {profile.get('date_range')}")
        
    elif args.command == 'test-db':
        print("Testing database connection...")
        try:
            from sqlalchemy import text
            from app.database.connection import engine
            with engine.connect() as conn:
                conn.execute(text("SELECT 1"))
                print("Database connection: SUCCESS")
        except Exception as e:
            print(f"Database connection: FAILED - {e}")
    
    elif args.command == 'seed-data':
        print("Seeding database...")
        print("Step 1: Initializing database...")
        result = seeder.initialize_database()
        print(f"Database: {result['message']}")
        
        print("Step 2: Inspecting dataset...")
        profile = seeder.inspect_dataset()
        print(f"Rows: {profile.get('row_count')}")
        print(f"Columns: {profile.get('column_count')}")
        
        print("Step 3: Cleaning and importing data...")
        result = seeder.seed_data()
        print(f"Status: {result['status']}")
        if result['status'] == 'success':
            print(f"Records imported: {result['records_imported']}")
            print(f"Duplicates removed: {result['cleaning_summary'].get('duplicates_removed', 0)}")
            print(f"Warnings: {result['cleaning_summary'].get('warnings', [])}")
        else:
            print(f"Error: {result['message']}")

if __name__ == "__main__":
    main()
