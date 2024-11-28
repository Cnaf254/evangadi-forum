const dbconnection = require("../db/dbConfig.js");
const { StatusCodes } = require("http-status-codes");

async function post(req, res) {
  const { tag, title, description, questionId, userId } = req.body;

  if (!tag || !title || !description) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide all required inputs" });
  }
  try {
    await dbconnection.query(
      "INSERT INTO questions(questionid,userid,title,description,tag) VALUES(?,?,?,?,?)",
      [questionId, userId, title, description, tag]
    );

    return res
      .status(StatusCodes.CREATED)
      .json({ msg: "question posted successfully" });
  } catch (error) {
    console.log("posted", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong try again later" });
  }
}

async function allQuestions(req, res) {
  try {
    const query = `
      SELECT q.questionid, q.title, q.description, q.id, u.username
      FROM questions q
      JOIN users u ON q.userid = u.userid
      ORDER BY q.id DESC; 
    `;

    const result = await dbconnection.query(query);

    return res.status(StatusCodes.OK).json({ data: result[0] });
  } catch (error) {
    console.error("Error fetching question details with usernames:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, try again later" });
  }
}

module.exports = { post, allQuestions };
