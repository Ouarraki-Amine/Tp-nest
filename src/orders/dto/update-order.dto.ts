import { PartialType } from '@nestjs/swagger';
import { CreateOrderDto } from './create-order.dto';

import { z } from 'zod';

export const updateOrderSchema = z.object({
  userId: z.string().min(1).optional(), // ID de l'utilisateur qui passe la commande
  totalAmount: z.number().min(0).optional(), // Montant total de la commande, doit être positif
  status:z.string().optional(),
});

export type UpdateOrderSchema = z.infer<typeof updateOrderSchema>;

export class UpdateOrderDto implements UpdateOrderSchema {
    totalAmount?: number;
    status: string;
}
