// write all related function to community_users entity down below
const { Sequelize } = require("sequelize");
const CommunityUser = require("../models").communityUser;

// CREATE - POST
const createNewCommunityUser = async (req, res) => {
  let response = {};
  let code = 200;

  if (req.body.users_id == "" || req.body.users_id == undefined) {
    code = 442;
    response = {
      status: "SUCCESS",
      message: "the users_id property cannot be null",
    };
  } else if (req.body.communities_id == "" || req.body.communities_id == undefined) {
    code = 442;
    response = {
      status: "SUCCESS",
      message: "the name communities_id cannot be null",
    };
  } else {
    try {
      // daftarkan anggota komunitas baru
      const newCommunityUser = await CommunityUser.create({
        users_id: req.body.users_id,
        communities_id: req.body.communities_id,
        community_role: "member",
      });

      response = {
        status: "SUCCESS",
        message: "Anda sudah terdaftar menjadi anggota komunitas ini",
        data: newCommunityUser,
      };
    } catch (error) {
      code = 422;
      response = {
        status: "ERROR",
        message: error.parent && error.parent.sqlMessage ? error.parent.sqlMessage : "Unknown error occurred",
      };
    }
  }

  res.status(code).json(response);
};

module.exports = {
  createNewCommunityUser,
};
