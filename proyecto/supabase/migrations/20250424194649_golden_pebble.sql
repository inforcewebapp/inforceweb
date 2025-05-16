/*
  # Add review tracking columns and triggers

  1. New Columns
    - Add `revisado` boolean column with default false to both tables
    - Add `fecha_revisado` timestamp column to both tables
  
  2. Triggers
    - Create trigger to automatically update `fecha_revisado` when `revisado` changes
    - Only update timestamp when review status changes
*/

-- Add columns to curriculums
ALTER TABLE curriculums 
ADD COLUMN IF NOT EXISTS revisado boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS fecha_revisado timestamptz;

-- Add columns to consultas
ALTER TABLE consultas 
ADD COLUMN IF NOT EXISTS revisado boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS fecha_revisado timestamptz;

-- Function to update fecha_revisado when revisado changes
CREATE OR REPLACE FUNCTION update_fecha_revisado()
RETURNS TRIGGER AS $$
BEGIN
  IF (TG_OP = 'UPDATE' AND OLD.revisado IS DISTINCT FROM NEW.revisado) THEN
    NEW.fecha_revisado = CURRENT_TIMESTAMP;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers to update fecha_revisado
CREATE TRIGGER update_curriculums_fecha_revisado
  BEFORE UPDATE ON curriculums
  FOR EACH ROW
  EXECUTE FUNCTION update_fecha_revisado();

CREATE TRIGGER update_consultas_fecha_revisado
  BEFORE UPDATE ON consultas
  FOR EACH ROW
  EXECUTE FUNCTION update_fecha_revisado();

-- Update RLS policies to allow authenticated users to update review status
CREATE POLICY "Authenticated users can update review status on curriculums"
  ON curriculums
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update review status on consultas"
  ON consultas
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);