
const Widget2Main = () => {
  const boxSize = 220;
  const listLength = Math.floor((220 / (17 + 10)) );
  
  return <div>
    <div style={{display: 'flex'}}>
    <div style={{
      width: '220px',
      height: '220px',
      backgroundColor: "var(---side-nav-bg-color)",
      borderRadius: '7px'
    }}>
      Widget 2
    </div>
    <div style={{
      flex: '1',
      paddingLeft: '10px'
    }}>
      {Array(listLength).fill(null).map((e, k) => {
        return <div key={k} style={{
          width: '100%',
          height: '17px',
          backgroundColor: "var(---side-nav-bg-color)",
          borderRadius: '7px',
          marginBottom: '10px'
        }}>

        </div>
      })}
    </div>
  </div>
  <br />
  <div style={{display: 'flex'}}>
    <div style={{
      width: '220px',
      height: '220px',
      backgroundColor: "var(---side-nav-bg-color)",
      borderRadius: '7px'
    }}>
      Widget 2
    </div>
    <div style={{
      flex: '1',
      paddingLeft: '10px'
    }}>
      {Array(listLength).fill(null).map((e, k) => {
        return <div key={k} style={{
          width: '100%',
          height: '17px',
          backgroundColor: "var(---side-nav-bg-color)",
          borderRadius: '7px',
          marginBottom: '10px'
        }}>

        </div>
      })}
    </div>
  </div>
  </div>
}

export default Widget2Main;