\echo 'Delete and recreate wedding_registration db?'
\prompt 'return for yes or control-C to cancel >' answer

DROP DATABASE vaccine_hub;
CREATE DATABASE vaccine_hub;
\connect vaccine_hub;

\i vaccine-hub-schema.sql
