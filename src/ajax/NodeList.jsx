
import React from 'react';
import events from 'events';
import ajax from './ajax';

const emitter = new events.EventEmitter();

// component to show a list of nodes
export class NodeList extends React.Component {
  constructor() {
    super()
    this.state = {
      nodes: []
    }
    this.refresh = this.refresh.bind(this)
  }

  componentWillMount () {
    emitter.addListener('NODE_UPDATED', this.refresh)
  }

  componentWillUnmount () {
    emitter.addListener('NODE_UPDATED', this.refresh)
  }

  async componentDidMount() {
    await this.refresh()
  }

  async refresh () {
    // AJAX fetch server/node/rest?_format=json and setState with the response data
    try {
      const axios = await ajax() // wait for an initialized axios object
      const response = await axios.get('/node/rest') // wait for the POST AJAX request to complete
      console.log(response.data);
      if (response.data) {
        // setState will trigger repaint
        console.log(response.data);
        this.setState({ nodes: response.data })
      }
      } catch (e) {
      alert(e)
    }
  }

  render () {
    const deleteNode = async (nid) => {
      try {
        const axios = await ajax() // wait for an initialized axios object
        const response = await axios.delete(`/node/${nid}`) // wait for the DELETE AJAX request to complete
        console.log('Node deleted', response)
        emitter.emit('NODE_UPDATED')
      } catch (e) {
        alert(e)
      }
    }
     
    return (
      <table>
        <thead>
          <tr>
            <td>Title</td>
            <td>Content ID</td>
            <td>Operations</td>
          </tr>
        </thead>
        <tbody>
          {this.state.nodes.map((node, index) => {
            // iterate over the nodes array and map them to "li" elements
            return (
              <tr key={index}>
                <td><a href={node}>{node.title[0].value}</a></td>
                <td>{node.nid[0].value}</td>
                <td><button onClick={e => deleteNode(node.nid[0].value)}>x</button></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }
}
