import React from 'react';

const ProjectServiceRow = ({attr, changeDetail, index, defaultValues}) => {
  return (
    <div 
        className={ attr === "Dev & Main" ? "dev-n-main detail-input" : `${attr} detail-input`.toLowerCase()} 
        style={{
            display:"flex",
            flexDirection:"column"
        }}>
        {index === 0 &&<label htmlFor={`${attr}`.toLowerCase()}>{attr}: </label>}
        <input 
            type="text" 
            name= { attr === "Dev & Main" ? "dev_n_main" : `${index} ${attr}`.toLowerCase() }
            id={ attr === "Dev & Main" ? "dev_n_main" : `${attr}`.toLowerCase() } 
            onChange={changeDetail} 
            style={{width:"50px", fontSize:"10px"}}
            placeholder={ attr === "Dev & Main" ? defaultValues["dev_n_main"] : defaultValues[attr.toLowerCase()]}
        />
    </div>
  )
}

export default ProjectServiceRow;