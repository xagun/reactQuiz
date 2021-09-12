import {
  LOADCATEGORY,
  LOADQUESTION,
  SETCATEGORY,
  SETDIFFICULTY,
  SETNUMBER,
  SETQUESTION,
} from "../actions";

const initialState = {
  category: "",
  difficulty: "",
  questionType: "multiple",
  noOfQuestions: "3",
  questions: null,
  categoryList: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADCATEGORY:
      return { ...state, categoryList: action.payload };

    case SETDIFFICULTY:
      return { ...state, difficulty: action.payload };

    case SETQUESTION:
      return { ...state, questionType: action.payload };
    case SETCATEGORY:
      return { ...state, category: action.payload };
    case SETNUMBER:
      return { ...state, noOfQuestions: action.payload };

    case LOADQUESTION:
      return { ...state, questions: action.payload };

    default:
      return state;
  }
};

export default reducer;
