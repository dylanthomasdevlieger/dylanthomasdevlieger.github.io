import * as React from "https://cdn.skypack.dev/react@17.0.1";
import * as ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";
import * as bootstrap from "https://cdn.skypack.dev/bootstrap@5.2.1";




//create a 2 dimensional array of all the cells which gives the cellIndex and the column and row that it belongs to 
const useRef = { React };

const iconObj = {
  'crossword': 'https://raw.githubusercontent.com/dylanthomasdevlieger/images-repo/ac7a43551fe28d016e2752d4f2fecd1971d0cdac/crossword.png',

  'miniCrossword': 'https://raw.githubusercontent.com/dylanthomasdevlieger/images-repo/ac7a43551fe28d016e2752d4f2fecd1971d0cdac/miniCrossword.png',

  'spellingBee': 'https://raw.githubusercontent.com/dylanthomasdevlieger/images-repo/ac7a43551fe28d016e2752d4f2fecd1971d0cdac/spellingBee.png',

  'wordle': 'https://raw.githubusercontent.com/dylanthomasdevlieger/images-repo/ac7a43551fe28d016e2752d4f2fecd1971d0cdac/worlde.png',

  'tiles': 'https://raw.githubusercontent.com/dylanthomasdevlieger/images-repo/ac7a43551fe28d016e2752d4f2fecd1971d0cdac/tiles.png',

  'letterBoxed': 'https://raw.githubusercontent.com/dylanthomasdevlieger/images-repo/ac7a43551fe28d016e2752d4f2fecd1971d0cdac/letterBoxed.png',

  'Vertex': 'https://raw.githubusercontent.com/dylanthomasdevlieger/images-repo/ac7a43551fe28d016e2752d4f2fecd1971d0cdac/Vertex.png',

  'Sudoku': 'https://raw.githubusercontent.com/dylanthomasdevlieger/images-repo/ac7a43551fe28d016e2752d4f2fecd1971d0cdac/Sudoku.png' };


const popUpContinueArr = ['blank', 'Your game is paused', 'Ready to play?', 'Continue', '', new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }),
'By Wyna Liu'];

const initialPopUpArr = ['miniCrossIcon', 'The Mini Crossword', 'Save your progress across devices and compare times with friends', 'Create a free account', 'Play without an account', '', ''];

const acceptableEntries = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

let alphabet = ['A', 'B', 'C', 'D', 'E'];

function cellListMaker(arr)
{let emptyArr = [];
  for (let i = 0; i < arr.length; i++)
  {
    for (let a = 1; a < 6; a++) {
      emptyArr.push(
      'this.state[\'' + arr[i] + '\']' + " + " + 'this.state[' + a + ']' + ' + ' + '\' cell\'');
    }
  }
  return emptyArr;
}



function cellArrayMaker(arr)
{let emptyArr = [];
  for (let i = 0; i < arr.length; i++)
  {
    for (let a = 1; a < 6; a++) {
      emptyArr.push(
      arr[i] + a);
    }
  }return emptyArr;
}



const cellArray = ["A1", "A2", "A3", "A4", "A5", "B1", "B2", "B3", "B4", "B5", "C1", "C2", "C3", "C4", "C5", "D1", "D2", "D3", "D4", "D5", "E1", "E2", "E3", "E4", "E5"];

const tabArrayAcross = ['A1', 'B1', 'C3', 'D1', 'E2'];

const tabArrayDown = ['A1', 'A2', 'B3', 'B4', 'C5', 'D2'];

const date = Date();

