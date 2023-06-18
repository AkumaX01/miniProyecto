export default interface Place {
    id?: string;
    nombre: string;
    fecha: Date;
    hora: string;
    aire: boolean;
    cuartos: number;
    categoria: string;
    imagen: string;
    reserva: string[];
}


/*<!--
Nombre
Fecha
    <app-alta-fire></app-alta-fire>
    <app-cons-baja-fire></app-cons-baja-fire>
Hora
Aire
Cuartos
Categoria
Imagen-->*/