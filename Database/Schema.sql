-- SCHEMA: Entries

CREATE SCHEMA IF NOT EXISTS "Entries"
    AUTHORIZATION postgres;

COMMENT ON SCHEMA "Entries"
    IS 'Main entry hub.';

-- TABLE: entries

CREATE TABLE IF NOT EXISTS "Entries"."entries" (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
