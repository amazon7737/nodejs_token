const users = [
  { name: "김강민", age: 21 },
  { name: "이강민", age: 31 },

  { name: "오강민", age: 41 },
  { name: "한강민", age: 51 },
];
const Service = {
  getUsers: () => {
    return users;
  },
};

module.exports = Service;
