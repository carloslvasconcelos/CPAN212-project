import Team from "./models/team.model.js";

export const getAllTeams = async (filters = {}, options = {}) => {
  const { name, sort, page = 1, limit = 10 } = options;

  const query = {};
  if (name) query.name = new RegExp(name, "i");

  const skip = (page - 1) * limit;
  const sortOption = sort ? { [sort]: 1 } : {};

  return await Team.find(query)
    .sort(sortOption)
    .skip(skip)
    .limit(limit);
};

export const getTeamById = async (id) => {
  return await Team.findById(id);
};

export const addTeam = async (data) => {
  return await Team.create(data);
};

export const updateTeam = async (id, data) => {
  return await Team.findByIdAndUpdate(id, data, { new: true });
};

export const deleteTeam = async (id) => {
  return await Team.findByIdAndDelete(id);
};
