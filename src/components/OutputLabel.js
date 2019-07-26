import React from 'react';
  /**
   * 会話の内容をラベルとして表示する
   */
  export default class OutputLabel extends React.Component{
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
      const labels = this.props.messages.messageList.map((messages) => {
        return messages.map((message,index)=>{return this.determineClass(message,index)});
      });
      return(
        <div>
         {labels}
       </div>
      );
    }
  }