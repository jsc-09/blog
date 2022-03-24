const { BlogPost } = require('../models');

const blogData = [
    {
      "name": "All About JavaScript ",
      "post": "I learned all about JS in bootcamp. So much fun!"
    },
    {
      "name": "Restroom App",
      "description": "Used what I learn in class and applied to to the new project that I made."
    },
    {
      "name": "Trouble with SQL & ORM",
      "description": "It's been a tough few weeks"
    }
  ]
  

  const seedBlogs = () => BlogPost.bulkCreate(blogData);

  module.exports = seedBlogs;