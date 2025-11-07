import IncomeVariable from "../models/Income.js";
import ExpenseVariable from "../models/Expense.js";

export const getFullTransaction = async (req, res) => {
  try {
    const userId = req.user._id;
    const incomeData = await IncomeVariable.find({ userId }).populate(
      "selectedIncomeCategory",
      "categoryName"
    );
    const expenseData = await ExpenseVariable.find({ userId }).populate(
      "selectedExpenseCategory",
      "categoryName"
    );
    const transactionData = [...incomeData, ...expenseData].sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.json(transactionData);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const { type, id } = req.params;
    const userId = req.user._id;
    let deleted;
    if (type == "income") {
      deleted = await IncomeVariable.findOneAndDelete({ _id: id, userId });
    } else {
      deleted = await ExpenseVariable.findOneAndDelete({ _id: id, userId });
    }
    if (!deleted) {
      return res
        .status(404)
        .json({ message: "Transaction not found or not yours" });
    }
    //we should send a response back to the frontend — otherwise the frontend will wait without knowing the result:
    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

/*
"selectedIncomeCategory" → the field name in your schema that stores a reference (ObjectId)."CategoryName" → which field(s) you want from that referenced document. 
In Mongoose, .populate() is used to replace the ObjectId reference with the actual document it refers to.

So if you store a Category ID inside another document (like Income),
populate() lets you fetch the full category details automatically.

A sample Category document might look like this in the database:
{
  "_id": "66d1c81b9e8d123456abcd01",
  "categoryName": "Salary",
  "type": "income",
  "userId": "66c8a23e4e1b9f1234567ef0"
}

  A sample Income document might look like this:

{
  "_id": "66d1c8ab9e8d123456abcd11",
  "selectedIncomeCategory": "66d1c81b9e8d123456abcd01",
  "incomeAmount": 5000,
  "type": "income",
  "userId": "66c8a23e4e1b9f1234567ef0",
  "createdAt": "2025-11-07T10:30:00.000Z"
}

Now you do:
const incomeData = await IncomeVariable
  .find()
  .populate("selectedIncomeCategory", "categoryName");
Mongoose will:
Look at selectedIncomeCategory
Find the matching document in the Category collection (using that ObjectId)
Replace the ObjectId with that Category’s document
Only include the field categoryName (because you specified it)

const incomeData = await IncomeVariable.find(userId);
That’s ❌ incorrect syntax.

.find() expects a filter object, not a raw value

.find({ userId }) // good
.find()           // gets all
.findOne({ _id }) // gets one
.findById(id)     // shortcut for _id

.findOneAndDelete(filter) - When you want to delete based on multiple conditions

🧠 Why we use findOneAndDelete({ _id: id, userId })
It ensures:
The _id matches the transaction
AND the userId matches the logged-in user

We define let deleted; so that we can assign the result inside the if/else and use it later.
*/
