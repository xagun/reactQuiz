import React, { Component } from "react";
import { connect } from "react-redux";
import { LOADQUESTIONS } from "../../redux/store/action-creator";
import "./question.css";

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasClickedView: false,
      correctAnswers: null,
      disabledButton: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.viewResult = this.viewResult.bind(this);
  }

  handleClick(e, questionIndex, ansIndex) {
    let newQuestions = [...this.props.questions];
    newQuestions[questionIndex].chosenAnswer = e.target.value;

    newQuestions[questionIndex].changeColor = false;
    this.props.loadQuestions(newQuestions);

    this.setState({
      // questions: newQuestions,
      changeColor: true,
    });
  }

  viewResult = (e) => {
    window.scrollTo(0, 0);
    let results = [...this.props.questions];
    let resultsLength = 0;
    let correctAnswers = 0;
    results.forEach((data, index) => {
      if (data.chosenAnswer !== undefined) {
        resultsLength++;
      }
    });
    if (resultsLength !== results.length) {
      alert("Answer all questions first.");
      return;
    } else {
      results.forEach((data, index) => {
        if (data.chosenAnswer === data.correct_answer) {
          correctAnswers++;
        }
      });
    }

    this.setState({
      correctAnswers: correctAnswers,
      hasClickedView: true,
      disabledButton: true,
    });
  };

  render() {
    const { questions } = this.props;

    return (
      <div className="container">
        <div className="score">
          {" "}
          {this.state.hasClickedView ? (
            <h1>
              Score: {this.state.correctAnswers} out of {questions?.length}
            </h1>
          ) : null}
        </div>

        {questions?.map((questionData, questionIndex) => (
          <div key={questionIndex} className="question-box">
            <div className="question-heading">
              <h2>{questionData.question}</h2>
            </div>

            <div className="answer-buttons">
              {questionData.answers.map((ans, ansIndex) => (
                <button
                  key={ansIndex}
                  disabled={this.state.disabledButton}
                  onClick={(e) => this.handleClick(e, questionIndex, ansIndex)}
                  value={ans}
                  style={
                    this.state.hasClickedView &&
                    questionData.correct_answer === ans
                      ? { backgroundColor: "green" }
                      : questionData.correct_answer !==
                          questionData.chosenAnswer &&
                        questionData.chosenAnswer === ans &&
                        this.state.hasClickedView
                      ? { backgroundColor: "red" }
                      : !this.state.hasClickedView &&
                        questionData.chosenAnswer === ans
                      ? { backgroundColor: "rgb(183, 6, 253)" }
                      : null
                  }
                >
                  {ans}
                </button>
              ))}
            </div>
          </div>
        ))}

        <div className="results-btn">
          <button onClick={this.viewResult}>View Result</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  questions: state.questions,
});

const mapDispatchToProps = (dispatch) => {
  return {
    loadQuestions: (questions) => {
      dispatch(LOADQUESTIONS(questions));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
