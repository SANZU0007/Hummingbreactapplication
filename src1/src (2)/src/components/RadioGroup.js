import React from 'react'
import "../styles/radio.css"

function RadioGroup({index, onSelect, selectedValue}) {

    const handleChange = (e) => {
        const value = e.target.value;
        onSelect(index, value);
    };
 

  return (
      <div>
        <div class="radio-group">
        {  
          [...Array(10).keys()].map((ind) => {
            return (
              <>
                <input 
                  type="radio" 
                  id={`radio${ind+1}${index}`} 
                  name={`rating${index}`} 
                  value={`${ind+1}`} 
                  onChange={handleChange}  
                  checked={selectedValue === `${ind+1}`}
                />
                <label for={`radio${ind+1}${index}`}>{`${ind+1}`}</label>
              </>
            )
          })
        }

      </div>    
    </div>
  )
}

export default RadioGroup