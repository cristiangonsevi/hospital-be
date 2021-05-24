const { app } = require('../app.js');


// eslint-disable-next-line no-undef
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log('Server running on port '+ PORT)
});
