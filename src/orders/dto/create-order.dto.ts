import { z } from 'zod';

export const createOrderSchema = z.object({
  userId: z.string().min(1), // ID de l'utilisateur qui passe la commande
  totalAmount: z.number().min(0), // Montant total de la commande, doit être positif
});

export type CreateOrderSchema = z.infer<typeof createOrderSchema>;

export class CreateOrderDto implements CreateOrderSchema {
  userId: string;
  totalAmount: number;
}