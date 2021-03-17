export default (req, res) => {
  console.log("the request...");
  console.log("this is all ran on the server (in a lambda)");
  res.status(200).json({ text: "Hello 02.21.21 v2" });
};
