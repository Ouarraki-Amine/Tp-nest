import { createId } from '@paralleldrive/cuid2';
import { text, integer , pgTable, pgEnum, timestamp } from 'drizzle-orm/pg-core';

const timestamps = {
  updated_at: timestamp(),
  created_at: timestamp().defaultNow().notNull(),
};

export const userRoleEnum = pgEnum('role', ['admin', 'user']);

export const users = pgTable('users', {
  id: text()
    .primaryKey()
    .$defaultFn(() => createId()),
  username: text().notNull().unique(),
  password: text().notNull(),
  role: userRoleEnum().notNull().default('user'),
  ...timestamps,
});

//creation du table orders
export const orders = pgTable('orders', {
  id: text('id').primaryKey().$defaultFn(() => createId()), // Identifiant unique généré automatiquement
  userId: text('user_id').notNull().references(() => users.id), // Clé étrangère vers users
  orderDate: timestamp('order_date').defaultNow(), // Date de la commande
  status: text('status').notNull(), // Statut (ex : 'pending', 'completed')
  totalAmount: integer('total_amount').notNull(), // Montant total
  ...timestamps,
});