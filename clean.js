const fs = require("fs");

const clean = () => {
  // Frontend
  fs.rmSync("./frontend/dist", { recursive: true, force: true });
  fs.rmSync("./frontend/node_modules", { recursive: true, force: true });
  fs.rmSync("./frontend/coverage", { recursive: true, force: true });

  // Backend
  fs.rmSync("./backend/build", { recursive: true, force: true });
  fs.rmSync("./backend/.gradle", { recursive: true, force: true });
};

clean();
