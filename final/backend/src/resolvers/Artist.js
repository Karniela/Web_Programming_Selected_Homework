export const Artist = {
  id: (parent) => (parent._id),
  name: (parent) => (parent.name),
  imgURL: (parent) => (parent.imgsrc),
  description: (parent) => (parent.description),
  analysis:(parent) => {
    console.log(parent.analysis);
    return(parent.analysis)
  }
  
};
