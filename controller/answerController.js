const dbconnection = require("../db/dbConfig.js");
const { StatusCodes } = require("http-status-codes");

async function post(req, res) {
  const { answer, questionid, userid } = req.body;

  if (!answer || !questionid || !userid) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide all required value. " });
  }

  try {
    await dbconnection.query(
      "INSERT INTO answers(userid,questionid,answer) VALUES(?,?,?)",
      [userid, questionid, answer]
    );
    return res
      .status(StatusCodes.CREATED)
      .json({ msg: "Answer posted successfully" });
  } catch (error) {
    console.log("answer posted error is", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong try again later" });
  }
}
async function get(req, res) {
  // const { questionid } = req.body;
  const questionId = req.params.questionId;
  if (!questionId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please enter questionid " });
  }

  try {
    const response = await dbconnection.query(
      "SELECT answers.answer, users.username FROM answers  INNER JOIN users ON answers.userid = users.userid WHERE answers.questionid = ? ORDER BY answers.answerid DESC",
      [questionId]
    );
    return res.status(StatusCodes.OK).json({ data: response[0] });
  } catch (error) {
    console.log("from get answer", error);
  }
}

module.exports = { post, get };
