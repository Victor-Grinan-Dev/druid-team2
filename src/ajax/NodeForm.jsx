
import events from 'events';
import ajax from './ajax';
import { SevProject } from '../classes/sevProject';
import { useState } from 'react';

const superTest = new SevProject("supertest", "ali", "eric")

const emitter = new events.EventEmitter();

export const NodeForm = ({}) => {//druid=invoices, project, user, customer
  const [object, setObj] = useState(superTest)
    
    const handleSubmit = async (e) => {
      e.preventDefault()
      const node = {     
        type: [{
          target_id: "project",
          target_type: 'node_type',
        }],
        title: [{
          value: superTest.name,
        }],
        body: [{
          value: "hello", //stringify?
          format: 'plain_text',
        }],
        field_customer:[{
          value: superTest.customer, //stringify?
          format: 'plain_text',
        }],
        field_projects:[{
          value: superTest, //stringify?
          format: 'plain_text',
        }],
      };

      try {
        const axios = await ajax() 
        const response = await axios.post('/node/', node) 
        console.log('Node created: ', response.data)
        emitter.emit('NODE_UPDATED')
      } catch (e) {
        alert(e)
      }
    }
    const handleChange = (e) => {
      setObj({...object, [e.target.name]: e.target.value})
      
    }
    return (
        <div className="create-node-form">
          <h4>Create Node Form</h4>
          <form onSubmit={handleSubmit}>
            <label>Name</label>
            <br />
            <input type="text" name="name" onChange={handleChange}></input>
            <br />
            <label>Body</label>
            <br />
            {/*
            <textarea onChange={e => handleChange(e, 'body')}></textarea>
            */}
            <br />
            <button type="submit">Submit</button>
          </form>
        </div>
      )
}