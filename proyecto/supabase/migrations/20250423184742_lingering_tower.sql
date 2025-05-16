/*
  # Create tables for job applications and quotes

  1. New Tables
    - `curriculums`
      - `id` (uuid, primary key)
      - `name` (text)
      - `phone` (text)
      - `email` (text)
      - `cv_url` (text)
      - `created_at` (timestamp)
    - `consultas`
      - `id` (uuid, primary key)
      - `name` (text)
      - `phone` (text)
      - `email` (text)
      - `message` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to insert data
*/

-- Create curriculums table
CREATE TABLE IF NOT EXISTS curriculums (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  cv_url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS for curriculums
ALTER TABLE curriculums ENABLE ROW LEVEL SECURITY;

-- Create policy for curriculums
CREATE POLICY "Anyone can insert curriculums"
  ON curriculums
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can view curriculums"
  ON curriculums
  FOR SELECT
  TO authenticated
  USING (true);

-- Create consultas table
CREATE TABLE IF NOT EXISTS consultas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS for consultas
ALTER TABLE consultas ENABLE ROW LEVEL SECURITY;

-- Create policy for consultas
CREATE POLICY "Anyone can insert consultas"
  ON consultas
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can view consultas"
  ON consultas
  FOR SELECT
  TO authenticated
  USING (true);