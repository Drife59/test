import React from 'react'
import PropTypes from 'prop-types'


const TentativeCount = ({ tentativeCount, mistakeCount }) => (
    <div id="countSection">
      <div> Nombre de tentative(s): {tentativeCount} </div>
      <div > Nombre de connerie(s):  <span className="errorCount"> {mistakeCount} </span> </div>
    </div>
  )
  
  TentativeCount.propTypes = {
    tentativeCount: PropTypes.number.isRequired,
    mistakeCount: PropTypes.number.isRequired,
  }

  TentativeCount.defaultProps = {
    tentativeCount: 0,
    mistakeCount: 0,
  }

export default TentativeCount
