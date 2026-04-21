import { validationResult } from 'express-validator';
import * as orderService from '../services/orderService.js';

export async function createOrder(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const order = await orderService.createOrder(req.user.id, req.body.items);
    res.status(201).json(order);
  } catch (err) {
    if (err.status) return res.status(err.status).json({ error: err.message });
    next(err);
  }
}

export async function getOrders(req, res, next) {
  try {
    const orders = await orderService.getOrders(req.user);
    res.json(orders);
  } catch (err) {
    next(err);
  }
}

export async function getOrder(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const order = await orderService.getOrder(Number(req.params.id), req.user);
    res.json(order);
  } catch (err) {
    if (err.status) return res.status(err.status).json({ error: err.message });
    next(err);
  }
}

export async function updateOrder(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const order = await orderService.updateOrder(Number(req.params.id), req.body.status);
    res.json(order);
  } catch (err) {
    if (err.status) return res.status(err.status).json({ error: err.message });
    next(err);
  }
}

export async function deleteOrder(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const order = await orderService.deleteOrder(Number(req.params.id), req.user);
    res.json(order);
  } catch (err) {
    if (err.status) return res.status(err.status).json({ error: err.message });
    next(err);
  }
}