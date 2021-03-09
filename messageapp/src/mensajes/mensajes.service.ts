import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMensajeDto } from './dto/create-mensaje-dto';
import { Mensaje } from './mensajes/entities/mensaje.entity';

@Injectable()
export class MensajesService {
  constructor(
    @InjectRepository(Mensaje)
    private readonly mensajeRepository: Repository<Mensaje>,
  ) {}

  async getAll() {
    return await this.mensajeRepository.find();
  }

  async createMensaje(mensajeNuevo: CreateMensajeDto) {
    const nuevo = new Mensaje();
    nuevo.mensaje = mensajeNuevo.mensaje;
    nuevo.nick = mensajeNuevo.nick;

    return this.mensajeRepository.save(nuevo);
  }

  async updateMensaje(idMensaje: number, mensajeActualizar: CreateMensajeDto) {
    const mensajeUpdate = await this.mensajeRepository.findOne(idMensaje);
    mensajeUpdate.nick = mensajeActualizar.nick;
    mensajeUpdate.mensaje = mensajeActualizar.mensaje;

    return await this.mensajeRepository.save(mensajeUpdate);
  }

  async deleteMensaje(idMensaje: number) {
    return await this.mensajeRepository.delete(idMensaje);
  }
}
