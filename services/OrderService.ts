import { Order } from '@/models/Order';
import axios from 'axios';

const API_URL = 'http://192.168.1.20:3000/api/orders';

// Créer une commande
const createOrder = async (orderData: Order) => {
  return axios.post(API_URL, orderData);
};

// Récupérer toutes les commandes
const getAllOrders = async () => {
  return axios.get(API_URL);
};

// Récupérer une commande par ID
const getOrderById = async (id: string) => {
  return axios.get(`${API_URL}/${id}`);
};

// Récupérer les commandes d’un utilisateur
const getOrdersByUser = async (userId: string) => {
  return axios.get(`${API_URL}/user/${userId}`);
};

// Mettre à jour une commande
const updateOrder = async (id: string, updatedData: Partial<Order>) => {
  return axios.put(`${API_URL}/${id}`, updatedData);
};

// Supprimer une commande
const deleteOrder = async (id: string) => {
  return axios.delete(`${API_URL}/${id}`);
};

// Export des services
const OrderService = {
  createOrder,
  getAllOrders,
  getOrderById,
  getOrdersByUser,
  updateOrder,
  deleteOrder,
};

export default OrderService;
