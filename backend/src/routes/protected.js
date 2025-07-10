const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware.js")
const verifyRole = require("../middleware/roleMiddleware.js")

router.get("/protected", verifyToken, (req, res) => {
  res.json({ message: "You accessed a protected route!" });
});

router.get("/admin",verifyToken,verifyRole("admin"),(req,res) => {
  res.json({message: "Welcome, Admin! You accessed a restricted admin route." })

}
)

router.get("/freelancer",verifyToken,verifyRole("freelancer"),(req,res) => {
  res.json({message: "Welcome, Freelancer! You accessed a restricted Freelancer route." })
  
}
)
router.get("/client", verifyToken, verifyRole("client"), (req, res) => {
  res.json({ message: "Hi Client! You're on a client-only route." });
});

module.exports = router;