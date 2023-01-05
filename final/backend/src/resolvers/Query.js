import { verifyToken } from "./Utilities";

export const Query = {
  // searching
  featured: async (parent, data, { Painting }, info) => {
    return await Painting.find({}).limit(3);
  },

  newest: async (parent, data, { Painting }, info) => {
    return await Painting.find({}).sort({ auction_date: -1 }).limit(3);
  },

  artworks: async (parent, { input }, { Painting }, info) => {
    if (!/\S/.test(input)) { // only white spaces
      return await Painting.find({});
    }
    // const artwork_search = { $text : { $search : input } };
    // const artist_name_match = { artist: new RegExp(input, "i") };
    // const artist_name_include = input.split(/\s/).map((kw) => ({ artist: new RegExp(kw, "i") }));
    // console.log([ 
    //   artwork_search, 
    //   artist_name_match, 
    //   ...artist_name_include
    // ]);
    const results = await Painting.find({ $text : { $search : input } });
    return results;
  },

  artists: async (parent, { input }, { Painter }, info) => {
    const results = 
        input 
          ?await Painter.find({ name: new RegExp(input, "i") })
          :await Painter.find({});
    return results;
  },

  artwork: async (parent, { id }, { Painting }, info) => {
    return await Painting.findById(id);
  },
  artist: async (parent, { id }, { Painter }, info) => {
    return await Painter.findById(id);
  },
  user: async (parent, { token }, { User }, info) => {
    try {
      return await User.findById(verifyToken(token)._id, "-hashed_pwd");
    } catch(e) {
      if (e=="JsonWebTokenError: invalid token") { return; }
      throw e;
    }
  }
};