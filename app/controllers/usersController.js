const getUsers = async (req, res) => {
  const users = [];
  return res.status(200).json(users);
};

module.exports = getUsers;
