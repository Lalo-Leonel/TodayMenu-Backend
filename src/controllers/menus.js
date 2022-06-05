const Menu = require("../models/menus");
const User = require("../models/users");

exports.create = async (req, res) => {
  try {
    const { body, userId } = req;
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("invalid user");
    }
    const menu = await Menu.create(body);
    res.status(201).json({ message: "menu created", menu });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.list = async (req, res) => {
  try {
    const menus = await Menu.find().populate("business");
    res.status(200).json({ message: `${menus.length} items found`, menus });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.show = async (req, res) => {
  const { id } = req.params;
  try {
    const menu = await Menu.findById(id);
    if (!menu) {
      throw new Error("Menu not found");
    }
    res.status(200).json({ message: "found menu", menu });
  } catch (error) {
    res.status(400).json({ message: `Menu with id: ${id} was not found` });
  }
};

exports.update = async (req, res) => {
  try {
    const {
      body,
      params: { id },
      userId,
    } = req;
    const menu = await Menu.findOneAndUpdate({ _id: id, user: userId }, body, {
      new: true,
    });

    if (!menu) {
      res.status(403).json({ message: "The menu couldn´t be updated" });
      return;
    }

    res.status(200).json({ message: "updated menu", menu });
  } catch (e) {
    res.status(400).json({ message: "The menu couldn´t be updated" });
  }
};

exports.destroy = async (req, res) => {
    try {
      const { params: { id }, userId } = req;
      const menu = await Menu.findOneAndDelete({ _id: id, user: userId });
  
      if(!menu) {
        res.status(403).json({ message: 'The menu couldn´t be deleted' });
        return
      }
  
      res.status(200).json({ message: 'deleted menu', menu });
    } catch(e) {
      res.status(400).json({ message: 'The menu couldn´t be deleted' });
    }
  };
