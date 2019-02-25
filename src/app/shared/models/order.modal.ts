export class Order {
    public orderId: number;
    public comments: string;
    public customerContact: number;
    public totalAmount: number;
    public orderStatus: string;
    public noOfItems: number;
    public orderDeliveryDate: Number;
    public orderReceivedDate: Number;
    public orderItems: Array<{ itemName: string, isCompleted: boolean,
        isDelivered: boolean, deliveryDate: number,
        itemPrice: number, itemService: string}>;
}
