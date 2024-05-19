export interface ReviewCreationDto{
    readonly userId: string;
    readonly boatId: string;
    readonly rating: number;
    readonly comment?: string;
}