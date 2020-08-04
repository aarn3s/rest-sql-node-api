create extension if not exists "uuid-ossp";

drop table if exists customer, person;

create table customer (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  uuid uuid DEFAULT uuid_generate_v4(),
  name VARCHAR(70) NOT NULL,
  is_active BOOLEAN NOT NULL
);

create table person (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  uuid uuid DEFAULT uuid_generate_v4(),
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  role VARCHAR(50) NOT NULL,
  is_deleted BOOLEAN NOT NULL,
  customer_id BIGINT NOT NULL
);


insert into customer (name, is_active)
  values 
  ('Pentti oy', true),
  ('Martti ry', true),
  ('Coolcompany', false),
  ('Bob', true),
  ('Daisy', false);

insert into person (first_name, last_name, role, is_deleted, customer_id)
  values
  ('Pentti', 'Marttinen', 'CEO', false, 1),
  ('Maisa', 'Marttinen', 'HR', false, 1),
  ('Bob', 'Jackson', 'Manager', true, 1),
  ('Martti', 'Silvennoinen', 'CEO', false, 2),
  ('Pena', 'Solmu', 'Manager', false, 2),
  ('Mr', 'Coolguy', 'CEO', false, 3),
  ('Jaakko', 'Soutu', 'HR', true, 3),
  ('Bob', 'Dylan', 'CEO', false, 4),
  ('Daisy', 'Morttenson', 'CEO', false, 5);

GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO aarnes;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO aarnes;
GRANT INSERT ON ALL TABLES IN SCHEMA public TO aarnes;
GRANT DELETE ON ALL TABLES IN SCHEMA public TO aarnes;
GRANT UPDATE ON ALL TABLES IN SCHEMA public TO aarnes;