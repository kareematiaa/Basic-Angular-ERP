import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../general.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent implements OnInit {
  customers: any[] = [];
  products: any[] = [];
  selectedCustomerId: any;
  selectedProductId: any;

  // Form fields for customer and product
  fullName: string = '';
  location: string = '';

  productName: string = '';
  productDescription: string = '';

  constructor(private GeneralService: GeneralService) {}

  onCustomerSelect(customerId: number): void {
    if (customerId) {
      this.GeneralService.getCustomerById(customerId).subscribe((data) => {
        this.fullName = data.fUllName;
        this.location = data.location;
      });
    }
  }

  onProductSelect(productId: number): void {
    if (productId) {
      this.GeneralService.getProductById(productId).subscribe((data) => {
        this.productName = data.name;
        this.productDescription = data.description;
        console.log(data);
      });
    }

    console.log(this.fullName);
  }

  loadCustomers() {
    this.GeneralService.getAllCustomers().subscribe((data) => {
      this.customers = data;
      console.log(data);
    });
  }

  loadProducts() {
    this.GeneralService.getAllProducts().subscribe((data) => {
      this.products = data;
      console.log(data);
    });
  }
  ngOnInit(): void {
    this.loadCustomers();
    this.loadProducts();
  }
}
