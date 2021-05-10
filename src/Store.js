import React, { useEffect } from "react";

export const CTX = React.createContext();

const initState = {
  general: [
    { from: "hank", msg: "yo" },
    { from: "bobby", msg: "yo" },
    { from: "peggy", msg: "yo" }
  ],
  topic2: [
    { from: "bill", msg: "yo" },
    { from: "boomhauer", msg: "yo" },
    { from: "dale", msg: "yo" }
  ]
};

function reducer(state, action) {
  //payload logs as:
  //{from:'from',msg:'msg',topic:'topic'}
  const { from, msg, topic } = action.payload;
  switch (action.type) {
    case "RECEIVE_MESSAGE":
      return {
        ...state,
        [topic]: [...state[topic], { from, msg }]
      };
    default:
      return state;
  }
}

export default function Store(props) {
  const [allChats, dispatch] = React.useReducer(reducer, initState);

  function sendChatAction(value) {
    dispatch({
      type: "RECEIVE_MESSAGE",
      payload: value
    });
  }

  useEffect(() => {
    //msg logs with text field value that we need in
    //chatWindow on Dashboard.
    setTimeout(() => {
      sendChatAction({ from: "Anneka", msg: "hey", topic: "general" });
    }, 3000);
  }, []);

  //allChats logs only as initState, above.
  const user = "Anneka" + Math.random(100).toFixed(2);

  return (
    <CTX.Provider value={{ allChats, sendChatAction, user }}>
      {props.children}
    </CTX.Provider>
  );
}