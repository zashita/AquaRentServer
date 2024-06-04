export interface OrderCreationDto{
    readonly userId: string;
    readonly boatId: string;
    readonly date: number;
    readonly dateEnd: number;
}