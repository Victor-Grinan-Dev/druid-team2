
import events from 'events';
import ajax from './ajax';

const emitter = new events.EventEmitter();

export const NodeForm = ({data, target_id}) => {//druid=invoices, project, user, customer
    
    const handleSubmit = async (e) => {
      e.preventDefault()
      const node = {     
        type: [{
          target_id: target_id,
          target_type: 'node_type',
        }],
        title: [{
          value: data.title,
        }],
        body: [{
          value: data, //stringify?
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
    const handleChange = (e, propName) => {
      data[propName] = e.target.value
    }
    return (
        <div className="create-node-form">
          <h4>Create Node Form</h4>
          <form onSubmit={handleSubmit}>
            <label>Title</label>
            <br />
            <input type="text" onChange={e => handleChange(e, 'title')}></input>
            <br />
            <label>Body</label>
            <br />
            <textarea onChange={e => handleChange(e, 'body')}></textarea>
            <br />
            <button type="submit">Submit</button>
          </form>
        </div>
      )
}