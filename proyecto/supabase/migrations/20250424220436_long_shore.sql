/*
  # Create admin tables and authentication setup

  1. New Tables
    - `admins`: Store admin users
    - `logs_admin`: Track admin actions
    
  2. Security
    - Enable RLS on both tables
    - Add policies for admin access
*/

-- Create admins table
CREATE TABLE IF NOT EXISTS admins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create logs_admin table
CREATE TABLE IF NOT EXISTS logs_admin (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email_admin text NOT NULL,
  accion text NOT NULL,
  timestamp timestamptz DEFAULT now(),
  FOREIGN KEY (email_admin) REFERENCES admins(email)
);

-- Enable RLS
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE logs_admin ENABLE ROW LEVEL SECURITY;

-- Policies for admins table
CREATE POLICY "Admins can read admin list"
  ON admins
  FOR SELECT
  TO authenticated
  USING (auth.email() IN (SELECT email FROM admins));

-- Policies for logs_admin table
CREATE POLICY "Admins can read logs"
  ON logs_admin
  FOR SELECT
  TO authenticated
  USING (auth.email() IN (SELECT email FROM admins));

CREATE POLICY "Admins can insert logs"
  ON logs_admin
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.email() IN (SELECT email FROM admins));