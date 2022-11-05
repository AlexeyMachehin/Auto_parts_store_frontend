import { Product, ProductDto } from './../interfaces/product';
export function fromDto(dto: ProductDto): Product {
    return {
        name: dto.name,
        catalogueNumber: dto.catalogueNumber,
        id: dto._id,
        manufacturer: dto.manufacturer,
        quantity: dto.quantity,
        unitOfMeasurement: dto.unitOfMeasurement,
        wholesalePrice: dto.wholesalePrice,
        retailPrice: dto.retailPrice,
        quantityInCart: 0,
    }

}