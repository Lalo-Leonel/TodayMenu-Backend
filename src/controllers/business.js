const Business = require("../models/business");
const User = require("../models/users");

exports.create = async (req, res) => {
  try {
    const { body, userId } = req;
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("invalid user");
    }
    if (user.role === "client") {
      throw new Error("client cannot create a business");
    }
    const business = await Business.create({ ...body, logo: body.file, user: userId });
    res.status(201).json({ message: "business created", business });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.list = async (req, res) => {
  try {
    const business = await Business.find();
    res.status(200).json({ message: `${business.length} items found`, business });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.show = async (req, res) => {
  const { id } = req.params;
  try {
    const business = await Business.findById(id);
    if (!business) {
      throw new Error("Business not found");
    }
    res.status(200).json({ message: "found business", business });
  } catch (error) {
    res.status(400).json({ message: `Business with id: ${id} was not found` });
  }
};

exports.update = async (req, res) => {
  try {
    const {
      body,
      params: { id },
      userId,
    } = req;
    const business = await Business.findOneAndUpdate({ _id: id, user: userId }, body, {
      new: true,
    });

    if (!business) {
      res.status(403).json({ message: "The business couldn´t be updated" });
      return;
    }

    res.status(200).json({ message: "updated business", business });
  } catch (e) {
    res.status(400).json({ message: "The business couldn´t be updated" });
  }
};

exports.destroy = async (req, res) => {
    try {
      const { params: { id }, userId } = req;
      const business = await Business.findOneAndDelete({ _id: id, user: userId });
  
      if(!business) {
        res.status(403).json({ message: 'The business couldn´t be deleted' });
        return
      }
  
      res.status(200).json({ message: 'deleted business', business });
    } catch(e) {
      res.status(400).json({ message: 'The business couldn´t be deleted' });
    }
  };
