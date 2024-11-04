import { orders } from './../database/database.schema';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { DrizzleService } from '@database/drizzle.service';
import { eq, sql } from 'drizzle-orm';

@Injectable()
export class OrdersService {

  constructor(private readonly drizzleService: DrizzleService){}

  

  async create(createOrderDto: CreateOrderDto) {
    const ordersQuery = this.drizzleService.db
      .insert(orders)
      .values({
        userId: sql.placeholder('userId'),
        orderDate: sql.placeholder('orderDate'),
        status: sql.placeholder('status'),
        totalAmount: sql.placeholder('totalAmount'),
      })
      .returning() // Retournez toutes les colonnes, ou spécifiez des colonnes
      .prepare('create_order');

      const createOrderPayload = {
        userId: createOrderDto.userId,
        orderDate: new Date(), // Date actuelle
        status: 'pending', // Statut par défaut
        totalAmount: createOrderDto.totalAmount,
      };

      const createdOrder = await ordersQuery
      .execute(createOrderPayload)

      return createdOrder
  }

  





  async findAll(filters: { status?: string; page?: number; limit?: number }) {
    const { status, page = 1, limit = 2 } = filters; // Valeurs par défaut
    const offset = (page - 1) * limit; // Calcul de l'offset
  
    const ordersQuery = this.drizzleService.db.query.orders.findMany({
      where: status ? eq(orders.status, status) : undefined, // Filtrer par statut si fourni
      limit, // Appliquer la limite
      offset, // Appliquer l'offset pour la pagination
    });
  
    const orderFound = await ordersQuery.execute();
  
    return orderFound;
  }
  

  async findOne(userId: string) {
     const orderQuery = this.drizzleService.db.query.orders
      .findMany({
        where: eq(orders.userId, sql.placeholder('userId'))
      })
      .prepare('find_one_order')
      const order = await orderQuery.execute({ userId });
    if (!order) {
      throw new NotFoundException(`User with userId ${userId} not found`);
    }

    return order;
  }

 /* async update(id: string, updateOrderDto: UpdateOrderDto) {
    const ordersQuery = this.drizzleService.db
      .update(orders)
      .set({
        totalAmount: updateOrderDto.totalAmount
          ? sql.placeholder('totalAmount')
          :undefined,
        status: updateOrderDto.status
          ? sql.placeholder('status')
          :undefined,
        updated_at: new Date(),
      })
      .where(eq(orders.id, sql.placeholder('id')))
      .returning({ id: orders.id })
      .prepare('update_order')

      const {...updateorder} = updateOrderDto;

      const updatedOrders = await ordersQuery.execute(updateorder);

      if (updatedOrders.length === 0) {
        throw new NotFoundException(`order with id ${id} not found`);
      }
  
      return updatedOrders[0];
  }
*/
  async remove(id: string) {

    const ordersQuery = this.drizzleService.db
      .delete(orders)
      .where(eq(orders.id, sql.placeholder('id')))
      .returning({ id: orders.id })
      .prepare('delete_order');

      const deletedOrder  = await ordersQuery.execute({ id });
      if (deletedOrder.length === 0) {

        throw new NotFoundException(`order with id ${id} not found`);
      }
      return deletedOrder[0]
      }
  
      
}
