const User = require("../models/users");

exports.list = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ message: `${users.length} items found`, users });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.show = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    res.status(200).json({ message: "found user", user });
  } catch (error) {
    res.status(400).json({ message: `User with id: ${id} was not found` });
  }
};
