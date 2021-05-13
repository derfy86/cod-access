-- Revert create_db:file_bdd from pg

BEGIN;

-- XXX Add DDLs here.
DROP TABLE exercise_theme, client_exercise, possible_answer, theme, question, exercise, kind, client, picture, responsibility;

COMMIT;
