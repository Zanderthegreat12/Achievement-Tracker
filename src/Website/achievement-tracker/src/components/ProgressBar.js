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
      </div>
    )
  }

  export default ProgressBar;