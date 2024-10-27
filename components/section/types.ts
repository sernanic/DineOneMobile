export interface ImageInterface {
    id: number;
    imageUrl: string;
}

export interface BottomSheetProps {
    item: {
        itemId: string;
        name: string;
        price: number;
        images: ImageInterface[];
        subsectionId: string;
        description?: string;
    };
}

export interface Modifier {
    modifierId: string;
    merchantId: string;
    name: string;
    available: boolean;
    price: number;
    modifiedTime: string;
    modifierGroupId: string;
    deleted: boolean;
    imageUrl: string;
}

export interface ModifierGroup {
    modifierGroupId: string;
    merchantId: string;
    name: string;
    showByDefault: boolean;
    sortOrder: number;
    deleted: boolean;
    modifiers: Modifier[];
}
