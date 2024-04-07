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

// We don't need this, but I leave it as a reference
// that we can update mongoose method and customize them

// EventSchema.method('toJSON', function() {
//   const { __v, _id, ...object } = this.toObject();
//   object.id = _id;
//   return object;
// })

export default model('Event', EventSchema);
