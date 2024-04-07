import { Schema, Types, model } from 'mongoose';

const EventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  notes: String,
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  user: {
    type: Types.ObjectId,
    required: true,
    ref: 'User'
  }
});

export default model('Event', EventSchema);
