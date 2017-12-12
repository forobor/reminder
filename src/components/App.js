import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addReminder, deleteReminder, clearReminders } from '../actions'
import moment from 'moment'

class App extends Component {
  state = {
    text: '',
    date: ''
  }

  handleAddReminder = () => {
    const { text, date } = this.state;
    this.props.addReminder(text, date);
    this.setState({text: '', date: ''})

  }

  handleDeleteReminder = id => {
    this.props.deleteReminder(id)
  }

  render () {
  let buttonTitle= this.props.reminders.length === 1 ? 'Clear Reminder' : 'Clear Reminders' 
    return (
      <div className='App'>

        <div className="title"> Reminder </div>

        <div className='form-inline'>
          <div className='form-group'>
            <input
              className='form-control'
              placeholder='I have to do...'
              value={this.state.text}
              onChange={event => this.setState({text: event.target.value})}
            />
            by
            <input
              className='form-control'
              type='datetime-local'
              value={this.state.date}              
              onChange={event => this.setState({date: event.target.value})}
            />
          </div>
          <button 
            className="btn btn-success" 
            onClick={this.state.text && this.state.date && this.handleAddReminder}
          >
            Add
          </button>
        </div>

        <ul className = "list-group col-sm-4">
          {this.props.reminders.map(el => {
            return (
            <li className="list-group-item" key={el.id}>
              <div className="list-item">
                <div className="reminder-text">{el.text}</div>
                <div className="reminder-date"><em>{moment(new Date(el.date)).fromNow()}</em></div>
              </div>
              <div 
                className="list-item delete-button"
                onClick={() => this.handleDeleteReminder(el.id)}
              >&#x2715;</div>
            </li>
            )
          })}
        </ul>
        {this.props.reminders.length !== 0 &&
          <div 
            className = "btn btn-danger"
            onClick={() => this.props.clearReminders()}
          >{buttonTitle}</div>
        }
      </div>
    )     
  }  
}

const mapStateToProps = state => {
  return {
    reminders: state
  }
}


export default connect(mapStateToProps, { addReminder, deleteReminder, clearReminders })(App)
