const {
  getBookService,
  createBookService,
  updateBookService,
  deleteBookService,
  getBookByKeyService,
} = require("./service");

const getBookController = async (req, res) => {
  const books = await getBookService();
  if (!books) {
    return red.json({ status: "error", books: [] });
  }
  return res.json({ status: "Success", books: books });
};


const createBookController = async (req, res) => {
  const bookType = req.body.bookType;
  const bookName = req.body.bookName;
  const author = req.body.author;

  const books = await createBookService(bookType, bookName, author);

  if (!books) {
    return res.json({ status: "error", message: " Error" });
  }
  return res.json({ status: "Success", message: "Successfuly" });
};


const updateBookController = async (req, res) => {
  const bookType = req.body.bookType;
  const bookName = req.body.bookName;
  const author = req.body.author;
  const id = req.body.id;

  const books = await updateBookService(bookType, bookName, author, id);
  console.log("==========================xxxxxxxxxxxxxxxx",books);

  if (!books) {
    return res.json({ status: "error", message: " info not change" });
  }
  return res.json({ status: "Success", message: "Successfuly" });
};

const deleteBookController = async (req, res) => {
  const id = req.body.id;

  const books = await deleteBookService(id);

  if (!books) {
    return res.json({ status: "error", message: " info not change" });
  }
  return res.json({ status: "Success", message: "Successfuly" });
};

const getBookByIdController = async (req, res) => {
  const keyword = req.body.keyword;

  const books = await getBookByKeyService(keyword);

  if (!books) {
    return res.json({ status: "error", message: " info not change" });
  }
  //get infomation in service
  return res.json({ status: "Success", books: books });
};


module.exports = {
  getBookController,
  createBookController,
  updateBookController,
  deleteBookController,
  getBookByIdController,
};
