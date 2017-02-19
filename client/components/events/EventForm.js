import React from 'react';
import {connect} from 'react-redux';
import {createEvent, setEventState} from 'actions';
import TextFieldGroup from '../common/TextFieldGroup';

const EventForm = ({
  data,
  errors,
  isFetching,
  setEventState,
  createEvent
}) => {

  const onChange = (e) => {
    const {name, value} = e.target;
    let newStateErrors = {...errors};
    delete newStateErrors[name];

    setEventState({
      data: {...data, [name]: value},
      errors: newStateErrors

    });
  }

  const onSubmit = (e) => {
    e.preventDefault();
    createEvent(data);

  }

  return (
    <form onSubmit={onSubmit}>
      <h1>Create New Game Event</h1>

      <TextFieldGroup
        label="Event Title"
        name="title"
        value={data.title}
        onChange={onChange}
        error={errors.title}
      />

    <button type="submit" className="btn btn-primary">Create</button>
  </form>

  );
}

EventForm.propTypes = {
  createEvent: React.PropTypes.func.isRequired,
  setEventState: React.PropTypes.func.isRequired,
  data: React.PropTypes.object.isRequired,
  errors: React.PropTypes.object,
  isFetching: React.PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
  errors: state.event.errors,
  data: state.event.data,
  isFetching: state.event.isFetching
});

export default connect(mapStateToProps, {
  createEvent,
  setEventState
})(EventForm);
