import { Response } from 'express';
import Event from '../models/Event';
import { CustomRequest } from '../middlewares/validate-jwt';

export const getEvents = async(req: CustomRequest, res: Response) => {
  try {
    const events = await Event.find({ user: req.uid }).populate('user', 'name');
    
    res.json({
      ok: true,
      msg: 'getEvents',
      events,
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'A server error ocurred.'
    })
  }
}

export const postEvent = async(req: CustomRequest, res: Response) => {
  const { title, notes, start, end } = req.body;

  try {
    const event = await Event.create({
      title,
      notes,
      start: new Date(start),
      end: new Date(end),
      user: req.uid,
    })

    res.status(200).json({
      ok: true,
      msg: 'createEvent',
      event,
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'A server error ocurred.'
    })
  }
}

export const updateEvent = async(req: CustomRequest, res: Response) => {
  const { id } = req.params;

  try {
    const event = await Event.findById(id);

    if (!event) {
      res.status(404).json({
        ok: false,
        msg: 'Event not found',
      })
    }

    if (event?.user.toString() !== req.uid) {
      res.status(401).json({
        ok: false,
        msg: 'Unauthorized action',
      })
    }

    const newEvent = {
      ...req.body,
      user: req.uid,
    }

    const updatedEvent = await Event.findByIdAndUpdate(id, newEvent, { new: true });

    res.status(200).json({
      ok: true,
      msg: 'createEvent',
      updatedEvent,
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'A server error ocurred.'
    })
  }
}

export const deleteEvent = async(req: CustomRequest, res: Response) => {
  const { id } = req.params;

  try {
    const event = await Event.findById(id);

    if (!event) {
      res.status(404).json({
        ok: false,
        msg: 'Event not found',
      })
    }

    if (event?.user.toString() !== req.uid) {
      res.status(401).json({
        ok: false,
        msg: 'Unauthorized action',
      })
    }

    await Event.findByIdAndDelete(id);
  
    res.json({
      ok: true,
      msg: 'Event deleted',
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'A server error ocurred.'
    })
  }
}
