const Room = require("../models/room.model");
const RoomTypeService = require("./roomType.service");
const _ = require("lodash");

class RoomService {
    async createNewRoom(data) {
      const room = new Room(data);
  
      await room.save();
  
      return room;
    }
  
    async list(query) {
      // begin: handle price case
      const priceQuery = {};
      if (query?.minPrice) {
        priceQuery.prize = { $gte: query?.minPrice };
      }
  
      if (query?.maxPrice) {
        priceQuery["prize"] = {
          $gte: query?.minPrice,
          $lte: query?.maxPrice,
        };
      }
  
      // end handle price case
      // begin handle room type case
      let roomTypesIds;
  
      if (query?.roomType) {
        // make a search query for room type
        const searchRoomTypeQuery = {
          codeName: {
            $regex: query?.roomType,
            $options: "i",
          },
        };
  
        const searchedRoomTypes = await RoomTypeService.list(searchRoomTypeQuery);
  
        // if something was found
        if (!_.isEmpty(searchedRoomTypes)) {
          // pick out all the room type identifiers (ids) that was found
          roomTypesIds = searchedRoomTypes.map((rooType) => {
            return rooType._id;
          });
        }
      }
  
      const searchQueryObject = {
        // we are using the or operator to search all the fields
        $or: [],
      };
  
      if (query?.search) {
        searchQueryObject["$or"].push({
          codeName: {
            $regex: query?.search,
            $options: "i",
          },
        });
      }
  
      // add price query if it not empty
      if (!_.isEmpty(priceQuery)) {
        searchQueryObject["$or"].push(priceQuery);
      }
  
      // if roomTypesIds is not empty, it means we found something
      if (!_.isEmpty(roomTypesIds)) {
        searchQueryObject["$or"].push({
          roomType: { $in: roomTypesIds },
        });
      }
  
      const rooms = await Room.find(searchQueryObject).populate({
        path: "roomType",
        model: "RoomType",
        select: "_id name",
      });
  
      return rooms;
    }
  
    async retrieveById(id) {
      const room = await Room.findById(id);
      return room;
    }
  
    async updateOneById(id, update) {
      const room = await Room.findByIdAndUpdate(id, update, {
        new: true,
        runValidators: true,
      });
  
      return room;
    }
  
    async deleteOneById(_id) {
      const room = await Room.findByIdAndRemove(_id);
  
      return room;
    }
  }
  
  module.exports = new RoomService();