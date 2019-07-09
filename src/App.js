import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import { FaRobot } from 'react-icons/fa';
import LoadingOverlay from 'react-loading-overlay';
import ScaleLoader from 'react-spinners/ScaleLoader';
import axios from 'axios';

function App() {
  /**
   * 入力テキストとボタンをrenderするコンポーネント
   */
  class Input extends React.Component{

    constructor(props){
      super(props);
      this.state = {
        textValue  : "",
        messages   : [],
        session_id : "",
        isActive : false
      }
      this.handleClick = this.handleClick.bind(this);
      this.changeText  = this.changeText.bind(this);
      this.createWatsonAssistantSession();
    };
    /**
     * Watson AssistantのセッションIDを取得して初期メッセージを表示する
     */
    createWatsonAssistantSession(){
      axios.get(process.env.REACT_APP_API_SERVER + "/create-session")
      .then((response) => {
        this.setState({
          session_id : response.data.session_id
        })
        this.fetchAssistant();
        return;
      })
      .then((error)=>{
        return error;
      });
    }
    /**
     * Watsonからの
     */
    fetchAssistant(){
      let params = new URLSearchParams();
      params.append('session_id',this.state.session_id);
      params.append('inputText',this.state.textValue);
      axios.post(process.env.REACT_APP_API_SERVER + "/conversation",params)
      .then((response) => {
        let conversation = [];
        const question = {kind: "question",text: this.state.textValue};
        let answer;
        if(response.data.output.generic[0]){
          answer   = {kind: "answer",text: response.data.output.generic[0].text};
        }else{
          answer   = {kind: "answer",text: "答えがありません"};
        }
        conversation.push(question,answer);
        this.setState({
          messages : this.state.messages.concat(conversation)
        });
        this.setState({
          isActive:false
        });  
      })
      .then((error)=>{
        return error;
      });  
    }
    handleClick(){
      this.setState({
        isActive:true
      });
      this.fetchAssistant();
    };
    changeText(e){
      this.setState({
        textValue: e.target.value
      });
    };
    render(){
      return (
        <div className="container">
            <LoadingOverlay active={this.state.isActive} spinner={<ScaleLoader /> } text='Watsonに問合せ中…'>
            <div className="row">
              <h3 className="offset-md-3 text-danger"><FaRobot /> Reactボット</h3>
            </div>
            <div className="row">
              <div className="offset-md-3 col-md-6">
                <input type="text" className="form-control" placeholder="入力してみてね" value={this.state.textValue}
                  onChange={this.changeText}></input>
              </div>
              <div className="col-md-2">
                <button className="btn btn-primary" onClick={this.handleClick}>Talk To Watson</button>
              </div>
            </div>
          </LoadingOverlay>
          <OutputLabel messages={this.state.messages} />
        </div>
      );
    }
  }
  /**
   * 会話の内容をラベルとして表示する
   */
  class OutputLabel extends React.Component{
    /**
     * 発信なのかbotからの応答なのかを判定してrenderする文字列を返す
     * @param {*} message 
     * @param {*} index 
     */
    determineClass(message,index){
      if(message.text===""){
        return;
      }
      let   bg    = (message.kind === "question")?"offset-md-3 col-md-5 bg-warning":"offset-md-4 col-md-5 bg-success";
      const actor = (message.kind === "question")?"あなた":"bot"
      return(
        <div className="row" key={index} >
          <div className={bg}>
            <label className="control-label" >
              {actor}：{message.text}
            </label>
          </div>
        </div>);
    };
    render(){
      const labels = this.props.messages.map((message, index) => {
        return this.determineClass(message,index);
      });
      return(
        <div>
         {labels}
       </div>
      );
    }
  }
  return ReactDOM.render(<Input />, document.getElementById('root'));
}

export default App;
