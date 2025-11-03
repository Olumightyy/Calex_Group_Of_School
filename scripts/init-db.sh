#!/bin/bash

# This script initializes the Supabase database with the school management schema
# Run this after setting up your Supabase project

echo "Initializing School Management System Database..."

# The SQL schema is in scripts/001_create_tables.sql
# You can run it directly in the Supabase SQL editor or use the Supabase CLI

echo "To initialize the database:"
echo "1. Go to your Supabase project dashboard"
echo "2. Navigate to the SQL Editor"
echo "3. Create a new query and paste the contents of scripts/001_create_tables.sql"
echo "4. Click 'Run' to execute the schema"
echo ""
echo "Alternatively, use the Supabase CLI:"
echo "supabase db push"
