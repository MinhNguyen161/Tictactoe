import React from "react";

const Hisotry = (props) => {
  console.log(props.history);
  if (props.history == null || props.history.length < 1) {
    return <div> Nothing to see</div>;
  }
  return (
    <div>
      {props.history.map((item, index) => {
        return (
          <button
            onClick={() => {
              props.ChangeBoard(index);
            }}
          >
            {" "}
            Go to move {index + 1}
          </button>
        );
      })}
    </div>
  );
};

export default Hisotry;
