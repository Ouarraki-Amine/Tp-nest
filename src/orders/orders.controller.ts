import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { JwtAuthenticatedRequest } from '@utils/types/auth-types';
import { RolesGuard } from '@utils/roles/roles.guard';
import { Roles } from '@utils/roles/roles.decorator';
import { Role } from '@utils/roles/roles.enum';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  create(
    @Body() createOrderDto: CreateOrderDto,
    @Req() req: JwtAuthenticatedRequest,
  ) {
    const userId = req.user.id; // Récupérez l'ID de l'utilisateur authentifié
    console.log(userId)
    return this.ordersService.create({ ...createOrderDto, userId });
  }


  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @Get('')
  findAll(
    @Query('status') status?: string,
    @Query('limit') limit: number =10,
    @Query('page') page: number =1, 
) {
    return this.ordersService.findAll({status, page,limit});
  }


  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('users/:id')
  async findByUserId(@Param('id') userId: string) {
    return this.ordersService.findOne(userId);
  }

  /*@UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(id, updateOrderDto);
  }
*/
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(id);
  }
}
