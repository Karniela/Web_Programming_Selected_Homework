export const Artwork = {
  id: (parent) => (parent._id),
  title: (parent) => (parent.title),
  imgURL: (parent) => (parent.imgURL),
  artist: (parent) => (parent.artist), 
  material: (parent) => (parent.material),
  dimension: (parent) => (parent.dimension),
  price: (parent) => (parent.price),
  auction_date: (parent) => (parent.auction_date), 
  auction_house: (parent) => (parent.auction_house),
  area: (parent) => (parent.area),
  priceCentimeter: (parent) => (parent.priceCentimeter)
};