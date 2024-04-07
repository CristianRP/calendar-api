import { Response } from 'express';
import Event from '../models/Event';
import User from '../models/User';
import { CustomRequest } from '../middlewares/validate-jwt';

export const getEvents = async(req: CustomRequest, res: Response) => {
  const events = await Event.find({ user: req.uid });
  
  res.json({
    ok: true,
    msg: 'getEvents',
    events,
  })
}

export const postEvent = async(req: CustomRequest, res: Response) => {
  const user = await User.findOne({ _id: req.uid });

  const { title, notes, start, end } = req.body;

  const event = await Event.create({
    title,
    notes,
    start: new Date(start),
    end: new Date(end),
    user,
  })

  res.json({
    ok: true,
    msg: 'createEvent',
    event,
  })
}

export const updateEvent = async(req: CustomRequest, res: Response) => {
  const { id } = req.params;

  console.log('Event->', id);
  
  const title = "Updated title";

  const event = await Event.findOneAndUpdate({ _id: id }, { title }, { new: true });

  res.json({
    ok: true,
    msg: 'putEvent',
    event,
  })
}

export const deleteEvent = async(req: CustomRequest, res: Response) => {
  const { id } = req.params;

  await Event.findOneAndDelete({ _id: id });

  res.json({
    ok: true,
    msg: 'deleteEvent',
  })
}
