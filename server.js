const app = require("./app");

require("./scheduler");

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
