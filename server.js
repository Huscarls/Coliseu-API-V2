var app = require("./src/app");

var PORT = process.env.PORT;

app.listen(PORT, () => {
  console.error(new Date());
    console.log(`API listening on port ${PORT}`);
    console.log(`Online on http://localhost:${PORT}/docs`)
});
