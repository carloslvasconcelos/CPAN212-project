import Match from "./models/match.model.js";

export const getAllMatches = async (filters = {}, options = {}) => {
  const { year, stage, sort, page = 1, limit = 10 } = options;

  const query = {};
  if (year) query.year = year;
  if (stage) query.stage = new RegExp(stage, "i");

  const skip = (page - 1) * limit;
  const sortOption = sort ? { [sort]: 1 } : {};

  return await Match.find(query)
    .sort(sortOption)
    .skip(skip)
    .limit(limit);
};

export const getMatchById = async (id) => {
  return await Match.findById(id);
};

export const addMatch = async (data) => {
  return await Match.create(data);
};

export const updateMatch = async (id, data) => {
  return await Match.findByIdAndUpdate(id, data, { new: true });
};

export const deleteMatch = async (id) => {
  return await Match.findByIdAndDelete(id);
};
