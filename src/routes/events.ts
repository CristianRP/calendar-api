import { Router } from 'express';
import { validateJWT } from '../middlewares/validate-jwt';
import { deleteEvent, getEvents, postEvent, updateEvent } from '../controllers/events';
import { check } from 'express-validator';
import { validateFields } from '../middlewares/validate-fields';
import { isDate } from '../helpers/isDate';

const router = Router();

router.use(validateJWT);

router.get('/', getEvents);

router.post(
  '/',
  [
    check('title', 'Title is required').not().isEmpty(),
    check('start', 'Start date is required').custom(isDate),
    check('end', 'End date is required').custom(isDate),
    validateFields,
  ],
  postEvent
);

router.put('/:id', updateEvent);

router.delete('/:id', deleteEvent);

export { router as eventRouter }
