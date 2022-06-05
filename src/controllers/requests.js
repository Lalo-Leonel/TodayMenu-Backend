const Request = require("../models/requests");
const Menu = require("../models/menus");
const User = require("../models/users");

exports.create = async (req, res) => {
  try {
    const { body, userId } = req;
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("invalid user");
    }
    if (user.role === "business") {
      throw new Error("business cannot create a request");
    }
    const request = await Request.create({ ...body, user: userId });
    res.status(201).json({ message: "request created", request });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.list = async (req, res) => {
  try {
    const requests = await Request.find().populate("menu");
    res.status(200).json({ message: `${requests.length} items found`, requests });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.show = async (req, res) => {
  const { id } = req.params;
  try {
    const request = await Request.findById(id).populate("menu");
    if (!request) {
      throw new Error("Request not found");
    }
    res.status(200).json({ message: "found request", request });
  } catch (error) {
    res.status(400).json({ message: `Request with id: ${id} was not found` });
  }
};

exports.update = async (req, res) => {
  try {
    const {
      body,
      params: { id },
      userId,
    } = req;
    const request = await Request.findOneAndUpdate({ _id: id, user: userId }, body, {
      new: true,
    });

    if (!request) {
      res.status(403).json({ message: "The request couldn´t be updated" });
      return;
    }

    res.status(200).json({ message: "updated request", request });
  } catch (e) {
    res.status(400).json({ message: "The request couldn´t be updated" });
  }
};

exports.destroy = async (req, res) => {
    try {
      const { params: { id }, userId } = req;
      const request = await Request.findOneAndDelete({ _id: id, user: userId });
  
      if(!request) {
        res.status(403).json({ message: 'The request couldn´t be deleted' });
        return
      }
  
      res.status(200).json({ message: 'deleted request', request });
    } catch(e) {
      res.status(400).json({ message: 'The request couldn´t be deleted' });
    }
  };
