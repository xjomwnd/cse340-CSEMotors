-- Drop the role if it already exists
DROP ROLE IF EXISTS "cse340_Mwaura";

-- Create the role with the correct options
CREATE ROLE "cse340_Mwaura" WITH
  NOLOGIN
  NOSUPERUSER
  INHERIT
  CREATEDB
  NOCREATEROLE
  NOREPLICATION
  NOBYPASSRLS;