const hintArr = ['1A Greeting', '3A Little brother from stranger things', '6A Me and', '8A Sea in Spanish + RY', '10A You and', '1D Acronym for work after school', '__ Captain', '4D Harp-like instrument', '5D Hobbits star in this', '7D Exclamatory phrase in spanish', '9D I__ what I __'];

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      clickCount: 1,
      selectedValue: '',
      1: '',
      2: '',
      3: '',
      4: '',
      5: '',
      6: '',
      A: 'selected',
      B: '',
      C: '',
      D: '',
      E: '',
      ActiveHint: hintArr[0],
      A1: ' ',
      A2: ' ',
      A3: '',
      A4: '',
      A5: '',
      B1: '',
      B2: '',
      B3: '',
      B4: '',
      B5: '',
      C1: '',
      C2: '',
      C3: '',
      C4: '',
      C5: '',
      D1: '',
      D2: '',
      D3: '',
      D4: '',
      D5: '',
      E1: '',
      E2: '',
      E3: '',
      E4: '',
      E5: '',
      timePassed: 0,
      timerRunning: -1,
      popUp: initialPopUpArr };


    this.handleClick = this.handleClick.bind(this);
    this.changeDirection = this.changeDirection.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);

    this.countUp = this.countUp.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.toggleOn = this.toggleOn.bind(this);
    this.displayIfPlaying = this.displayIfPlaying.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
  }






  toggleOn() {this.setState(state => ({
      timerRunning: this.state.timerRunning * -1 }));
  }

  countUp() {
    this.setState(state => ({
      timePassed: this.state.timePassed + 1 }));

  }

  displayIfPlaying(x) {if (x == 1) {return 'blank';} else {return '';}}

  startTimer() {
    this.toggleOn();
    this.setState(state => ({
      popUp: popUpContinueArr }));

    if (this.state.timerRunning == -1) {this.intervalId = setInterval(() => {this.countUp();}, 1000);}
  }

  stopTimer() {
    if (this.state.timerRunning == -1) {
      this.setState(state => ({
        timerRunning: -1 }));

    } else {
      this.toggleOn();
      clearInterval(this.intervalId);
    }
  }


  componentDidMount() {document.addEventListener("keydown", this.handleKeyPress);
    setInterval(() => {

      if (document.hasFocus()) {} else
      {
        this.stopTimer();
      };
    }, 90000);
  }



  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }



  handleTab(event) {
    this.setState((prevState, state) => ({
      clickCount: prevState.clickCount }));

  }




  handleLeft(event) {
    this.setState((prevState, state) => ({
      clickCount: 1 }));

    document.getElementById(cellArray[cellArray.indexOf(document.activeElement.id) - 1]).focus();
  }

  handleRight(event) {
    this.setState((prevState, state) => ({
      clickCount: 1 }));

    document.getElementById(cellArray[cellArray.indexOf(document.activeElement.id) + 1]).focus();
  }

  handleUp(event) {
    this.setState((prevState, state) => ({
      clickCount: -1 }));

    document.getElementById(cellArray[cellArray.indexOf(document.activeElement.id) - 5]).focus();
  }

  handleDown(event) {this.setState((prevState, state) => ({
      clickCount: -1 }));

    document.getElementById(cellArray[cellArray.indexOf(document.activeElement.id) + 5]).focus();}



  handleKeyPress(event) {
    if (event.keyCode === 9) {
      this.handleTab();
    }
    this.setState((prevState, state) => ({
      clickCount: this.state.clickCount * -1 }));

    //IF LEFT ARROW IS PRESSED. the handle right and then handle left is a trick to trigger an event so that the onselect function called handleClick is triggered but the selected element remains the same  
    if (event.keyCode === 37) {
      if (this.state.clickCount === 1 && document.activeElement.id !== 'B1' && document.activeElement.id !== 'C3' &&
      document.activeElement.id !== 'E2' &&
      document.activeElement.id !== 'D1')
      {
        this.handleLeft();} else
      {
        if (document.activeElement.id !== 'E5') {
          this.handleRight();this.handleLeft();
        } else
        {
          if (document.activeElement.id === 'E5') {
            this.handleRight();this.handleLeft();
          }
        }
      }
    }

    //IF TAB IS PRESSED     

    //IF RIGHT ARROW IS PRESSED. the handle right and then handle left is a trick to trigger an event so that the onselect function called handleClick is triggered but the selected element remains the same   
    if (event.keyCode === 39) {
      if (this.state.clickCount === 1 && document.activeElement.id !== 'A2' && document.activeElement.id !== 'B4' &&
      document.activeElement.id !== 'C5' &&
      document.activeElement.id !== 'D5' && document.activeElement.id !== 'E3')
      {
        this.handleRight();} else
      {
        if (document.activeElement.id !== 'A1' && document.activeElement.id !== 'B1' && document.activeElement.id !== 'C3' && document.activeElement.id !== 'D1' && document.activeElement.id !== 'E2') {
          this.handleLeft();this.handleRight();
        } else
        {
          if (document.activeElement.id === 'A1' || document.activeElement.id === 'B1' || document.activeElement.id === 'C3' || document.activeElement.id === 'D1' || document.activeElement.id === 'E2') {
            this.handleRight();this.handleLeft();
          }
        }
      }
    }



    //IF UP ARROW IS PRESSED
    if (event.keyCode === 38) {
      if (this.state.clickCount === -1 && document.activeElement.id !== 'B3' && document.activeElement.id !== 'B4' && document.activeElement.id !== 'B5' && document.activeElement.id !== 'C5' &&
      document.activeElement.id !== 'D1' &&
      document.activeElement.id !== 'D2')
      {
        this.handleUp();} else
      {
        if (document.activeElement.id !== 'E5' && document.activeElement.id !== 'E4' && document.activeElement.id !== 'E3' && document.activeElement.id !== 'E2' && document.activeElement.id !== 'E1') {
          this.handleDown();this.handleUp();
        } else
        {
          if (document.activeElement.id === 'E5' || document.activeElement.id === 'E4' || document.activeElement.id === 'E3' || document.activeElement.id === 'E2' || document.activeElement.id === 'E1') {
            this.handleUp();this.handleDown();
          }
        }
      }
    }


    //IF DOWN ARROW IS PRESSED
    if (event.keyCode === 40) {
      if (this.state.clickCount === -1 && document.activeElement.id !== 'B1' && document.activeElement.id !== 'B2' &&
      document.activeElement.id !== 'D1' &&
      document.activeElement.id !== 'D4' &&
      document.activeElement.id !== 'D5')
      {
        this.handleDown();} else
      {
        if (document.activeElement.id !== 'C5' && document.activeElement.id !== 'B4' && document.activeElement.id !== 'B3' && document.activeElement.id !== 'A2' && document.activeElement.id !== 'A1') {
          this.handleUp();this.handleDown();
        } else
        {
          if (document.activeElement.id === 'C5' || document.activeElement.id === 'B4' || document.activeElement.id === 'B3' || document.activeElement.id === 'A2' || document.activeElement.id === 'A1') {
            this.handleDown();this.handleUp();
          }
        }
      }}


    if (document.activeElement.id == "A1" && acceptableEntries.indexOf(event.key) > -1) {
      this.setState(state => ({
        A1: event.key.toUpperCase() }));

      if (this.state.clickCount === 1) {
        setTimeout(() => {
          this.handleRight();
          this.setState(state => ({
            clickCount: 1 }));

        },
        1);

      } else
      {
        setTimeout(() => {
          this.handleDown();
          this.setState(state => ({
            clickCount: -1 }));

        },
        1);

      }
    }



    if (document.activeElement.id == "A1" && event.key == 'Backspace') {
      if (this.state.clickCount === -1) {
        this.setState(state => ({
          A1: ' ',
          clickCount: -1 }));
      } else
      {this.setState(state => ({
          A1: '',
          clickCount: 1 }));

      }
    }

    //If A2 
    if (document.activeElement.id == "A2" && acceptableEntries.indexOf(event.key) > -1) {
      this.setState((prevState, state) => ({
        A2: event.key.toUpperCase() }));

      if (this.state.clickCount === 1) {
        setTimeout(() => {
          this.handleLeft();this.handleRight();
          this.setState(state => ({
            clickCount: 1 }));

        },
        1);

      } else
      {
        setTimeout(() => {
          this.handleDown();
          this.setState(state => ({
            clickCount: -1 }));

        },
        1);

      }
    }
    if (document.activeElement.id == "A2" && event.key == 'Backspace') {
      if (this.state.clickCount === -1) {
        this.setState(state => ({
          A2: ' ',
          clickCount: -1 }));
      } else
      {this.setState(state => ({
          A2: ' ',
          clickCount: 1 }));

      }
    }

    //If A3
    if (document.activeElement.id == "A3" && acceptableEntries.indexOf(event.key) > -1) {
      this.setState(state => ({
        A3: event.key.toUpperCase() }));

      if (this.state.clickCount === 1) {
        setTimeout(() => {
          this.handleRight();
          this.setState(state => ({
            clickCount: 1 }));

        },
        1);

      } else
      {
        setTimeout(() => {
          this.handleDown();
          this.setState(state => ({
            clickCount: -1 }));

        },
        1);

      }
    }
    if (document.activeElement.id == "A3" && event.key == 'Backspace') {
      if (this.state.clickCount === -1) {
        this.setState(state => ({
          A3: '',
          clickCount: -1 }));
      } else
      {this.setState(state => ({
          A3: '',
          clickCount: 1 }));

      }
    }


    // If A4
    if (document.activeElement.id == "A4" && acceptableEntries.indexOf(event.key) > -1) {
      this.setState(state => ({
        A4: event.key.toUpperCase() }));

      if (this.state.clickCount === 1) {
        setTimeout(() => {
          this.handleRight();
          this.setState(state => ({
            clickCount: 1 }));

        },
        1);

      } else
      {
        setTimeout(() => {
          this.handleDown();
          this.setState(state => ({
            clickCount: -1 }));

        },
        1);

      }
    }
    if (document.activeElement.id == "A4" && event.key == 'Backspace') {
      if (this.state.clickCount === -1) {
        this.setState(state => ({
          A4: '',
          clickCount: -1 }));
      } else
      {this.setState(state => ({
          A4: '',
          clickCount: 1 }));

      }
    }

    if (document.activeElement.id == "A5" && acceptableEntries.indexOf(event.key) > -1) {
      this.setState(state => ({
        A5: event.key.toUpperCase() }));

      if (this.state.clickCount === -1) {
        setTimeout(() => {
          this.handleDown();
          this.setState(state => ({
            clickCount: -1 }));

        },
        1);

      }
    }
    if (document.activeElement.id == "A5" && event.key == 'Backspace') {
      if (this.state.clickCount === -1) {
        this.setState(state => ({
          A5: '',
          clickCount: -1 }));
      } else
      {this.setState(state => ({
          A5: '',
          clickCount: 1 }));

      }
    }

    if (document.activeElement.id == "B1" && acceptableEntries.indexOf(event.key) > -1) {
      this.setState(state => ({
        B1: event.key.toUpperCase() }));

      if (this.state.clickCount === 1) {
        setTimeout(() => {
          this.handleRight();
          this.setState(state => ({
            clickCount: 1 }));

        },
        1);

      } else
      {
        setTimeout(() => {
          this.handleUp();this.handleDown();
          this.setState(state => ({
            clickCount: -1 }));

        },
        1);

      }
    }
    if (document.activeElement.id == "B1" && event.key == 'Backspace') {
      if (this.state.clickCount === -1) {
        this.setState(state => ({
          B1: '',
          clickCount: -1 }));
      } else
      {this.setState(state => ({
          B1: '',
          clickCount: 1 }));

      }
    }

    if (document.activeElement.id == "B2" && acceptableEntries.indexOf(event.key) > -1) {
      this.setState(state => ({
        B2: event.key.toUpperCase() }));

      if (this.state.clickCount === 1) {
        setTimeout(() => {
          this.handleRight();
          this.setState(state => ({
            clickCount: 1 }));

        },
        1);

      } else
      {
        setTimeout(() => {
          this.handleUp();this.handleDown();
          this.setState(state => ({
            clickCount: -1 }));

        },
        1);

      }
    }
    if (document.activeElement.id == "B2" && event.key == 'Backspace') {
      if (this.state.clickCount === -1) {
        this.setState(state => ({
          B2: '',
          clickCount: -1 }));
      } else
      {this.setState(state => ({
          B2: '',
          clickCount: 1 }));

      }
    }

    if (document.activeElement.id == "B3" && acceptableEntries.indexOf(event.key) > -1) {
      this.setState(state => ({
        B3: event.key.toUpperCase() }));

      if (this.state.clickCount === 1) {
        setTimeout(() => {
          this.handleRight();
          this.setState(state => ({
            clickCount: 1 }));

        },
        1);

      } else
      {
        setTimeout(() => {
          this.handleDown();
          this.setState(state => ({
            clickCount: -1 }));

        },
        1);

      }
    }
    if (document.activeElement.id == "B3" && event.key == 'Backspace') {
      if (this.state.clickCount === -1) {
        this.setState(state => ({
          B3: '',
          clickCount: -1 }));
      } else
      {this.setState(state => ({
          B3: '',
          clickCount: 1 }));

      }
    }

    if (document.activeElement.id == "B4" && acceptableEntries.indexOf(event.key) > -1) {
      this.setState(state => ({
        B4: event.key.toUpperCase() }));

      if (this.state.clickCount === 1) {
        setTimeout(() => {
          this.handleLeft();this.handleRight();
          this.setState(state => ({
            clickCount: 1 }));

        },
        1);

      } else
      {
        setTimeout(() => {
          this.handleDown();
          this.setState(state => ({
            clickCount: -1 }));

        },
        1);

      }
    }
    if (document.activeElement.id == "B4" && event.key == 'Backspace') {
      if (this.state.clickCount === -1) {
        this.setState(state => ({
          B4: '',
          clickCount: -1 }));
      } else
      {this.setState(state => ({
          B4: '',
          clickCount: 1 }));

      }
    }

    if (document.activeElement.id == "B5" && acceptableEntries.indexOf(event.key) > -1) {
      this.setState(state => ({
        B5: event.key.toUpperCase() }));

      if (this.state.clickCount === -1) {
        setTimeout(() => {
          this.handleDown();
          this.setState(state => ({
            clickCount: -1 }));

        },
        1);

      }
    }
    if (document.activeElement.id == "B5" && event.key == 'Backspace') {
      if (this.state.clickCount === -1) {
        this.setState(state => ({
          B5: '',
          clickCount: -1 }));
      } else
      {this.setState(state => ({
          B5: '',
          clickCount: 1 }));

      }
    }
    if (document.activeElement.id == "C1" && acceptableEntries.indexOf(event.key) > -1) {
      this.setState(state => ({
        C1: event.key.toUpperCase() }));

      if (this.state.clickCount === 1) {
        setTimeout(() => {
          this.handleRight();
          this.setState(state => ({
            clickCount: 1 }));

        },
        1);

      } else
      {
        setTimeout(() => {
          this.handleDown();
          this.setState(state => ({
            clickCount: -1 }));

        },
        1);

      }
    }
    if (document.activeElement.id == "C1" && event.key == 'Backspace') {
      if (this.state.clickCount === -1) {
        this.setState(state => ({
          C1: '',
          clickCount: -1 }));
      } else
      {this.setState(state => ({
          C1: '',
          clickCount: 1 }));

      }
    }

    if (document.activeElement.id == "C2" && acceptableEntries.indexOf(event.key) > -1) {
      this.setState(state => ({
        C2: event.key.toUpperCase() }));

      if (this.state.clickCount === 1) {
        setTimeout(() => {
          this.handleRight();
          this.setState(state => ({
            clickCount: 1 }));

        },
        1);

      } else
      {
        setTimeout(() => {
          this.handleDown();
          this.setState(state => ({
            clickCount: -1 }));

        },
        1);

      }
    }
    if (document.activeElement.id == "C2" && event.key == 'Backspace') {
      if (this.state.clickCount === -1) {
        this.setState(state => ({
          C2: '',
          clickCount: -1 }));
      } else
      {this.setState(state => ({
          C2: '',
          clickCount: 1 }));

      }
    }

    if (document.activeElement.id == "C3" && acceptableEntries.indexOf(event.key) > -1) {
      this.setState(state => ({
        C3: event.key.toUpperCase() }));

      if (this.state.clickCount === 1) {
        setTimeout(() => {
          this.handleRight();
          this.setState(state => ({
            clickCount: 1 }));

        },
        1);

      } else
      {
        setTimeout(() => {
          this.handleDown();
          this.setState(state => ({
            clickCount: -1 }));

        },
        1);

      }
    }
    if (document.activeElement.id == "C3" && event.key == 'Backspace') {
      if (this.state.clickCount === -1) {
        this.setState(state => ({
          C3: '',
          clickCount: -1 }));
      } else
      {this.setState(state => ({
          C3: '',
          clickCount: 1 }));

      }
    }

    if (document.activeElement.id == "C4" && acceptableEntries.indexOf(event.key) > -1) {
      this.setState(state => ({
        C4: event.key.toUpperCase() }));

      if (this.state.clickCount === 1) {
        setTimeout(() => {
          this.handleRight();
          this.setState(state => ({
            clickCount: 1 }));

        },
        1);

      } else
      {
        setTimeout(() => {
          this.handleDown();
          this.setState(state => ({
            clickCount: -1 }));

        },
        1);

      }
    }
    if (document.activeElement.id == "C4" && event.key == 'Backspace') {
      if (this.state.clickCount === -1) {
        this.setState(state => ({
          C4: '',
          clickCount: -1 }));
      } else
      {this.setState(state => ({
          C4: '',
          clickCount: 1 }));

      }
    }

    if (document.activeElement.id == "C5" && acceptableEntries.indexOf(event.key) > -1) {
      this.setState(state => ({
        C5: event.key.toUpperCase() }));

      if (this.state.clickCount === -1) {
        setTimeout(() => {
          this.handleDown();
          this.setState(state => ({
            clickCount: -1 }));

        },
        1);

      }
    }
    if (document.activeElement.id == "C5" && event.key == 'Backspace') {
      if (this.state.clickCount === -1) {
        this.setState(state => ({
          C5: '',
          clickCount: -1 }));
      } else
      {this.setState(state => ({
          C5: '',
          clickCount: 1 }));

      }
    }

    if (document.activeElement.id == "D1" && acceptableEntries.indexOf(event.key) > -1) {
      this.setState(state => ({
        D1: event.key.toUpperCase() }));

      if (this.state.clickCount === 1) {
        setTimeout(() => {
          this.handleRight();
          this.setState(state => ({
            clickCount: 1 }));

        },
        1);

      } else
      {
        setTimeout(() => {
          this.handleRight();
          this.setState(state => ({
            clickCount: 1 }));

        },
        1);

      }
    }
    if (document.activeElement.id == "D1" && event.key == 'Backspace') {
      if (this.state.clickCount === -1) {
        this.setState(state => ({
          D1: '',
          clickCount: -1 }));
      } else
      {this.setState(state => ({
          D1: '',
          clickCount: 1 }));

      }
    }

    if (document.activeElement.id == "D2" && acceptableEntries.indexOf(event.key) > -1) {
      this.setState(state => ({
        D2: event.key.toUpperCase() }));

      if (this.state.clickCount === 1) {
        setTimeout(() => {
          this.handleRight();
          this.setState(state => ({
            clickCount: 1 }));

        },
        1);

      } else
      {
        setTimeout(() => {
          this.handleDown();
          this.setState(state => ({
            clickCount: -1 }));

        },
        1);

      }
    }
    if (document.activeElement.id == "D2" && event.key == 'Backspace') {
      if (this.state.clickCount === -1) {
        this.setState(state => ({
          D2: '',
          clickCount: -1 }));
      } else
      {this.setState(state => ({
          D2: '',
          clickCount: 1 }));

      }
    }

    if (document.activeElement.id == "D3" && acceptableEntries.indexOf(event.key) > -1) {
      this.setState(state => ({
        D3: event.key.toUpperCase() }));

      if (this.state.clickCount === 1) {
        setTimeout(() => {
          this.handleRight();
          this.setState(state => ({
            clickCount: 1 }));

        },
        1);

      } else
      {
        setTimeout(() => {
          this.handleDown();
          this.setState(state => ({
            clickCount: -1 }));

        },
        1);

      }
    }
    if (document.activeElement.id == "D3" && event.key == 'Backspace') {
      if (this.state.clickCount === -1) {
        this.setState(state => ({
          D3: '',
          clickCount: -1 }));
      } else
      {this.setState(state => ({
          D3: '',
          clickCount: 1 }));

      }
    }

    if (document.activeElement.id == "D4" && acceptableEntries.indexOf(event.key) > -1) {
      this.setState(state => ({
        D4: event.key.toUpperCase() }));

      if (this.state.clickCount === 1) {
        setTimeout(() => {
          this.handleRight();
          this.setState(state => ({
            clickCount: 1 }));

        },
        1);

      } else
      {
        setTimeout(() => {
          this.handleUp();this.handleDown();
          this.setState(state => ({
            clickCount: -1 }));

        },
        1);

      }
    }
    if (document.activeElement.id == "D4" && event.key == 'Backspace') {
      if (this.state.clickCount === -1) {
        this.setState(state => ({
          D4: '',
          clickCount: -1 }));
      } else
      {this.setState(state => ({
          D4: '',
          clickCount: 1 }));

      }
    }

    if (document.activeElement.id == "D5" && acceptableEntries.indexOf(event.key) > -1) {
      this.setState(state => ({
        D5: event.key.toUpperCase() }));

      if (this.state.clickCount === -1) {
        setTimeout(() => {
          this.handelUp();this.handleDown();
          this.setState(state => ({
            clickCount: -1 }));

        },
        1);

      }
    }
    if (document.activeElement.id == "D5" && event.key == 'Backspace') {
      if (this.state.clickCount === -1) {
        this.setState(state => ({
          D5: '',
          clickCount: -1 }));
      } else
      {this.setState(state => ({
          D5: '',
          clickCount: 1 }));

      }
    }

    if (document.activeElement.id == "E1" && acceptableEntries.indexOf(event.key) > -1) {
      this.setState(state => ({
        E1: event.key.toUpperCase() }));

      if (this.state.clickCount === 1) {
        setTimeout(() => {
          this.handleRight();
          this.setState(state => ({
            clickCount: 1 }));

        },
        1);

      }
    }
    if (document.activeElement.id == "E1" && event.key == 'Backspace') {
      if (this.state.clickCount === -1) {
        this.setState(state => ({
          E1: '',
          clickCount: -1 }));
      } else
      {this.setState(state => ({
          E1: '',
          clickCount: 1 }));

      }
    }

    if (document.activeElement.id == "E2" && acceptableEntries.indexOf(event.key) > -1) {
      this.setState(state => ({
        E2: event.key.toUpperCase() }));

      if (this.state.clickCount === 1) {
        setTimeout(() => {
          this.handleRight();
          this.setState(state => ({
            clickCount: 1 }));

        },
        1);

      }
    }
    if (document.activeElement.id == "E2" && event.key == 'Backspace') {
      if (this.state.clickCount === -1) {
        this.setState(state => ({
          E2: '',
          clickCount: -1 }));
      } else
      {this.setState(state => ({
          E2: '',
          clickCount: 1 }));

      }
    }

    if (document.activeElement.id == "E3" && acceptableEntries.indexOf(event.key) > -1) {
      this.setState(state => ({
        E3: event.key.toUpperCase() }));

      if (this.state.clickCount === 1) {
        setTimeout(() => {
          this.handleLeft();this.handleRight();
          this.setState(state => ({
            clickCount: 1 }));

        },
        1);

      }
    }
    if (document.activeElement.id == "E3" && event.key == 'Backspace') {
      if (this.state.clickCount === -1) {
        this.setState(state => ({
          E3: '',
          clickCount: -1 }));
      } else
      {this.setState(state => ({
          E3: '',
          clickCount: 1 }));

      }
    }

    if (document.activeElement.id == "E4" && acceptableEntries.indexOf(event.key) > -1) {
      this.setState(state => ({
        E4: event.key.toUpperCase() }));

      if (this.state.clickCount === 1) {
        setTimeout(() => {
          this.handleRight();
          this.setState(state => ({
            clickCount: 1 }));

        },
        1);

      }
    }
    if (document.activeElement.id == "E4" && event.key == 'Backspace') {
      if (this.state.clickCount === -1) {
        this.setState(state => ({
          E4: '',
          clickCount: -1 }));
      } else
      {this.setState(state => ({
          E4: '',
          clickCount: 1 }));

      }
    }


    if (document.activeElement.id == "E5" && acceptableEntries.indexOf(event.key) > -1) {
      this.setState(state => ({
        E5: event.key.toUpperCase() }));

    }
    if (document.activeElement.id == "E5" && event.key == 'Backspace') {
      if (this.state.clickCount === -1) {
        this.setState(state => ({
          E5: '',
          clickCount: -1 }));
      } else
      {this.setState(state => ({
          E5: '',
          clickCount: 1 }));

      }
    }


  }




  changeDirection(event) {

    this.setState(state => ({
      clickCount: this.state.clickCount * -1 }));



    if (this.state.clickCount === 1) {

      switch (event.currentTarget.id) {
        case cellArray[0]:
        case cellArray[1]:
        case cellArray[2]:
        case cellArray[3]:
        case cellArray[4]:
          this.setState(state => ({
            1: '',
            2: '',
            3: '',
            4: '',
            5: '',
            6: '',
            A: 'selected',
            B: '',
            C: '',
            D: '',
            E: '',
            ActiveHint: hintArr[0] }));}


      switch (event.currentTarget.id) {
        case cellArray[5]:
        case cellArray[6]:
        case cellArray[7]:
        case cellArray[8]:
        case cellArray[9]:
          this.setState(state => ({
            1: '',
            2: '',
            3: '',
            4: '',
            5: '',
            6: '',
            A: '',
            B: 'selected',
            C: '',
            D: '',
            E: '',
            ActiveHint: hintArr[1] }));}


      switch (event.currentTarget.id) {
        case cellArray[10]:
        case cellArray[11]:
        case cellArray[12]:
        case cellArray[13]:
        case cellArray[14]:
          this.setState(state => ({
            1: '',
            2: '',
            3: '',
            4: '',
            5: '',
            6: '',
            A: '',
            B: '',
            C: 'selected',
            D: '',
            E: '',
            ActiveHint: hintArr[2] }));}


      switch (event.currentTarget.id) {
        case cellArray[15]:
        case cellArray[16]:
        case cellArray[17]:
        case cellArray[18]:
        case cellArray[19]:
          this.setState(state => ({
            1: '',
            2: '',
            3: '',
            4: '',
            5: '',
            6: '',
            A: '',
            B: '',
            C: '',
            D: 'selected',
            E: '',
            ActiveHint: hintArr[3] }));}


      switch (event.currentTarget.id) {
        case cellArray[20]:
        case cellArray[21]:
        case cellArray[22]:
        case cellArray[23]:
        case cellArray[24]:
          this.setState(state => ({
            1: '',
            2: '',
            3: '',
            4: '',
            5: '',
            6: '',
            A: '',
            B: '',
            C: '',
            D: '',
            E: 'selected',
            ActiveHint: hintArr[4] }));}


    } else


    if (this.state.clickCount === -1) {

      switch (event.currentTarget.id) {
        case cellArray[0]:
        case cellArray[5]:
        case cellArray[10]:

          this.setState(state => ({
            1: 'selected',
            2: '',
            3: '',
            4: '',
            5: '',
            6: '',
            A: '',
            B: '',
            C: '',
            D: '',
            E: '',
            ActiveHint: hintArr[5] }));}


      switch (event.currentTarget.id) {
        case cellArray[1]:
        case cellArray[6]:
        case cellArray[11]:

          this.setState(state => ({
            1: '',
            2: 'selected',
            3: '',
            4: '',
            5: '',
            6: '',
            A: '',
            B: '',
            C: '',
            D: '',
            E: '',
            ActiveHint: hintArr[6] }));}


      switch (event.currentTarget.id) {
        case cellArray[2]:
        case cellArray[7]:
        case cellArray[12]:
        case cellArray[17]:
        case cellArray[22]:
          this.setState(state => ({
            1: '',
            2: '',
            3: 'selected',
            4: '',
            5: '',
            6: '',
            A: '',
            B: '',
            C: '',
            D: '',
            E: '',
            ActiveHint: hintArr[7] }));}


      switch (event.currentTarget.id) {
        case cellArray[3]:
        case cellArray[8]:
        case cellArray[13]:
        case cellArray[18]:
        case cellArray[23]:
          this.setState(state => ({
            1: '',
            2: '',
            3: '',
            4: 'selected',
            5: '',
            6: '',
            A: '',
            B: '',
            C: '',
            D: '',
            E: '',
            ActiveHint: hintArr[8] }));}


      switch (event.currentTarget.id) {
        case cellArray[4]:
        case cellArray[9]:
        case cellArray[14]:
        case cellArray[19]:
        case cellArray[24]:
          this.setState(state => ({
            1: '',
            2: '',
            3: '',
            4: '',
            5: 'selected',
            6: '',
            A: '',
            B: '',
            C: '',
            D: '',
            E: '',
            ActiveHint: hintArr[9] }));}


      switch (event.currentTarget.id) {
        case cellArray[16]:
        case cellArray[21]:

          this.setState(state => ({
            1: '',
            2: '',
            3: '',
            4: '',
            5: '',
            6: 'selected',
            A: '',
            B: '',
            C: '',
            D: '',
            E: '',
            ActiveHint: hintArr[10] }));}


    }

  }


  handleClick(event) {


    this.setState(state => ({
      clickCount: this.state.clickCount * -1 }));



    if (this.state.clickCount === 1) {

      switch (event.currentTarget.id) {
        case cellArray[0]:
        case cellArray[1]:
        case cellArray[2]:
        case cellArray[3]:
        case cellArray[4]:
          this.setState(state => ({
            1: '',
            2: '',
            3: '',
            4: '',
            5: '',
            6: '',
            A: 'selected',
            B: '',
            C: '',
            D: '',
            E: '',
            ActiveHint: hintArr[0] }));}


      switch (event.currentTarget.id) {
        case cellArray[5]:
        case cellArray[6]:
        case cellArray[7]:
        case cellArray[8]:
        case cellArray[9]:
          this.setState(state => ({
            1: '',
            2: '',
            3: '',
            4: '',
            5: '',
            6: '',
            A: '',
            B: 'selected',
            C: '',
            D: '',
            E: '',
            ActiveHint: hintArr[1] }));}


      switch (event.currentTarget.id) {
        case cellArray[10]:
        case cellArray[11]:
        case cellArray[12]:
        case cellArray[13]:
        case cellArray[14]:
          this.setState(state => ({
            1: '',
            2: '',
            3: '',
            4: '',
            5: '',
            6: '',
            A: '',
            B: '',
            C: 'selected',
            D: '',
            E: '',
            ActiveHint: hintArr[2] }));}


      switch (event.currentTarget.id) {
        case cellArray[15]:
        case cellArray[16]:
        case cellArray[17]:
        case cellArray[18]:
        case cellArray[19]:
          this.setState(state => ({
            1: '',
            2: '',
            3: '',
            4: '',
            5: '',
            6: '',
            A: '',
            B: '',
            C: '',
            D: 'selected',
            E: '',
            ActiveHint: hintArr[3] }));}


      switch (event.currentTarget.id) {
        case cellArray[20]:
        case cellArray[21]:
        case cellArray[22]:
        case cellArray[23]:
        case cellArray[24]:
          this.setState(state => ({
            1: '',
            2: '',
            3: '',
            4: '',
            5: '',
            6: '',
            A: '',
            B: '',
            C: '',
            D: '',
            E: 'selected',
            ActiveHint: hintArr[4] }));}


    } else


    if (this.state.clickCount === -1) {

      switch (event.currentTarget.id) {
        case cellArray[0]:
        case cellArray[5]:
        case cellArray[10]:

          this.setState(state => ({
            1: 'selected',
            2: '',
            3: '',
            4: '',
            5: '',
            6: '',
            A: '',
            B: '',
            C: '',
            D: '',
            E: '',
            ActiveHint: hintArr[5] }));}


      switch (event.currentTarget.id) {
        case cellArray[1]:
        case cellArray[6]:
        case cellArray[11]:

          this.setState(state => ({

            1: '',
            2: 'selected',
            3: '',
            4: '',
            5: '',
            6: '',
            A: '',
            B: '',
            C: '',
            D: '',
            E: '',
            ActiveHint: hintArr[6] }));}


      switch (event.currentTarget.id) {
        case cellArray[2]:
        case cellArray[7]:
        case cellArray[12]:
        case cellArray[17]:
        case cellArray[22]:
          this.setState(state => ({
            1: '',
            2: '',
            3: 'selected',
            4: '',
            5: '',
            6: '',
            A: '',
            B: '',
            C: '',
            D: '',
            E: '',
            ActiveHint: hintArr[7] }));}


      switch (event.currentTarget.id) {
        case cellArray[3]:
        case cellArray[8]:
        case cellArray[13]:
        case cellArray[18]:
        case cellArray[23]:
          this.setState(state => ({
            1: '',
            2: '',
            3: '',
            4: 'selected',
            5: '',
            6: '',
            A: '',
            B: '',
            C: '',
            D: '',
            E: '',
            ActiveHint: hintArr[8] }));}


      switch (event.currentTarget.id) {
        case cellArray[4]:
        case cellArray[9]:
        case cellArray[14]:
        case cellArray[19]:
        case cellArray[24]:
          this.setState(state => ({
            1: '',
            2: '',
            3: '',
            4: '',
            5: 'selected',
            6: '',
            A: '',
            B: '',
            C: '',
            D: '',
            E: '',
            ActiveHint: hintArr[9] }));}


      switch (event.currentTarget.id) {
        case cellArray[16]:
        case cellArray[21]:

          this.setState(state => ({
            1: '',
            2: '',
            3: '',
            4: '',
            5: '',
            6: 'selected',
            A: '',
            B: '',
            C: '',
            D: '',
            E: '',
            ActiveHint: hintArr[10] }));}


    }

  }


  render() {


    function formatMinutes(x) {if (x <= 9 && x !== 0) {return '0' + x.toString();
      } else {return x;}}

    function formatSeconds(x) {if (x <= 9) {return '0' + x.toString();
      } else {return x;}}

    console.log(this.state);

    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/

      React.createElement("div", { id: "navDiv" }, /*#__PURE__*/
      React.createElement("nav", { id: "games" }, /*#__PURE__*/
      React.createElement("div", { id: "threeBars" }, /*#__PURE__*/React.createElement("i", { class: "fa-solid fa-bars" })), /*#__PURE__*/
      React.createElement("div", null, /*#__PURE__*/React.createElement("img", { id: "nyt-logo", src: "https://upload.wikimedia.org/wikipedia/commons/5/5f/New_York_Times_T_icon.svg" }), /*#__PURE__*/React.createElement("label", { id: "navGamesText" }, " Games")), /*#__PURE__*/



      React.createElement("div", { id: "navRight" }, /*#__PURE__*/
      React.createElement("button", { id: "subscribeBtn" }, " SUBSCRIBE"), /*#__PURE__*/
      React.createElement("button", { id: "loginBtn" }, "LOG IN")))), /*#__PURE__*/





      React.createElement("div", { id: "gameHeader" }, /*#__PURE__*/
      React.createElement("p1", { id: "miniHeader" }, "The Mini Crossword"), /*#__PURE__*/

      React.createElement("p2", { id: "date" }, new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric' }))), /*#__PURE__*/


      React.createElement("h3", { id: "author" }, "By Wyna Liu"), /*#__PURE__*/
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("div", { id: "gameAndControls", class: this.displayIfPlaying(this.state.timerRunning) }, /*#__PURE__*/

      React.createElement("div", { class: "popUp" }, /*#__PURE__*/
      React.createElement("div", { class: this.state.popUp[0] }, /*#__PURE__*/
      React.createElement("div", { class: "insideIconDiamond", id: "diamondTop" }), /*#__PURE__*/
      React.createElement("div", { class: "insideIconDiamond", id: "diamondBottom" }), /*#__PURE__*/
      React.createElement("div", { class: "insideIconDiamond", id: "diamondLeft" }), /*#__PURE__*/
      React.createElement("div", { class: "insideIconDiamond", id: "diamondRight" })), /*#__PURE__*/

      React.createElement("h1", { id: "popUpHeader" }, this.state.popUp[1]), /*#__PURE__*/
      React.createElement("h2", { id: "popUpSubHeader" }, this.state.popUp[2]), /*#__PURE__*/
      React.createElement("button", { class: "continueBtn", onClick: this.startTimer }, this.state.popUp[3]), /*#__PURE__*/

      React.createElement("a", { id: "juegaSinCuenta", href: "#", onClick: this.startTimer }, this.state.popUp[4]), /*#__PURE__*/
      React.createElement("p1", { id: "popUpDate" }, this.state.popUp[5]), /*#__PURE__*/
      React.createElement("p1", { id: "popUpAuthor" }, this.state.popUp[6]))), /*#__PURE__*/



      React.createElement("nav", { id: "controlsNav" }, /*#__PURE__*/

      React.createElement("div", { id: "toolsNavLeft" }, /*#__PURE__*/
      React.createElement("button", { id: "cog", class: "fa fa-cog btnIcon" })), /*#__PURE__*/


      React.createElement("div", { id: "toolsNavCenter" }, /*#__PURE__*/
      React.createElement("label", { id: "timer" }, '   ' + formatMinutes(Math.floor(this.state.timePassed / 60)) + ':' + formatSeconds(this.state.timePassed % 60)), /*#__PURE__*/
      React.createElement("button", { onClick: this.stopTimer, id: "pause", class: "fa fa-pause btnIcon" })), /*#__PURE__*/


      React.createElement("div", { id: "toolsNavRight" }, /*#__PURE__*/
      React.createElement("button", { class: "toolsNavBtn" }, "Rebus"), /*#__PURE__*/
      React.createElement("button", { class: "toolsNavBtn" }, "Clear"), /*#__PURE__*/
      React.createElement("button", { class: "toolsNavBtn" }, "Reveal"), /*#__PURE__*/
      React.createElement("button", { class: "toolsNavBtn" }, "Check"), /*#__PURE__*/
      React.createElement("i", { id: "pencil", class: "btnIcon fa-sharp fa-solid fa-pencil" }))), /*#__PURE__*/




      React.createElement("div", { id: "below-header" }, /*#__PURE__*/

      React.createElement("div", { class: "left" }, /*#__PURE__*/
      React.createElement("h1", { id: "headerHint" }, /*#__PURE__*/React.createElement("span", { class: "hintLabel" }, this.state.ActiveHint.slice(0, 3)), /*#__PURE__*/React.createElement("span", { id: "bigLabel" }, this.state.ActiveHint.slice(3, this.state.ActiveHint.length))), /*#__PURE__*/

      React.createElement("div", { class: "game" }, /*#__PURE__*/


      React.createElement("div", { class: "container" }, /*#__PURE__*/
      React.createElement("label", { class: "numLab1", id: "label1down" }, "1"), /*#__PURE__*/React.createElement("input", { id: "A1", name: "A1", value: this.state.A1, class: this.state['A'] + this.state[1] + ' cell' + ' topCells' + ' leftCells', maxlength: "1", onSelect: this.handleClick, onClick: this.changeDirection }), /*#__PURE__*/

      React.createElement("label", { class: "numLab2", id: "label1down" }, "2"), /*#__PURE__*/React.createElement("input", { id: "A2", value: this.state.A2, class: this.state['A'] + this.state[2] + ' cell' + ' topCells', maxlength: "1", onSelect: this.handleClick, onClick: this.changeDirection }), /*#__PURE__*/

      React.createElement("input", { id: "A3", value: this.state.A3, class: "blackCell topCells", value: "" }), /*#__PURE__*/
      React.createElement("input", { id: "A4", value: this.state.A4, class: "blackCell topCells", value: "" }), /*#__PURE__*/
      React.createElement("input", { id: "A5", value: this.state.A5, class: "blackCell topCells rightCells", value: "" }), /*#__PURE__*/



      React.createElement("label", { class: "numLab3", id: "label1down" }, "3"), /*#__PURE__*/React.createElement("input", { id: "B1", value: this.state.B1, class: this.state['B'] + this.state[1] + ' cell' + ' leftCells', maxlength: "1", onSelect: this.handleClick, onClick: this.changeDirection }), /*#__PURE__*/

      React.createElement("input", { id: "B2", value: this.state.B2, class: this.state['B'] + this.state[2] + ' cell', maxlength: "1", onSelect: this.handleClick, onClick: this.changeDirection }), /*#__PURE__*/

      React.createElement("label", { class: "numLab4" }, "4"), " ", /*#__PURE__*/React.createElement("input", { id: "B3", value: this.state.B3, class: this.state['B'] + this.state[3] + ' cell', maxlength: "1", onSelect: this.handleClick, onClick: this.changeDirection }), /*#__PURE__*/
      React.createElement("label", { class: "numLab5" }, "5"), /*#__PURE__*/React.createElement("input", { id: "B4", value: this.state.B4, class: this.state['B'] + this.state[4] + ' cell', maxlength: "1", onSelect: this.handleClick, onClick: this.changeDirection }), /*#__PURE__*/
      React.createElement("input", { id: "B5", value: "", class: "blackCell rightCells" }), /*#__PURE__*/

      React.createElement("input", { id: "C1", value: "", class: "blackCell leftCells" }), /*#__PURE__*/
      React.createElement("input", { id: "C2", value: "", class: "blackCell" }), /*#__PURE__*/
      React.createElement("label", { class: "numLab6" }, "6"), /*#__PURE__*/React.createElement("input", { id: "C3", value: this.state.C3, class: this.state['C'] + this.state[3] + ' cell', maxlength: "1", onSelect: this.handleClick, onClick: this.changeDirection }), /*#__PURE__*/
      React.createElement("input", { id: "C4", value: this.state.C4, class: this.state['C'] + this.state[4] + ' cell', maxlength: "1", onSelect: this.handleClick, onClick: this.changeDirection }), /*#__PURE__*/
      React.createElement("label", { class: "numLab7" }, "7"), /*#__PURE__*/React.createElement("input", { id: "C5", value: this.state.C5, class: this.state['C'] + this.state[5] + ' cell' + ' rightCells', maxlength: "1", onSelect: this.handleClick, onClick: this.changeDirection }), /*#__PURE__*/

      React.createElement("label", { class: "numLab8" }, "8"), " ", /*#__PURE__*/React.createElement("input", { id: "D1", value: this.state.D1, class: this.state['D'] + ' cell' + ' leftCells', maxlength: "1", onSelect: this.handleClick, onClick: this.changeDirection }), /*#__PURE__*/
      React.createElement("label", { class: "numLab9" }, "9"), /*#__PURE__*/React.createElement("input", { id: "D2", value: this.state.D2, class: this.state['D'] + this.state[6] + ' cell', maxlength: "1", onSelect: this.handleClick, onClick: this.changeDirection }), /*#__PURE__*/
      React.createElement("input", { id: "D3", value: this.state.D3, class: this.state['D'] + this.state[3] + ' cell', maxlength: "1", onSelect: this.handleClick, onClick: this.changeDirection }), /*#__PURE__*/
      React.createElement("input", { id: "D4", value: this.state.D4, class: this.state['D'] + this.state[4] + ' cell', maxlength: "1", onSelect: this.handleClick, onClick: this.changeDirection }), /*#__PURE__*/
      React.createElement("input", { id: "D5", value: this.state.D5, class: this.state['D'] + this.state[5] + ' cell' + ' rightCells', maxlength: "1", onSelect: this.handleClick, onClick: this.changeDirection }), /*#__PURE__*/



      React.createElement("input", { id: "E1", class: "blackCell leftCells bottomCells" }), /*#__PURE__*/
      React.createElement("label", { class: "numLab10" }, "10"), " ", /*#__PURE__*/React.createElement("input", { id: "E2", value: this.state.E2, class: this.state['E'] + this.state[6] + ' cell' + ' bottomCells', maxlength: "1", onSelect: this.handleClick, onClick: this.changeDirection }), /*#__PURE__*/
      React.createElement("input", { id: "E3", value: this.state.E3, class: this.state['E'] + this.state[3] + ' cell' + ' bottomCells', maxlength: "1", onSelect: this.handleClick, onClick: this.changeDirection }), /*#__PURE__*/
      React.createElement("input", { id: "E4", class: "blackCell bottomCells" }), /*#__PURE__*/
      React.createElement("input", { id: "E5", class: "blackCell rightCells bottomCells" })))), /*#__PURE__*/



      React.createElement("div", { id: "right" }, /*#__PURE__*/
      React.createElement("div", { id: "acrossHints" }, /*#__PURE__*/
      React.createElement("h1", { id: "across" }, "ACROSS"), /*#__PURE__*/
      React.createElement("p1", { id: "Ahint", class: this.state['A'] }, /*#__PURE__*/React.createElement("span", { class: "boldNum" }, "1"), " Greeting"), /*#__PURE__*/
      React.createElement("div", null), /*#__PURE__*/
      React.createElement("p1", { id: "Bhint", class: this.state['B'] }, /*#__PURE__*/React.createElement("span", { class: "boldNum" }, "3"), " Little brother from Stranger Things"), /*#__PURE__*/
      React.createElement("div", null), /*#__PURE__*/
      React.createElement("p1", { id: "Chint", class: this.state['C'] }, /*#__PURE__*/React.createElement("span", { class: "boldNum" }, "6"), " Me and"), /*#__PURE__*/
      React.createElement("div", null), /*#__PURE__*/
      React.createElement("p1", { id: "Dhint", class: this.state['D'] }, /*#__PURE__*/React.createElement("span", { class: "boldNum" }, "8"), " Sea in Spanish + RY"), /*#__PURE__*/
      React.createElement("div", null), /*#__PURE__*/
      React.createElement("p1", { id: "Ehint", class: this.state['E'] }, /*#__PURE__*/React.createElement("span", { class: "boldNum" }, "10"), " You and")), /*#__PURE__*/

      React.createElement("div", { id: "downHints" }, /*#__PURE__*/
      React.createElement("h1", { id: "down" }, "DOWN"), /*#__PURE__*/
      React.createElement("p1", { id: "1hint", class: this.state['1'] }, /*#__PURE__*/React.createElement("span", { class: "boldNum" }, "10"), " Acronym for work after school"), /*#__PURE__*/
      React.createElement("div", null), /*#__PURE__*/
      React.createElement("p1", { id: "2hint", class: this.state['2'] }, /*#__PURE__*/React.createElement("span", { class: "boldNum" }, "2"), " __ Captain "), /*#__PURE__*/
      React.createElement("div", null), /*#__PURE__*/
      React.createElement("p1", { id: "3hint", class: this.state['3'] }, /*#__PURE__*/React.createElement("span", { class: "boldNum" }, "4"), " Harp-like instrument"), /*#__PURE__*/
      React.createElement("div", null), /*#__PURE__*/
      React.createElement("p1", { id: "4hint", class: this.state['4'] }, /*#__PURE__*/React.createElement("span", { class: "boldNum" }, "5"), " Hobbits star in this "), /*#__PURE__*/
      React.createElement("div", null), /*#__PURE__*/
      React.createElement("p1", { id: "5hint", class: this.state['5'] }, /*#__PURE__*/React.createElement("span", { class: "boldNum" }, "7"), " Exclamatory phrase in spanish"), /*#__PURE__*/
      React.createElement("div", null), /*#__PURE__*/
      React.createElement("p1", { id: "5hint", class: this.state['6'] }, /*#__PURE__*/React.createElement("span", { class: "boldNum" }, "9"), " I __ what I __"))))), /*#__PURE__*/




      React.createElement("div", { id: "pageBottom" }, /*#__PURE__*/
      React.createElement("h1", { id: "aboutHeader" }, "ABOUT NEW YORK TIMES GAMES"), /*#__PURE__*/
      React.createElement("p1", { id: "aboutParagraph" }, "Since the launch of The Crossword in 1942, The Times has captivated solvers by providing engaging word and logic games. In 2014, we introduced The Mini Crossword \u2014 followed by Spelling Bee, Letter Boxed, Tiles and Vertex. In early 2022, we proudly added Wordle to our collection. We strive to offer puzzles for all skill levels that everyone can enjoy playing every day. Subscribe now for unlimited access."))));





  }}


ReactDOM.render( /*#__PURE__*/React.createElement(MyComponent, null), document.getElementById('something'));