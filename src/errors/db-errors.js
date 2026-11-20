
'use strict';

// Reads PostgreSQL constraint violations.
// CHECK constraint violations are intentionally not mapped here.

const {
  UniqueConstraintError,
  ForeignKeyConstraintError,
  ExclusionConstraintError,
} = require('sequelize');

function constraintOf(error) {
  const databaseCode =
    error.parent?.code ||
    error.original?.code;

  const isConstraintError =
    error instanceof UniqueConstraintError ||
    error instanceof ForeignKeyConstraintError ||
    error instanceof ExclusionConstraintError ||
    ['23505', '23503', '23P01', '23001'].includes(databaseCode);

  if (!isConstraintError) {
    return null;
  }

  return (
    error.parent?.constraint ||
    error.original?.constraint ||
    error.constraint ||
    error.index ||
    'unknown'
  );
}

module.exports = { constraintOf };
