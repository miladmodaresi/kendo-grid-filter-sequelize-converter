var { Op } = require('sequelize');
module.exports = {
  "eq": Op.eq,
  "gt": Op.gt,
  "gte": Op.gte,
  "isnotnull": Op.ne,
  "isnull": "",
  "lt": Op.lt,
  "lte": Op.lte,
  "neq": Op.ne,
  "contains": Op.like,
  "doesnotcontain": Op.notLike,
  "endswith": Op.like,
  "isempty": "",
  "isnotempty": Op.ne,
  "startswith": Op.like
}