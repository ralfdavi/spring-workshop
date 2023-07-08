export class Customer {
    id: number | null;
    firstName: string;
    lastName: string;
    
    constructor(customer: Partial<Customer> = {}) {
      this.id = customer?.id || null;
      this.firstName = customer?.firstName || '';
      this.lastName = customer?.lastName || '';
    }
  }