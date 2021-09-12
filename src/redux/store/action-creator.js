import {
  LOADCATEGORY,
  SETQUESTION,
  SETDIFFICULTY,
  SETCATEGORY,
  SETNUMBER,
  LOADQUESTION,
} from "../actions";

export const LOADCATEGORIES = (categoryList) => {
  return {
    type: LOADCATEGORY,
    payload: categoryList,
  };

  // const res = await axios.get("https://opentdb.com/api_category.php");
  // console.log(res);

  // categoryList = res.data;
  // return {
  //   type: LOADCATEGORY,
  //   payload: categoryList,
  // };
};

export const SETDIFFICULTYLEVEL = (difficulty) => {
  return {
    type: SETDIFFICULTY,
    payload: difficulty,
  };
};

export const SETQUESTIONTYPE = (questionType) => {
  return {
    type: SETQUESTION,
    payload: questionType,
  };
};

export const SETNUMBEROFQUESTION = (noOfQuestions) => {
  return {
    type: SETNUMBER,
    payload: noOfQuestions,
  };
};

export const SETCATEGORYTYPE = (category) => {
  return {
    type: SETCATEGORY,
    payload: category,
  };
};

export const LOADQUESTIONS = (questions) => {
  return {
    type: LOADQUESTION,
    payload: questions,
  };
};
