import { IsInt, IsNumber, IsString } from "class-validator"

export class CreateProductDto {
    @IsString()
    name:string

    @IsNumber()
    price:number

    @IsNumber()
    @IsInt()
    quantity:number
}
