/*
  # Fix Admin Policy Recursion

  1. Changes
    - Remove recursive policy on admins table
    - Add simplified policy using auth.email() directly
    - Update related policies for logs_admin table

  2. Security
    - Maintain RLS protection
    - Ensure only admins can access admin data
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Admins can read admin list" ON admins;
DROP POLICY IF EXISTS "Admins can read logs" ON logs_admin;
DROP POLICY IF EXISTS "Admins can insert logs" ON logs_admin;

-- Create new non-recursive policy for admins table
CREATE POLICY "Admins can read admin list"
  ON admins
  FOR SELECT
  TO authenticated
  USING (email = auth.email());

-- Update logs_admin policies
CREATE POLICY "Admins can read logs"
  ON logs_admin
  FOR SELECT
  TO authenticated
  USING (email_admin = auth.email());

CREATE POLICY "Admins can insert logs"
  ON logs_admin
  FOR INSERT
  TO authenticated
  WITH CHECK (email_admin = auth.email());