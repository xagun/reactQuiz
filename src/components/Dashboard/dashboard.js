import React, { Component } from "react";
import "./dashboard.css";
import axios from "axios";
import Questions from "../Questions/question";
import { connect } from "react-redux";
import {
  LOADCATEGORIES,
  SETCATEGORYTYPE,
  SETQUESTIONTYPE,
  SETDIFFICULTYLEVEL,
  SETNUMBEROFQUESTION,
  LOADQUESTIONS,
} from "../../redux/store/action-creator";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleNewStart = this.handleNewStart.bind(this);
  }

  handleNewStart = (e) => {
    window.location.reload(false);
  };

  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  componentDidMount() {
    this.getCategories();
  }

  getCategories = () => {
    axios.get("https://opentdb.com/api_category.php").then((res) => {
      if (res.status === 200) {
        this.props.setCategories(res.data.trivia_categories);
      }
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    axios
      .get(
        `https://opentdb.com/api.php?amount=${this.props.noOfQuestions}&category=${this.props.category}&difficulty=${this.props.difficulty}&type=${this.props.questionType}`
      )
      .then((res) => {
        const newQuestions = res.data.results;
        newQuestions.forEach((q) => {
          q.answers = [q.correct_answer, ...q.incorrect_answers];
          q.answers = this.shuffle(q.answers);
        });
        this.props.loadQuestions(newQuestions);
      });
  };

  handleChange = (e) => {
    const { value, name } = e.target;
    if (name === "difficulty") {
      this.props.setDifficulty(value);
    }
    if (name === "questionType") {
      this.props.setQuestionType(value);
    }
    if (name === "category") {
      this.props.setCategory(value);
    }
    if (name === "noOfQuestions") {
      this.props.setNumberOfQuestions(value);
    } else {
      this.setState({ [name]: value });
    }
  };

  render() {
    return (
      <>
        <div className="question-generator">
          <form
            className="row gy-2 gx-3 align-items-center"
            onSubmit={this.handleSubmit}
          >
            <div className="col-auto">
              <h4>Categories</h4>
              <select
                className="form-select"
                name="category"
                onChange={this.handleChange}
              >
                <option defaultValue>Choose category...</option>
                {this.props.categoryList?.map((cat, index) => {
                  return (
                    <option key={index} value={cat.id}>
                      {cat.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="col-auto">
              <h4>Difficulty Level</h4>
              <select
                className="form-select"
                name="difficulty"
                onChange={this.handleChange}
                value={this.props.difficulty}
              >
                <option defaultValue>Choose...</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            <div className="col-auto">
              <h4>Questions Type</h4>
              <select
                value={this.props.questionType}
                className="form-select"
                name="questionType"
                onChange={this.handleChange}
              >
                <option defaultValue>Choose...</option>
                <option value="multiple">Multiple Choice Question</option>
                <option value="boolean">True/False</option>
              </select>
            </div>
            <div className="col-auto">
              <h4>No. of Questions</h4>
              <input
                value={this.props.noOfQuestions}
                className="form-control"
                type="number"
                name="noOfQuestions"
                onChange={this.handleChange}
              />
            </div>
            <div className="row-auto row-button">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>

        {this.props.questions?.length > 0 ? (
          <div>
            <div className="btn-reload">
              <button onClick={this.handleNewStart}>Start new game</button>
            </div>
            <Questions />
          </div>
        ) : null}
      </>
    );
  }
}

const mapStateToProps = (state, props) => ({
  categoryList: state.categoryList,
  difficulty: state.difficulty,
  questionType: state.questionType,
  category: state.category,
  noOfQuestions: state.noOfQuestions,
  questions: state.questions,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setCategories: (categoryList) => {
      dispatch(LOADCATEGORIES(categoryList));
    },

    setDifficulty: (difficulty) => {
      dispatch(SETDIFFICULTYLEVEL(difficulty));
    },

    setQuestionType: (questionType) => {
      dispatch(SETQUESTIONTYPE(questionType));
    },

    setCategory: (category) => {
      dispatch(SETCATEGORYTYPE(category));
    },

    setNumberOfQuestions: (noOfQuestions) => {
      dispatch(SETNUMBEROFQUESTION(noOfQuestions));
    },

    loadQuestions: (questions) => {
      dispatch(LOADQUESTIONS(questions));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
