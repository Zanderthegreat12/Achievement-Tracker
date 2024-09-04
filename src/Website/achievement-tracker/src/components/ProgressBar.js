function ProgressBar({progress}){
    let progressVal = progress;
    if (progress < 8){
      progressVal = 8;
    }
  
    return(
      <div className= "ParentProgress">
        <div className = "ChildProgress" style = {{width: `${progressVal}%`}}>
          <span className = "ProgressText">{`${progress}%`}</span> 
        </div>
        {displayRibbon(false)}
      </div>

      
    )
  }


  function displayRibbon(display){
    if (display) {
      return (       <div className="ribbon">
        <img src={require("../images/steamRibbonTransparent.png")} width="75px"></img>
      </div>)
    }
  }
  export default ProgressBar;